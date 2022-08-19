import React from 'react';

import equipments from '../DataFiles/equipments.json';
import vehicles from '../DataFiles/vehicles.json';
import checkMark from '../Images/CheckMark.png';
import AddEditDialog from './AddEditDialog';
import DeleteDialog from './DeleteDialog';
import './VehicleTable.css';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: '0.8px solid rgb(216,216,216)',
  },
  [`&.${tableCellClasses.body}`]: {
    border: '0.8px solid rgb(216,216,216)',
  },
}));

/*
  Returns table componet with supplied equipment and vehicle list.
  
  Features:
    - Add new vehicles to table.
    - Delete Vehicles from the list.
    - Edit the equipments attached to vehicle and its details.
 */
export default class VehicleTable extends React.Component {
  state = {
    vehiclesList: [],
    vehicleDetails: {},
    openAED: false,
    openDD: false,
    columns: [],
  };

  // Adds equipmnet list to default list with actions and set state to columns
  addColumn = (equipList) => {
    const fixedCol = [
      { id: 'id', label: 'Unique Id' },
      { id: 'name', label: 'Name' },
      { id: 'fuelType', label: 'Fuel Type' },
    ];
    const equip = equipList.map((x) => {
      return { id: x.name.toLowerCase().replace(/\s/g, ''), label: x.name };
    });
    const column = fixedCol.concat(equip);
    column.push({
      id: 'action',
      label: 'Action',
    });
    this.setState({ columns: column });
  };

  // Adds equipmnet list to vehicle list and set state to vehicleList
  addEquipment = (equipList, vehiList) => {
    const vehicleArray = vehiList.map((data) => {
      let Equipments = data.equipments;
      if (Equipments) {
        Equipments.forEach((d) => {
          const equip = equipList.find((x) => x.id === d);
          const equipName = equip.name.toLowerCase().replace(/\s/g, '');
          if (equip) {
            data[equipName] = true;
          } else {
            data[equipName] = false;
          }
        });
      }
      return data;
    });
    this.setState({ vehiclesList: vehicleArray });
  };

  componentDidMount = () => {
    this.addEquipment(equipments, vehicles);
    this.addColumn(equipments);
  };

  // Add new button component
  addNewButton = () => {
    return (
      <Button
        variant="contained"
        onClick={() => {
          this.setState({ openAED: true, vehicleDetails: {} });
        }}
      >
        Add New
      </Button>
    );
  };

  // Returns table cells components for table
  tableCells = (column, row) => {
    const value = row[column.id];
    return (
      <StyledTableCell align="center" key={column.id}>
        {column.id === 'action' ? (
          <div>
            <IconButton
              onClick={() => {
                this.setState({ vehicleDetails: row, openAED: true });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                this.setState({ vehicleDetails: row, openDD: true });
              }}
            >
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
  };

  // Handles agree action on delete dialog
  handleAgreeDD = (row) => {
    const vehicleAry = [...this.state.vehiclesList];
    const index = vehicleAry.findIndex((x) => x.id === row.id);
    vehicleAry.splice(index, 1);
    this.setState({ openDD: false, vehiclesList: vehicleAry });
  };

  // Handles close action on delete dialog
  handleCloseDD = () => {
    this.setState({ openDD: false });
  };

  // Handles submit action on add and edit dialog
  handleSubmitAED = (row) => {
    const vehicleAry = [...this.state.vehiclesList];
    const index = vehicleAry.findIndex((x) => x.id === row.id);
    if (index !== -1) {
      vehicleAry[index] = row;
    } else {
      vehicleAry.push(row);
    }
    this.setState({ openAED: false, vehiclesList: vehicleAry });
  };

  // Handles close action on add and edit dialog
  handleCloseAED = () => {
    this.setState({ openAED: false });
  };

  // Handle changes in text fields and update state vehicleDetails
  handleChange = (event) => {
    const name = event.target.name;
    const vehicleDetailsObj = {
      ...this.state.vehicleDetails,
      [name]: event.target.value,
    };
    this.setState({ ...this.state, vehicleDetails: vehicleDetailsObj });
  };

  // Handle changes in checkboxes and update state vehicleDetails
  handleChecked = (event) => {
    const name = event.target.name;
    const vehicleDetailsObj = {
      ...this.state.vehicleDetails,
      [name]: event.target.checked,
    };
    this.setState({ vehicleDetails: vehicleDetailsObj });
  };
  render() {
    const vehiclesList = this.state.vehiclesList;
    const vehicleDetails = this.state.vehicleDetails;
    const openAED = this.state.openAED;
    const openDD = this.state.openDD;
    const columns = this.state.columns;

    return (
      <div>
        <TableContainer sx={{ maxHeight: '80vh' }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  colSpan={3}
                >
                  Vehicles Details
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan={5}
                >
                  Equipments
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  colSpan={5}
                >
                  {this.addNewButton()}
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
            <TableBody>
              {vehiclesList &&
                vehiclesList.map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        return this.tableCells(column, row);
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <AddEditDialog
          openAED={openAED}
          handleCloseAED={() => this.handleCloseAED()}
          handleSubmitAED={(e) => this.handleSubmitAED(e)}
          handleChange={(e) => this.handleChange(e)}
          handleChecked={(e) => this.handleChecked(e)}
          vehicleDetails={vehicleDetails}
        />

        <DeleteDialog
          openDD={openDD}
          handleCloseDD={() => this.handleCloseDD()}
          handleAgreeDD={(e) => this.handleAgreeDD(e)}
          vehicleDetails={vehicleDetails}
        />
      </div>
    );
  }
}
