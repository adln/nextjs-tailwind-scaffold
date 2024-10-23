const { default: Layout } = require('@/components/structure/Layout');
const { AuthProvider, useAuth } = require('@/context/AuthContext');
const { default: Index } = require('@/pages');
const { screen } = require('@testing-library/dom');
const { render } = require('@testing-library/react');

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Home page - UI', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { name: 'Test User' }, // Mocked user data
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
    render(
      <Layout>
        <Index />
      </Layout>
    );
  });
  it('should have a title', () => {
    
    const heading = screen.getByTestId('main-title');
    expect(heading).toBeInTheDocument();
  });

  it('should render cards', () => {
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBeGreaterThan(0);
  });
});
