import React, { useEffect, useState } from 'react';
import ExchangeTable from './ExchangeTable';
import TablePagination from '@mui/material/TablePagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ExchangePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [exchangesData, setExchangesData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getAllStock?keyword=${searchQuery}&page=${page}&limit=${rowsPerPage + (page * rowsPerPage)}`, {
          method: "GET",
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        if(data?.currentData){
            setTotalCount(data?.totalCount);
            setExchangesData(data?.currentData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [page, rowsPerPage, searchQuery]);
  
  console.log('exchangesData =>', exchangesData);
  const filteredData = exchangesData?.filter((exchange) =>
    exchange?.symbol?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );
  console.log('filteredData =>', filteredData);
  const startIndex = page * rowsPerPage;
  const endIndex = rowsPerPage + startIndex;
  const slicedData = filteredData?.slice(startIndex, endIndex);

  return (
    <>
      <Select
        value={searchQuery}
        onChange={handleSearchInputChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Stock' }}
      >
        <MenuItem value="">
          <em>Search Stock</em>
        </MenuItem>
        <MenuItem value="tesla">Tesla</MenuItem>
        <MenuItem value="aapl">Apple Inc.</MenuItem>
        <MenuItem value="amzn">Amazon.com Inc.</MenuItem>
        <MenuItem value="googl">Google</MenuItem>
      </Select>

      <ExchangeTable data={slicedData} />
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ExchangePage;
