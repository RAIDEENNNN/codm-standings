import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test if the "learn react" text is in the document
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Test if the standings table is rendered correctly
test('renders standings table', () => {
  render(<App />);
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
});

// Test if the export button is clickable
test('button click triggers export', () => {
  render(<App />);
  const exportButton = screen.getByText(/Export/i);
  fireEvent.click(exportButton);
  // Assuming `someExportFunction` is the function triggered on export button click
  expect(someExportFunction).toHaveBeenCalled();  // Replace with the actual export function's call
});
