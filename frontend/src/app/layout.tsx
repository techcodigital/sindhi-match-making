import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/providers';

export const metadata: Metadata = { title: 'Sindhi Match Making', description: 'A meaningful beginning, thoughtfully matched.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
