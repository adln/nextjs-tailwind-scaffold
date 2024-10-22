import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import * as api from '@/services/api'; // Adjust import according to your API path
import { toast } from '@/hooks/use-toast';

// Mock the API functions
jest.mock('@/services/api');
jest.mock('@/hooks/use-toast')

const TestComponent = () => {
  const { user, loading, login, register, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'No User'}</span>
      <span data-testid="loading">{loading ? 'Loading...' : 'Loaded'}</span>
      
      {/* Add input fields for email and password */}
      <input aria-label="email" type="email" />
      <input aria-label="password" type="password" />
      
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button
        onClick={() => register('test@example.com', 'password', 'Test User')}
      >
        Register
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with default values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('No User');
    expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
  });

  test('should log in successfully', async () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    api.login.mockResolvedValueOnce({ token: 'mockToken' });
    api.fetchUserProfile.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click(); // Simulate login
    });

    // expect(api.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(api.fetchUserProfile).toHaveBeenCalledWith('mockToken');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  test('should handle login failure', async () => {
    api.login.mockRejectedValueOnce(new Error('Login failure.'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    

    await act(async () => {
      screen.getByText('Login').click(); // Simulate login
    });
  
    expect(toast).toHaveBeenCalledWith({description: "Login failure.", title: "échec de la connexion."});

  });
 
  test('should register successfully', async () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    api.register.mockResolvedValueOnce({ token: 'mockToken' });
    api.fetchUserProfile.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simulate filling the input fields before registration
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    await act(async () => {
      screen.getByText('Register').click(); // Simulate registration
    });

    expect(api.register).toHaveBeenCalledWith(
      'test@example.com',
      'password',
      'Test User'
    );
    expect(api.fetchUserProfile).toHaveBeenCalledWith('mockToken');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });
  test('should handle registration failure', async () => {
    api.register.mockRejectedValueOnce(new Error('Registration failure.'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    

    await act(async () => {
      screen.getByText('Register').click(); // Simulate login
    });
  
    expect(toast).toHaveBeenCalledWith({description: "Registration failure.", title: "Echec lors de l'enregistrement."});

  });

  test('should log out correctly', async () => {
    const mockUser = { name: 'Test User', email: 'test@example.com' };
    api.login.mockResolvedValueOnce({ token: 'mockToken' });
    api.fetchUserProfile.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simulate filling the input fields before login
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });

    await act(async () => {
      screen.getByText('Login').click(); // Simulate login
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');

    await act(async () => {
      screen.getByText('Logout').click(); // Simulate logout
    });

    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });
});
