import { LoaderPinwheel } from 'lucide-react';
import Layout from '@/components/structure/Layout';
import useRouteGuard from '@/hooks/use-route-guard';

const RouteGuard = ({ Component, pageProps }) => {
  const { loading, isRedirect, authTemplate } = useRouteGuard();

  if (loading || isRedirect) {
    return (
      <div
        className="bg-secondary w-screen h-screen items-center justify-center flex flex-col"
        role="alert"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="animate-pulse">
          <LoaderPinwheel className="motion-safe:animate-spin size-20" />
        </div>
        <h1 className="text-xl">Chargement...</h1>
      </div>
    );
  }

  return (
    <>
      {authTemplate ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
};

export default RouteGuard;
