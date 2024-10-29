import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import RouteGuard from '@/components/routing/route-guard';
import 'moment/locale/fr'
import { useEffect } from 'react';
import { onMessageListener, requestPermission } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';


export default function App({ Component, pageProps }) {

  // Register sw for firebase
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Request permission for notifications
      requestPermission();
      // Listen for foreground messages
      onMessageListener((payload) => {
        console.log('Foreground notification:', payload);
        toast({
          title: payload.notification?.title,
          description: payload.notification?.body
        })
      })
    }
  }, []);


  return (
    <AuthProvider>

      <RouteGuard Component={Component} pageProps={pageProps} />

      <Toaster />
    </AuthProvider>
  );
}
