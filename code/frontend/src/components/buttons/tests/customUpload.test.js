import { render, screen } from '@testing-library/react';
import CustomUpload from '../CustomUpload'; 

test('renders upload file text', () => {
  render(<CustomUpload />); 
  const uploadTextElement = screen.getByText(/Upload/i);
  expect(uploadTextElement).toBeInTheDocument();
});
