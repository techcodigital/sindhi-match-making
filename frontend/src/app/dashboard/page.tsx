'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Bell, Camera, ChevronRight, Crown, Edit3, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile-card';
import { NotificationService } from '@/services/notification.service';
import { SearchService } from '@/services/search.service';
import { SessionService } from '@/services/session.service';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function LoadingState() {
  return (
    <main className="shell py-8 sm:py-10">
      <div className="skeleton h-4 w-28 rounded-full" />
      <div className="skeleton mt-3 h-10 w-72 rounded-2xl" />
      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        <div className="skeleton h-64 rounded-3xl lg:col-span-2" />
        <div className="skeleton h-64 rounded-3xl" />
      </div>
    </main>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const session = useQuery({ queryKey: ['session'], queryFn: SessionService.current, retry: false });
  const notes = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationService.list,
    enabled: Boolean(session.data?.profile),
  });
  const suggestions = useQuery({
    queryKey: ['suggestions'],
    queryFn: () =>
      SearchService.search('', { city: '', age: '', height: '', religion: '', caste: '', education: '', occupation: '' }),
    enabled: Boolean(session.data?.profile),
  });

  if (session.isLoading)
    return (
      <>
        <SiteHeader />
        <LoadingState />
      </>
    );
  if (!session.data?.profile) {
    router.replace('/login');
    return null;
  }

  const profile = session.data.profile;
  const firstName = profile.name.split(' ')[0];
  const suggestedProfiles = suggestions.data?.profiles.slice(0, 4) ?? [];
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <SiteHeader />
      <main className="shell py-8 sm:py-10">
        <p className="eyebrow">Your space</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
          <h1 className="font-display text-4xl font-bold text-green-950 sm:text-[2.75rem]">
            {greeting()}, {firstName}.
          </h1>
          <p className="pb-1 text-sm text-slate-500">Here’s your day at a glance.</p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {/* Profile hero */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-900 to-green-950 p-6 text-white shadow-lift sm:p-7 lg:col-span-2">
            <div className="bg-dots-light absolute inset-0 opacity-25" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-400/20 blur-3xl" />
            <div className="relative flex flex-wrap items-center gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl ring-2 ring-white/30">
                <Image src={profile.image} alt={profile.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-green-200">
                  <ShieldCheck size={14} />
                  Verified member
                </p>
                <p className="mt-1.5 truncate font-display text-3xl font-bold">
                  {profile.name}, {profile.age}
                </p>
                <p className="mt-1 text-sm text-green-100/90">
                  {profile.occupation} · {profile.city}
                </p>
              </div>
              <div className="relative hidden place-items-center sm:grid" title="Profile completion">
                <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
                  <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="8" />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#6ee7b7"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - profile.completion / 100)}
                  />
                </svg>
                <span className="absolute text-lg font-extrabold">{profile.completion}%</span>
              </div>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center gap-2.5">
              <Link href="/setup">
                <Button size="sm" variant="white">
                  <Edit3 size={15} />
                  Edit profile
                </Button>
              </Link>
              <Link
                href="/search"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-bold text-white ring-1 ring-inset ring-white/25 transition hover:bg-white/10"
              >
                <Sparkles size={15} />
                Discover matches
              </Link>
            </div>
          </section>

          {/* Membership */}
          <section className="card relative overflow-hidden p-6">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/50 blur-2xl" />
            <p className="relative flex items-center gap-2.5 font-bold text-green-950">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-green-950 shadow-md shadow-amber-500/25">
                <Crown size={19} />
              </span>
              Your membership
            </p>
            <p className="relative mt-4 text-sm leading-6 text-slate-600">
              You’re on the <b className="text-green-900">complimentary plan</b>. Discover verified
              profiles at your own pace.
            </p>
            <Link
              href="/membership"
              className="relative mt-5 inline-flex items-center gap-1 text-sm font-bold text-green-700 transition-all hover:gap-2"
            >
              Explore benefits <ChevronRight size={16} />
            </Link>
          </section>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {/* Activity */}
          <section className="card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-green-950">Recent activity</h2>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-700/[0.07] text-green-700">
                <Bell size={18} />
              </span>
            </div>
            <div className="mt-3 divide-y divide-green-950/[0.06]">
              {(notes.data ?? []).length ? (
                notes.data?.map(note => (
                  <div key={note.id} className="flex items-start justify-between gap-3 py-4 text-sm">
                    <p className="flex gap-2.5 leading-6 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      {note.text}
                    </p>
                    <span className="shrink-0 pt-0.5 text-xs font-medium text-slate-400">{note.time}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green-700/[0.07] text-green-700">
                    <Sparkles size={18} />
                  </span>
                  Your activity will appear here as you explore.
                </div>
              )}
            </div>
          </section>

          {/* Tip */}
          <section className="card flex flex-col bg-gradient-to-b from-green-700/[0.06] to-white p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-700 text-white shadow-md shadow-green-700/25">
              <Camera size={18} />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-green-950">A friendly reminder</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Profiles with a clear, smiling photo receive far more meaningful responses.
            </p>
            <Link
              href="/setup"
              className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold text-green-700 transition-all hover:gap-2"
            >
              Update profile <ChevronRight size={16} />
            </Link>
          </section>
        </div>

        {/* Suggestions */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Curated for you</p>
              <h2 className="mt-1.5 font-display text-3xl font-bold text-green-950">Suggested matches</h2>
            </div>
            <Link href="/search">
              <Button variant="secondary">
                <Sparkles size={16} />
                Discover more
              </Button>
            </Link>
          </div>
          {suggestions.isLoading ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton h-96 rounded-[1.75rem]" />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {suggestedProfiles.map(item => (
                <ProfileCard key={item.id} profile={item} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
