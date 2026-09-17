'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { SessionService } from '@/services/session.service';
import { cn } from '@/utils/cn';

const links = [
  { label: 'Discover', href: '/search' },
  { label: 'Membership', href: '/membership' },
  { label: 'How it works', href: '/#how-it-works' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setSignedIn(SessionService.signedIn());
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    SessionService.signOut();
    setSignedIn(false);
    setOpen(false);
    router.push('/');
  };

  return (
    <>
      <div className="bg-green-950 px-4 py-2 text-center text-[13px] font-semibold tracking-wide text-green-100">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-300 align-middle" />
        Free for women · Every profile hand-verified
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled
            ? 'border-green-950/10 bg-cream/90 shadow-soft backdrop-blur-xl'
            : 'border-transparent bg-cream/60 backdrop-blur-md',
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Sindhi Match Making home">
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

          <nav className="hidden items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-sm ring-1 ring-green-950/[0.07] md:flex">
            {links.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={cn('nav-link', pathname === link.href && 'nav-link-active')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {signedIn ? (
              <>
                <Link href="/dashboard">
                  <Button size="sm" variant="secondary">
                    <LayoutDashboard size={15} />
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={logout}
                  title="Log out"
                  aria-label="Log out"
                  className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={17} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">
                  Sign in
                </Link>
                <Link href="/login">
                  <Button size="sm">Join free</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(value => !value)}
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-xl text-green-950 transition hover:bg-green-700/[0.07] md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-green-950/[0.07] bg-cream/95 backdrop-blur-xl md:hidden"
            >
              <div className="shell flex flex-col gap-1 py-4">
                {links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-[15px] font-bold text-slate-700 transition hover:bg-green-700/[0.07] hover:text-green-950',
                      pathname === link.href && 'bg-green-700/[0.08] text-green-950',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 grid gap-2 border-t border-green-950/[0.07] pt-4">
                  {signedIn ? (
                    <>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button variant="secondary" className="w-full">
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="ghost" onClick={logout} className="w-full">
                        Log out
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full">Sign in · Join free</Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
