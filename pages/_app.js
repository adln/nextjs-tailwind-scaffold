import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import RouteGuard from '@/components/routing/route-guard';
import Cookies from 'js-cookie';



export default function App({ Component, pageProps }) {
  const token = Cookies.get('token');

  console.log(token);

  return (
    <AuthProvider>

      <RouteGuard Component={Component} pageProps={pageProps} />

      <Toaster />
    </AuthProvider>
  );
}
