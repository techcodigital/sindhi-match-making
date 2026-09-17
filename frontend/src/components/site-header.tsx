'use client';

import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { SessionService } from '@/services/session.service';

const links = [['Discover', '/search'], ['Membership', '/membership'], ['How it works', '/#how-it-works']];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  useEffect(() => setSignedIn(SessionService.signedIn()), []);
  const logout = () => { SessionService.signOut(); setSignedIn(false); setOpen(false); router.push('/'); };
  const authLinks = signedIn ? <><Link href="/dashboard"><Button variant="secondary">Dashboard</Button></Link><button onClick={logout} className="text-sm font-bold text-green-700">Log out</button></> : <Link href="/login"><Button>Sign in</Button></Link>;
  return <header className="sticky top-0 z-40 border-b border-green-100/70 bg-[#f8faf8]/90 backdrop-blur"><div className="shell flex h-16 items-center justify-between"><Link href="/" className="flex items-center gap-2 font-bold text-green-800"><span className="grid h-9 w-9 place-items-center rounded-xl bg-green-600 text-white"><Heart size={18} fill="currentColor" /></span><span>Sindhi <em className="font-serif not-italic">Match Making</em></span></Link><nav className="hidden items-center gap-5 md:flex">{links.map(([label, href]) => <Link key={label} href={href} className="nav-link">{label}</Link>)}{authLinks}</nav><button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl text-green-800 md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav className="shell flex flex-col gap-2 border-t border-green-100 py-3 md:hidden">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={label} href={href} className="nav-link rounded-lg px-3 py-3">{label}</Link>)}{signedIn ? <><Link href="/dashboard" onClick={() => setOpen(false)}><Button variant="secondary" className="w-full">Dashboard</Button></Link><Button variant="ghost" onClick={logout} className="w-full">Log out</Button></> : <Link href="/login" onClick={() => setOpen(false)}><Button className="w-full">Sign in</Button></Link>}</nav>}</header>;
}
