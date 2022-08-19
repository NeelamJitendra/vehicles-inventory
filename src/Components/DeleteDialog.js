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
export default class DeleteDialog extends React.Component {
  render() {
    const vehicleDetails = this.props.vehicleDetails;
    return (
      <div>
        <Dialog
          open={this.props.openDD}
          onClose={this.props.handleCloseDD}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">
            Are you sure to delete vehicle "{vehicleDetails.id}"
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.props.handleCloseDD}>Disagree</Button>
            <Button onClick={() => this.props.handleAgreeDD(vehicleDetails)}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
