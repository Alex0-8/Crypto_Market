import { render, screen } from '@testing-library/react';
import SideBar from '../app/components/SideBar';
import { useQuery } from '@tanstack/react-query';

// Moks of the necessary modules
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../app/lib/api', () => ({
  fetchAllPrices: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
    aside: ({ children }: any) => <aside>{children}</aside>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockProps = {
  selectedCrypto: null,
  setSelectedCrypto: jest.fn(),
  searchQuery: '',
  isOpen: false,
  onClose: jest.fn(),
};

describe('SideBar Component', () => {
  it('renders sidebar title', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<SideBar {...mockProps} />);

    expect(screen.getByText(/All Cryptocurrencies/i)).toBeInTheDocument();
  });

  it('shows loading skeletons when data is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<SideBar {...mockProps} />);

    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('displays error message when there is an error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Error loading data'),
    });

    render(<SideBar {...mockProps} />);

    expect(screen.getByText(/Error loading data./i)).toBeInTheDocument();
  });

  it('renders list of cryptocurrencies when data is available', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        { id: 'bitcoin', symbol: 'BTC', price: 50000 },
        { id: 'ethereum', symbol: 'ETH', price: 4000 },
      ],
      isLoading: false,
      error: null,
    });

    render(<SideBar {...mockProps} />);

    expect(screen.getByText(/BTC/i)).toBeInTheDocument();
    expect(screen.getByText(/ETH/i)).toBeInTheDocument();
  });
});