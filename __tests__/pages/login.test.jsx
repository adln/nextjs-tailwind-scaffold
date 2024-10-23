import { AuthProvider, useAuth } from '@/context/AuthContext';
import * as api from '@/services/api';
import React from 'react';
import Login from '@/pages/login';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { toast } from '@/hooks/use-toast';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));


jest.mock('@/hooks/use-toast');
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login page', () => {
  const loginMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      user: { name: 'Test User' },
      loading: false,
      login: loginMock,
      logout: jest.fn(),
    });
    render(<Login />);
  });

  test('All elements loaded', () => {
    expect(screen.getByTestId('title')).toHaveTextContent(/Connexion/);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Connexion');
  });

  it('should call login from useAuth and the login should return a token', () => {
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: '1234',
    });
  });
});
