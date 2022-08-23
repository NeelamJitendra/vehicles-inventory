import React, { useState, useEffect } from 'react';

import equipments from '../DataFiles/equipments.json';
import vehicles from '../DataFiles/vehicles.json';
import AddEditDialog from './AddEditDialog';
import DeleteDialog from './DeleteDialog';
import TableRowComp from './TableRowComp';
import TableHeadComp from './TableHeadComp';
import './VehicleTable.css';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
export default function VehicleTable() {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [openAED, setOpenAED] = useState(false);
  const [openDD, setOpenDD] = useState(false);
  const [columns, setColumns] = useState([]);

  // Adds equipmnet list to default list with actions and set state to columns
  const addColumn = (equipList) => {
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
    setColumns(column);
  };

  // Adds equipmnet list to vehicle list and set state to vehicleList
  const addEquipment = (equipList, vehiList) => {
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
    setVehiclesList(vehicleArray);
  };

  useEffect(() => {
    addEquipment(equipments, vehicles);
    addColumn(equipments);
  }, []);

  // Handle add new button click
  const handleAddNew = () => {
    setOpenAED(true);
    setVehicleDetails({});
  };

  // Handle click action for edit and delete buttons
  const onClickActionButtons = (row, editButton) => {
    editButton ? setOpenAED(true) : setOpenDD(true);
    setVehicleDetails(row);
  };

  // Handles agree action on delete dialog
  const handleAgreeDD = (row) => {
    const vehicleAry = [...vehiclesList];
    const index = vehicleAry.findIndex((x) => x.id === row.id);
    vehicleAry.splice(index, 1);
    setVehiclesList(vehicleAry);
    setOpenDD(false);
  };

  // Handles close action on delete dialog
  const handleCloseDD = () => {
    setOpenDD(false);
  };

  // Handles submit action on add and edit dialog
  const handleSubmitAED = (row) => {
    const vehicleAry = [...vehiclesList];
    const index = vehicleAry.findIndex((x) => x.id === row.id);
    if (index !== -1) {
      vehicleAry[index] = row;
    } else {
      vehicleAry.push(row);
    }
    setVehiclesList(vehicleAry);
    setOpenAED(false);
  };

  // Handles close action on add and edit dialog
  const handleCloseAED = () => {
    setOpenAED(false);
  };

  return (
    <div>
      <TableContainer sx={{ maxHeight: '80vh' }} component={Paper}>
        <Table stickyHeader>
          <TableHeadComp
            StyledTableCell={StyledTableCell}
            columns={columns}
            handleAddNew={() => handleAddNew()}
          />
          <TableBody>
            {vehiclesList &&
              vehiclesList.map((row) => (
                <TableRowComp
                  key={row.id}
                  StyledTableCell={StyledTableCell}
                  columns={columns}
                  row={row}
                  onClickActionButtons={(e, k) => onClickActionButtons(e, k)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditDialog
        openAED={openAED}
        handleCloseAED={(e) => handleCloseAED(e)}
        handleSubmitAED={(e) => handleSubmitAED(e)}
        vehicleDetails={vehicleDetails}
      />

      <DeleteDialog
        openDD={openDD}
        handleCloseDD={handleCloseDD}
        handleAgreeDD={(e) => handleAgreeDD(e)}
        vehicleDetails={vehicleDetails}
      />
    </div>
  );
}
