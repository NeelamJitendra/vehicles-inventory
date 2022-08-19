import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vehicles Registry in the documnet', () => {
  render(<App />);
  const header = screen.getByText(/Vehicles Registry/i);
  expect(header).toBeInTheDocument();
});
test('renders Vehicle table component', () => {
  const {getByText}= render(<App />);
  const childComponent = getByText(/Vehicles Details/i);
  expect(childComponent).toBeInTheDocument();
});

