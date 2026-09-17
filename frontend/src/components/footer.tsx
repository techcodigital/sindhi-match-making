import Link from 'next/link';
import { Facebook, Heart, Instagram, Mail, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Discover matches', '/search'],
      ['Membership', '/membership'],
      ['Success stories', '/#stories'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['How it works', '/#how-it-works'],
      ['Sign in', '/login'],
      ['Create profile', '/setup'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['FAQs', '/#faq'],
      ['Contact us', 'mailto:hello@sindhimatchmaking.in'],
      ['Safety & privacy', '/#faq'],
    ],
  },
] as const;

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@sindhimatchmaking.in' },
];

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-green-950 text-green-100">
      <div className="h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />

      <div className="shell relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
              <Heart size={18} fill="currentColor" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-bold text-white">Sindhi</span>
              <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.3em] text-green-300">
                Match Making
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-green-200/90">
            A more thoughtful way to meet someone who shares your roots — and your future.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.07] text-green-100 ring-1 ring-white/10 transition hover:bg-white/[0.14] hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {columns.map(column => (
          <div key={column.title}>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-300">{column.title}</p>
            <ul className="mt-4 grid gap-2.5 text-sm font-medium">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-green-100/80 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-green-300/80 sm:flex-row">
          <p>© 2026 Sindhi Match Making. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-amber-300" fill="currentColor" /> for meaningful connections
          </p>
        </div>
      </div>
    </footer>
  );
}
