import React from 'react';
import DeleteDialog from '../DeleteDialog';
import { render, fireEvent, waitFor } from '@testing-library/react';

let wrapper;
const mockFunction = jest.fn();
beforeEach(() => {
  wrapper = render(
    <DeleteDialog
      openDD={true}
      vehicleDetails={{ id: 'test' }}
      handleAgreeDD={mockFunction}
    />
  );
});

test('renders Vehicles Registry in the documnet', async () => {
  const heading = await wrapper.getByText(
    /Are you sure to delete vehicle "test"/i
  );
  expect(heading).toBeTruthy();
});

test('renders Vehicles Registry in the documnet', async () => {
  const buttonList = await wrapper.findAllByRole('button');
  expect(buttonList).toHaveLength(2);
});

test('Click submit button', async () => {
  const button = await waitFor(() => wrapper.getByText('Agree'));
  fireEvent.click(button);
  expect(mockFunction).toHaveBeenCalled();
});
