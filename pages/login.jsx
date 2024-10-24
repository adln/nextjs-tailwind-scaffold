import { formToJSON } from 'axios';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import { Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const data = formToJSON(formData);
    await login(data);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <div className="bg-secondary pt-12 min-h-screen">
        <Card className="max-w-sm mx-auto">
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
                onClick={() => signIn('google', { redirect: false })}
              >
                {/* <img src={'/google_logo.webp'} className="h-6 w-auto" /> */}
                Log in with Google
              </Button>
              <Button
                className="bg-blue-700 hover:bg-blue-700/95 text-white shadow-md border w-full px-3 py-1 flex gap-3 items-center justify-center"
                onClick={() => signIn('facebook', { redirect: false })}
              >
                {/* <img src={'/google_logo.webp'} className="h-6 w-auto" /> */}
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
      </div>
    </>
  );
};

export default Login;
