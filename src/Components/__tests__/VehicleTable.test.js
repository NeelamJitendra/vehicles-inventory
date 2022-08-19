import React from 'react';
import VehicleTable from '../VehicleTable';
import { render, fireEvent, waitFor } from '@testing-library/react';

let wrapper;
beforeEach(() => {
  wrapper = render(<VehicleTable />);
});

test('vehicle details cell', () => {
  expect(wrapper.getByText('Vehicles Details')).toBeTruthy();
});

test('vehicle equipments cell', () => {
  expect(wrapper.getByText('Equipments')).toBeTruthy();
});

test('add vechile cell', () => {
  expect(wrapper.getByText('Add New')).toBeTruthy();
});

test('Click add new button', async () => {
  const button = await waitFor(() => wrapper.getByText('Add New'));
  fireEvent.click(button);
});
