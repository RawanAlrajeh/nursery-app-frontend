'use client';

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import AppWrapper from '../components/AppWrapper/AppWrapper';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import '../utils/i18n/i18n'; // Ensure this import is present to initialize i18n
import { ReactQueryDevtools } from 'react-query/devtools';
import withAuth from '../routes/withAuth/withAuth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // List of routes that should not be protected by withAuth
  const unprotectedRoutes = ['/auth/login', '/auth/register', '/auth/verify'];

  // Check if the current route is in the unprotectedRoutes array
  const isProtectedRoute = !unprotectedRoutes.includes(router.pathname);

  // If it's a protected route, wrap the component with withAuth
  const WrappedComponent = isProtectedRoute ? withAuth(Component) : Component;

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <WrappedComponent {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
