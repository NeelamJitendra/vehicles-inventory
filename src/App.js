import React from 'react';
import VehicleTable from './Components/VehicleTable';
import './App.css';

export default class App extends React.Component {
  render(){
  return (
    <div className="App">
      <h1>Vehicles Registry</h1>
      <VehicleTable />
    </div>
  );
  }
}
