'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '16px',
            padding: '12px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#16281e',
            boxShadow: '0 24px 60px -16px rgb(22 50 30 / 0.28)',
          },
          success: { iconTheme: { primary: '#15803d', secondary: '#ffffff' } },
        }}
      />
    </QueryClientProvider>
  );
}
