import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import RouteGuard from '@/components/routing/route-guard';
import 'moment/locale/fr'


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>

      <RouteGuard Component={Component} pageProps={pageProps} />

      <Toaster />
    </AuthProvider>
  );
}
