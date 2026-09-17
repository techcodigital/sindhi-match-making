'use client';

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/services/api-client';
import { SessionService } from '@/services/session.service';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  useEffect(() => { if (SessionService.signedIn()) SessionService.current().then(({ profile }) => router.replace(profile ? '/dashboard' : '/setup')).catch(SessionService.signOut); }, [router]);
  const login = async () => {
    try {
      setBusy(true);
      const { data } = await apiClient.post<{ token:string; profile:null | { id:string } }>('/auth/login', { phone });
      window.localStorage.setItem('smm_token', data.token);
      router.push(data.profile ? '/dashboard' : '/setup');
    } catch {
      toast.error('Local backend is not running. Start it with node backend/server.js');
    } finally { setBusy(false); }
  };

  return <>
    <SiteHeader />
    <main className="shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <section className="card w-full max-w-md p-6 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-green-700"><ArrowLeft size={16} />Home</Link>
        <p className="eyebrow mt-7">Welcome</p>
        <h1 className="mt-2 text-3xl font-extrabold text-green-950">Sign in to continue.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Enter any mobile number for now and continue to create your profile.</p>
        <label className="label mt-6 block">Mobile number<input className="field" value={phone} onChange={event => setPhone(event.target.value)} placeholder="Enter any number" inputMode="tel" autoComplete="tel" /></label>
        <Button onClick={login} disabled={busy} className="mt-5 w-full">{busy ? 'Signing in…' : 'Continue'}</Button>
        <p className="mt-6 flex gap-2 rounded-xl bg-green-50 p-3 text-xs leading-5 text-green-800"><ShieldCheck size={18} className="shrink-0" />Your profile and sign-in session are saved locally on this computer.</p>
      </section>
    </main>
  </>;
}
