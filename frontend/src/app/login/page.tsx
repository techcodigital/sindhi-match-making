'use client';

import { ArrowLeft, BadgeCheck, Gift, Heart, Quote, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/services/api-client';
import { SessionService } from '@/services/session.service';

const points = [
  { icon: BadgeCheck, text: 'A 100% verified community' },
  { icon: ShieldCheck, text: 'You control who sees what' },
  { icon: Gift, text: 'Always free for women' },
];

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (SessionService.signedIn())
      SessionService.current()
        .then(({ profile }) => router.replace(profile ? '/dashboard' : '/setup'))
        .catch(SessionService.signOut);
  }, [router]);

  const valid = phone.replace(/\D/g, '').length >= 4;

  const login = async () => {
    if (!valid) return;
    try {
      setBusy(true);
      const { data } = await apiClient.post<{ token: string; profile: null | { id: string } }>(
        '/auth/login',
        { phone },
      );
      window.localStorage.setItem('smm_token', data.token);
      toast.success('Welcome! Let’s continue.');
      router.push(data.profile ? '/dashboard' : '/setup');
    } catch {
      toast.error('Local backend is not running. Start it with node backend/server.js');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-green-950 p-12 text-white lg:flex">
        <div className="bg-dots-light absolute inset-0 opacity-30" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
            <Heart size={18} fill="currentColor" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold">Sindhi</span>
            <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.3em] text-green-300">
              Match Making
            </span>
          </span>
        </Link>

        <div className="relative">
          <p className="eyebrow text-green-300">Welcome back</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.06]">
            Every great story begins with <em className="text-amber-300">hello</em>.
          </h1>
          <ul className="mt-8 grid gap-4">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] font-medium text-green-100">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.08] text-amber-300 ring-1 ring-white/10">
                  <Icon size={18} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10 backdrop-blur">
          <Quote size={20} className="text-amber-300" fill="currentColor" />
          <blockquote className="mt-3 font-display text-xl italic leading-8">
            “It felt personal from the very first profile.”
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-green-200">Meera · Pune</figcaption>
        </figure>
      </aside>

      {/* Form panel */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-green-800 text-white shadow-lg shadow-green-700/30">
              <Heart size={18} fill="currentColor" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-bold text-green-950">Sindhi</span>
              <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.3em] text-green-700">
                Match Making
              </span>
            </span>
          </Link>

          <div className="card p-6 sm:p-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700 transition hover:gap-2.5"
            >
              <ArrowLeft size={16} />
              Home
            </Link>
            <p className="eyebrow mt-7">Welcome</p>
            <h1 className="mt-2 font-display text-4xl font-bold text-green-950">
              Sign in to continue.
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your mobile number to sign in or create your profile.
            </p>

            <label className="label mt-6">
              Mobile number
              <input
                className="field tracking-wide"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                onKeyDown={event => event.key === 'Enter' && login()}
                placeholder="98765 43210"
                inputMode="tel"
                autoComplete="tel"
                maxLength={15}
              />
            </label>
            <p className="mt-2 text-xs text-slate-400">Demo mode — any number works, no OTP needed.</p>

            <Button onClick={login} loading={busy} disabled={!valid} size="lg" className="mt-5 w-full">
              Continue
            </Button>

            <p className="mt-6 flex gap-2.5 rounded-2xl bg-green-700/[0.06] p-3.5 text-xs leading-5 text-green-900 ring-1 ring-inset ring-green-700/10">
              <ShieldCheck size={18} className="shrink-0 text-green-700" />
              Your profile and sign-in session are saved locally on this computer.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            By continuing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
