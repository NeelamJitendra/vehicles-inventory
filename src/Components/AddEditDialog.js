import React, { useState, useEffect } from 'react';
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
export default function AddEditDialog({
  openAED,
  handleCloseAED,
  handleSubmitAED,
  vehicleDetails,
}) {
  const [vehicleDetailsObj, setvehicleDetailsObj] = useState({});

  const tittle =
    Object.keys(vehicleDetailsObj).length === 0
      ? 'Add new vehicle'
      : 'Edit ' + vehicleDetailsObj.id + ' details';
  const name = vehicleDetails ? vehicleDetails.name : '';
  const uniqueId = vehicleDetails ? vehicleDetails.id : '';
  const fuelType = vehicleDetails ? vehicleDetails.fuelType : '';

  useEffect(() => {
    setvehicleDetailsObj(vehicleDetails);
  }, [vehicleDetails]);

  // Returns checkbox components for dialog
  const checkboxComp = () => {
    const checkboxList = [
      {
        name: 'crane',
        label: 'Crane',
        value: vehicleDetails ? vehicleDetails.crane : false,
      },
      {
        name: 'tachograph',
        label: 'Tachograph',
        value: vehicleDetails ? vehicleDetails.tachograph : false,
      },
      {
        name: 'fireextinguisher',
        label: 'Fire Extinguisher',
        value: vehicleDetails ? vehicleDetails.fireextinguisher : false,
      },
      {
        name: 'hook',
        label: 'Hook',
        value: vehicleDetails ? vehicleDetails.hook : false,
      },
      {
        name: 'customequipment',
        label: 'Custom Equipment',
        value: vehicleDetails ? vehicleDetails.customequipment : false,
      },
    ];
    return checkboxList.map((e, i) => (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            name={e.name}
            defaultChecked={e.value}
            onChange={(e) => handleChecked(e)}
          />
        }
        label={e.label}
      />
    ));
  };

  // Handle changes in text fields and update state vehicleDetailsObj
  const handleChange = (event) => {
    const name = event.target.name;
    const newObj = { ...vehicleDetailsObj, [name]: event.target.value };
    setvehicleDetailsObj(newObj);
  };

  // Handle changes in checkboxes and update state vehicleDetailsObj
  const handleChecked = (event) => {
    const name = event.target.name;
    const newObj = { ...vehicleDetailsObj, [name]: event.target.checked };
    setvehicleDetailsObj(newObj);
  };

  // Handle submit in dialog and alerts if there is no uniqueId
  const handleSubmit = () => {
    if (vehicleDetailsObj.id !== undefined) {
      handleSubmitAED(vehicleDetailsObj);
    } else {
      alert('Each vehicle should have Unique Id');
    }
  };

  return (
    <div>
      <Dialog
        key={vehicleDetails.id}
        open={openAED}
        onClose={handleCloseAED}
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
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  defaultValue={name}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  name="fuelType"
                  label="Fuel Type"
                  variant="outlined"
                  defaultValue={fuelType}
                  onChange={(e) => handleChange(e)}
                />
              </span>
              <FormGroup>{checkboxComp()}</FormGroup>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAED}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
