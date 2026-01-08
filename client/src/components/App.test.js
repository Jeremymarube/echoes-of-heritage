import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the application layout', () => {
  render(<App />);
  // Check for a known element, like the Header or a specific title
  const headerElement = screen.getByRole('banner'); 
  expect(headerElement).toBeInTheDocument();
});