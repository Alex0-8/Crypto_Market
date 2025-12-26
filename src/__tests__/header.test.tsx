import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../app/components/Header';

const mockProps = {
  searchQuery: '',
  setSearchQuery: jest.fn(),
  onMenuToggle: jest.fn(),
};

describe('Header Component', () => {
  it('renders title, search input and theme toggle button', () => {
    render(<Header {...mockProps} />);

    // title
    expect(screen.getByText('Crypto Analyzer')).toBeInTheDocument();

    // search input
    expect(screen.getByPlaceholderText(/Search Crypto/i)).toBeInTheDocument();

    // theme toggle button
    expect(screen.getByRole('button', { name: /change theme/i })).toBeInTheDocument();
  });

  it('calls onMenuToggle when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header {...mockProps} />);

    // menu button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    await user.click(menuButton);
    expect(mockProps.onMenuToggle).toHaveBeenCalled();
  });

  it('upates search query when typing in the search bar', async () => {
    const user = userEvent.setup();
    render(<Header {...mockProps} />);

    const input = screen.getByPlaceholderText(/Search Crypto/i);

    await user.type(input, 'BTC');

    // Note: it's called once per key, so we check it was called multiple times
    expect(mockProps.setSearchQuery).toHaveBeenCalledTimes(3);
  });
});