import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ExchangeTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <>
            {row?.original?.longname}
          </>
        ),
      },
      {
        Header: 'Score',
        accessor: 'price',
        Cell: ({ row }) => (
          <>
            {row?.original?.score}
          </>
        ),
      },
    ],
    [] 
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Paper>
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups?.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column?.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows?.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row?.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <TableCell {...cell?.getCellProps()}>
                        {cell?.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExchangeTable;
