'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Bell, Camera, ChevronRight, Crown, Edit3, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile-card';
import { NotificationService } from '@/services/notification.service';
import { SearchService } from '@/services/search.service';
import { SessionService } from '@/services/session.service';

export default function Dashboard() {
  const router = useRouter();
  const session = useQuery({ queryKey:['session'], queryFn:SessionService.current, retry:false });
  const notes = useQuery({ queryKey:['notifications'], queryFn:NotificationService.list, enabled:Boolean(session.data?.profile) });
  const suggestions = useQuery({ queryKey:['suggestions'], queryFn:() => SearchService.search('', { city:'', age:'', height:'', religion:'', caste:'', education:'', occupation:'' }), enabled:Boolean(session.data?.profile) });
  if (session.isLoading) return <><SiteHeader /><main className="shell py-20 text-center text-slate-600">Loading your profile…</main></>;
  if (!session.data?.profile) { router.replace('/login'); return null; }
  const profile = session.data.profile;
  const firstName = profile.name.split(' ')[0];
  const suggestedProfiles = suggestions.data?.profiles.slice(0, 4) ?? [];
  return <><SiteHeader /><main className="shell py-8"><p className="eyebrow">Your space</p><h1 className="mt-2 text-3xl font-extrabold text-green-950">Good morning, {firstName}.</h1><div className="mt-7 grid gap-5 lg:grid-cols-[1.5fr_1fr]"><section className="card overflow-hidden bg-gradient-to-br from-green-700 to-green-950 p-6 text-white"><p className="text-sm text-green-100">Your profile is saved</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><p className="text-4xl font-extrabold">{profile.completion}%</p><p className="mt-1 text-sm text-green-100">Your details are safely stored on this computer.</p></div><Link href="/setup"><Button className="bg-white text-green-800 hover:bg-green-50"><Edit3 size={16} />Edit profile</Button></Link></div><div className="mt-6 h-2 rounded-full bg-green-900"><div className="h-2 rounded-full bg-green-300" style={{ width:`${profile.completion}%` }} /></div></section><section className="card p-6"><p className="flex items-center gap-2 font-bold"><Crown className="text-green-600" size={19} />Your membership</p><p className="mt-3 text-sm leading-6 text-slate-600">You’re on the complimentary plan. Discover verified profiles at your own pace.</p><Link href="/membership" className="mt-4 inline-flex text-sm font-bold text-green-700">Explore benefits <ChevronRight size={16} /></Link></section></div><div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]"><section className="card p-6"><div className="flex justify-between"><h2 className="font-bold">Recent activity</h2><Bell size={18} className="text-green-600" /></div><div className="mt-4 divide-y divide-green-50">{(notes.data ?? []).length ? notes.data?.map(note => <div key={note.id} className="flex justify-between gap-3 py-4 text-sm"><p>{note.text}</p><span className="shrink-0 text-xs text-slate-400">{note.time}</span></div>) : <p className="py-4 text-sm text-slate-500">Your activity will appear here.</p>}</div></section><section className="card p-6"><p className="flex items-center gap-2 font-bold"><Camera size={18} className="text-green-600" />A friendly reminder</p><p className="mt-2 text-sm leading-6 text-slate-600">Profiles with a clear photo get more meaningful responses.</p><Link href="/setup" className="mt-4 inline-flex text-sm font-bold text-green-700">Update profile</Link></section></div><section className="mt-10"><div className="flex items-center justify-between"><div><p className="eyebrow">Curated for you</p><h2 className="mt-1 text-2xl font-extrabold text-green-950">Suggested matches</h2></div><Link href="/search"><Button variant="secondary"><Sparkles size={16} />Discover more</Button></Link></div><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{suggestedProfiles.map(item => <ProfileCard key={item.id} profile={item} />)}</div></section></main><Footer /></>;
}
