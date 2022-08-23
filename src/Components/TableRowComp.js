import React from 'react';

import checkMark from '../Images/CheckMark.png';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';

/*
  Returns table rows components for table
  
  Features:
    - Display vehicle table rows.
 */
export default function TableRowComp({
  columns,
  row,
  onClickActionButtons,
  StyledTableCell,
}) {
  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      {columns.map((col, i) => {
        const value = row[col.id];
        return (
          <StyledTableCell align="center" key={col.id}>
            {col.id === 'action' ? (
              <div>
                <IconButton onClick={() => onClickActionButtons(row, true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onClickActionButtons(row)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : value === true ? (
              <img className={'CheckImg'} src={checkMark} alt="Logo" />
            ) : (
              value
            )}
          </StyledTableCell>
        );
      })}
    </TableRow>
  );
}
