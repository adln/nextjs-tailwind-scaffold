import { AuthProvider } from '@/context/AuthContext';
import * as api from '@/services/api';
import React from 'react';
import Login from '@/pages/login';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';

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

jest.mock('@/services/api');

describe('Login page', () => {
  test('All elements loaded', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByTestId('title')).toHaveTextContent('Connexion');
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Connexion');
    
  });


  
});

