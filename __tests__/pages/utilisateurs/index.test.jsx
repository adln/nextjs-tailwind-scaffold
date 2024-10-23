const { default: Layout } = require('@/components/structure/Layout');
const { useAuth } = require('@/context/AuthContext');
const { default: Utilisateurs } = require('@/pages/utilisateurs');
const { screen, within } = require('@testing-library/dom');
const { render, act } = require('@testing-library/react');
const { useRouter } = require('next/router');
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('next/dist/client/router', () => ({
  useRouter: jest.fn(),
}));
describe('Utilisateurs', () => {
  const mockData = [
    {
      id: 1,
      profile: {
        firstname: 'John',
        lastname: 'Doe',
      },
      credentials: {
        email: 'john@example.com',
      },
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      profile: {
        firstname: 'Jane',
        lastname: 'Smith',
      },
      credentials: {
        email: 'jane@example.com',
      },
      createdAt: '2024-01-02',
    },
  ];
  const mockPush = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { name: 'Test User' }, // Mocked user data
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
    useRouter.mockImplementation(() => ({
      asPath: '/utilisateurs',
      query: {},
      push: mockPush,
      prefetch: () => Promise.resolve(true),
    }));
    render(
      <Layout>
        <Utilisateurs utilisateurs={mockData} />
      </Layout>
    );
  });
  it('should have a title', () => {
    const heading = screen.getByTestId('main-title');

    expect(heading).toBeInTheDocument();
  });

  it('should have a table', () => {
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('The table should have the columns: First name, Last name, Email, Created At', () => {
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const headerTexts = headers.map((h) => h.textContent);

    expect(headerTexts).toEqual(
      expect.arrayContaining([
        'First name',
        'Last name',
        'Email',
        'Created At',
        'Actions',
      ])
    );
  });
  test("all table cells can't be empty", () => {
    const table = screen.getByRole('table');
    const cells = within(table).getAllByRole('cell');
    cells.forEach((cell, index) => {
      if (cell.textContent.trim() === '') {
        console.warn(`Cell at index ${index} is empty:`, cell.textContent);
      }
      expect(cell).not.toBeEmptyDOMElement();
    });
  });
  test('should display "Aucune donnée disponible" when there is no data', () => {
    render(
      <Layout>
        <Utilisateurs utilisateurs={[]} />
      </Layout>
    ); // Pass empty data

    const noDataMessage = screen.getByText(/Aucune donnée disponible/i);
    expect(noDataMessage).toBeInTheDocument();
  });

  test('should Each table row should have an edit button with an icon', () => {
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    rows.forEach((row, index) => {
      if (index === 0) return;
      const button = within(row).getByTestId('edit-button');

      expect(button).toBeInTheDocument();
      expect(within(button).getByRole('img'));
    });
  });
  test('the edit button should redirect to "/utilisateurs/[_id]"', async () => {
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    const editButton = within(rows[1]).getByTestId('edit-button');

    expect(editButton).toHaveAttribute('href', '/utilisateurs/1');
    // expect(router.push).toHaveBeenCalledWith('/utilisateurs/1', expect.anything(), expect.anything());
  });
  test('Each table row should have a delete button with an icon', () => {
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    rows.forEach((row, index) => {
      if (index === 0) return;
      const button = within(row).getByTestId('delete-button');

      expect(button).toBeInTheDocument();
      expect(within(button).getByRole('img'));
    });
  });
  test('when a delete button is clicked it should open a confirmation modal (shadcn Dialog)', async () => {
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    const deleteButton = within(rows[1]).getByTestId('delete-button');
    await act(() => {
      deleteButton.click();
    });
    const modal = screen.getByTestId('dialog');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(/sure/i)).toBeInTheDocument();
  });
});
