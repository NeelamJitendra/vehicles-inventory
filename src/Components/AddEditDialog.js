import React from 'react';
import '../App.css';

import DialogContentText from '@mui/material/DialogContentText';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

/*
  Returns add and edit dialog componet with supplied vehicle details.
  
  Features:
    - Add new vehicles.
    - Edit the equipments attached to vehicle and its details.
 */
export default class AddEditDialog extends React.Component {
  // Handle submit in dialog and alerts if there is no uniqueId
  handleSubmit = (vehicleDetailsObj) => {
    if (vehicleDetailsObj.id !== undefined) {
      this.props.handleSubmitAED(vehicleDetailsObj);
    } else {
      alert('Each vehicle should have Unique Id');
    }
  };

  render() {
    const vehicleDetails = this.props.vehicleDetails;
    const tittle =
      Object.keys(vehicleDetails).length === 0
        ? 'Add new vehicle'
        : 'Edit ' + vehicleDetails.id + ' details';
    const name = vehicleDetails ? vehicleDetails.name : '';
    const uniqueId = vehicleDetails ? vehicleDetails.id : '';
    const fuelType = vehicleDetails ? vehicleDetails.fuelType : '';
    const crane = vehicleDetails ? vehicleDetails.crane : false;
    const tachograph = vehicleDetails ? vehicleDetails.tachograph : false;
    const fireextinguisher = vehicleDetails
      ? vehicleDetails.fireextinguisher
      : false;
    const hook = vehicleDetails ? vehicleDetails.hook : false;
    const customequipment = vehicleDetails
      ? vehicleDetails.customequipment
      : false;
    return (
      <div>
        <Dialog
          key={vehicleDetails.id}
          open={this.props.openAED}
          onClose={() => this.props.handleCloseAED()}
          aria-labelledby="add-edit-dialog-title"
          aria-describedby="add-edit-dialog-description"
        >
          <DialogTitle id="add-edit-dialog-title">{tittle}</DialogTitle>
          <DialogContent>
            <DialogContentText
              component={'span'}
              id="add-edit-dialog-description"
            >
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <span>
                  <TextField
                    name="id"
                    label="Unique Id"
                    variant="outlined"
                    required={true}
                    defaultValue={uniqueId}
                    disabled={uniqueId !== undefined}
                    onBlur={(e) => this.props.handleChange(e)}
                  />
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    defaultValue={name}
                    onChange={(e) => this.props.handleChange(e)}
                  />
                  <TextField
                    name="fuelType"
                    label="Fuel Type"
                    variant="outlined"
                    defaultValue={fuelType}
                    onChange={(e) => this.props.handleChange(e)}
                  />
                </span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="crane"
                        defaultChecked={crane}
                        onChange={(e) => this.props.handleChecked(e)}
                      />
                    }
                    label="Crane"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tachograph"
                        defaultChecked={tachograph}
                        onChange={(e) => this.props.handleChecked(e)}
                      />
                    }
                    label="Tachograph"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="fireextinguisher"
                        defaultChecked={fireextinguisher}
                        onChange={(e) => this.props.handleChecked(e)}
                      />
                    }
                    label="Fire Extinguisher"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hook"
                        defaultChecked={hook}
                        onChange={(e) => this.props.handleChecked(e)}
                      />
                    }
                    label="Hook"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="customequipment"
                        defaultChecked={customequipment}
                        onChange={(e) => this.props.handleChecked(e)}
                      />
                    }
                    label="Custom Equipment"
                  />
                </FormGroup>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleCloseAED()}>Cancel</Button>
            <Button onClick={() => this.handleSubmit(vehicleDetails)}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
