import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useAPI } from '@/hooks/use-api';

import { formToJSON } from 'axios';
import Head from 'next/head';
import React from 'react';

export default function Signup() {
  
  const { register } = useAuth();
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = formToJSON(formData);

    await register(data);
  };
  return (
    <>
      <Head>
        <title>Création de compte</title>
      </Head>
      <div className="bg-secondary pt-12 min-h-screen">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Création de compte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Nom" name="profile.lastname" required />
                <Input placeholder="Prénom" name="profile.firstname" required />
                <Input
                  placeholder="email"
                  name="credentials.email"
                  type="email"
                  required
                  className="col-span-2"
                />
                <Input
                  placeholder="Mot de passe"
                  name="credentials.password"
                  type="password"
                  className="col-span-2"
                />
                <Input
                  placeholder="Confirmer mot de passe"
                  name="password_confirmation"
                  type="password"
                  className="col-span-2"
                />
                <Button>Enregistrer</Button>
              </div>
              <CardFooter></CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
