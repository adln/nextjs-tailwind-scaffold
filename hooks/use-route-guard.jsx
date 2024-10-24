import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const authRoutes = ['/login', '/signup', '/forgot-password'];

const useRouteGuard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = router.pathname;
  const [isRedirect, setIsRedirect] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (user && authRoutes.includes(path)) {
        setIsRedirect(true);
        router.replace('/');
      } else if (!user && !authRoutes.includes(path)) {
        setIsRedirect(true);
        router.replace('/login');
      } else {
        setIsRedirect(false);
      }
    }
  }, [user, loading, path, router]);

  return { loading, isRedirect, authTemplate: authRoutes.includes(path) };
};

export default useRouteGuard;
