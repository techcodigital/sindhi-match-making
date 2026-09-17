import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/full-italic.css';
import './globals.css';
import { Providers } from '@/providers/providers';

export const metadata: Metadata = {
  title: {
    default: 'Sindhi Match Making — Where shared roots meet a beautiful future',
    template: '%s · Sindhi Match Making',
  },
  description:
    'Thoughtful introductions for the Sindhi community — verified profiles, private by design, and always free for women.',
};

export const viewport: Viewport = { themeColor: '#14532d' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
