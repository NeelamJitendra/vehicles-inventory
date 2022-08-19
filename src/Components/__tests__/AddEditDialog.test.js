import React from 'react';
import AddEditDialog from '../AddEditDialog';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('test all components are rendered', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<AddEditDialog openAED={true} vehicleDetails={{}} />);
  });

  it('check add new vehicle heading', () => {
    expect(wrapper.getByText('Add new vehicle')).toBeVisible();
  });

  it('check uniqueId text field', () => {
    expect(wrapper.getByLabelText('Unique Id *')).toBeVisible();
  });

  it('check name text field', () => {
    expect(wrapper.getByLabelText('Name')).toBeVisible();
  });

  it('check fuel Type text field', () => {
    expect(wrapper.getByLabelText('Fuel Type')).toBeVisible();
  });

  it('check crane check box', () => {
    expect(wrapper.getByLabelText('Crane')).toBeTruthy();
  });

  it('check tachograph check box', () => {
    expect(wrapper.getByLabelText('Tachograph')).toBeTruthy();
  });

  it('check fire extinguisher check box', () => {
    expect(wrapper.getByLabelText('Fire Extinguisher')).toBeTruthy();
  });

  it('check hook check box', () => {
    expect(wrapper.getByLabelText('Hook')).toBeTruthy();
  });

  it('check custom equipment check box', () => {
    expect(wrapper.getByLabelText('Custom Equipment')).toBeTruthy();
  });

  it('check buttons are rendered', async () => {
    const buttonList = await wrapper.findAllByRole('button');
    expect(buttonList).toHaveLength(2);
  });
});

describe('test with mock data AddEditDialog', () => {
  let wrapper;
  const vehicleDetailsObj = {
    id: 'v123',
    name: 'test',
    crane: true,
  };
  const mockFunction = jest.fn();
  beforeEach(() => {
    wrapper = render(
      <AddEditDialog
        vehicleDetails={vehicleDetailsObj}
        openAED={true}
        handleSubmitAED={mockFunction}
      />
    );
  });

  it('check edit v123 heading', async () => {
    expect(await wrapper.getByText('Edit v123 details')).toBeVisible();
  });

  it('check name text field', () => {
    expect(wrapper.getByLabelText('Name')).toHaveValue('test');
  });

  it('check crane check field', () => {
    expect(wrapper.getByLabelText('Crane')).toBeChecked();
  });

  it('check hook check field', () => {
    expect(wrapper.getByLabelText('Hook')).not.toBeChecked();
  });

  it('Click submit button', async () => {
    const button = await waitFor(() => wrapper.getByText('Submit'));
    fireEvent.click(button);
    expect(mockFunction).toHaveBeenCalled();
  });
});
