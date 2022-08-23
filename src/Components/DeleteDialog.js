import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

/*
  Returns delete dialog componet of the selected vehicle.
  
  Features:
    - Delete vehicle.
 */
export default function DeleteDialog({
  vehicleDetails,
  openDD,
  handleCloseDD,
  handleAgreeDD,
}) { 
  return (
    <div>
      <Dialog
        open={openDD}
        onClose={handleCloseDD}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure to delete vehicle "{vehicleDetails.id}"
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDD}>Disagree</Button>
          <Button onClick={() => handleAgreeDD(vehicleDetails)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
