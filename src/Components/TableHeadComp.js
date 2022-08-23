import React from 'react';

import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
/*
  Returns table head components for table
  
  Features:
    - Display vehicle table headings.
 */
export default function TableHeadComp({
  StyledTableCell,
  columns,
  handleAddNew,
}) {
  // Add new button component
  const addNewButton = () => {
    return (
      <Button variant="contained" onClick={() => handleAddNew()}>
        Add New
      </Button>
    );
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center" colSpan={3}>
          Vehicles Details
        </StyledTableCell>
        <StyledTableCell align="center" colSpan={5}>
          Equipments
        </StyledTableCell>
        <StyledTableCell align="center" colSpan={5}>
          {addNewButton()}
        </StyledTableCell>
      </TableRow>
      <TableRow>
        {columns.map((column) => (
          <StyledTableCell align="center" key={column.id}>
            {column.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
