import { useRouter } from 'next/router';
import axios, { formToJSON } from 'axios';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = () => {
    // http://localhost:3000/api/v1
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  const handleLoginCallback = async (token) => {
    try {
      // Store the token in localStorage or cookie
      localStorage.setItem('token', token);
      setCookie('token', token);
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging:', error);
    }
  };

  useEffect(() => {
    // Check for token in URL (after Google redirects back)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      handleLoginCallback(token);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const data = formToJSON(formData);
    try {
      await login(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-12">
      <CardHeader>
        <CardTitle data-testid="title">Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Username</Label>
            <Input
              data-testid="email-input"
              name="email"
              placeholder="Username or Email"
              className="border rounded-sm px-3 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Password</Label>
            <Input
              data-testid="password-input"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border rounded-sm px-3 py-1"
            />
          </div>
          <Button data-testid="submit-button">
            {loading ? (
              <Loader className="animate-spin" data-testid="loader-icon" />
            ) : (
              'Connexion'
            )}
          </Button>
        </form>
        <div className="text-center my-3">OR</div>
        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            className="bg-slate-50 shadow-md border w-full px-3 py-1 flex gap-3 items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <img src={'/google_logo.webp'} className="h-6 w-auto" />
            Log in with Google
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-700/95 text-white shadow-md border w-full px-3 py-1 flex gap-3 items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <img src={'/google_logo.webp'} className="h-6 w-auto" />
            Log in with Facebook
          </Button>
        </div>
        <div className="my-3">
          <p>
            You don't have an account yet ?{' '}
            <Link href={'/signup'} className="text-primary font-bold">
              Signup
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
