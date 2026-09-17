'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Heart, MapPin } from 'lucide-react';
import type { Profile } from '@/types';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/utils/cn';

export function ProfileCard({ profile }: { profile: Profile }) {
  const { favouriteIds, toggleFavourite } = useAppStore();
  const fav = favouriteIds.includes(profile.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-green-950/[0.06] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-950/0 to-green-950/10" />

        {profile.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-green-800 backdrop-blur">
            <BadgeCheck size={13} />
            Verified
          </span>
        )}

        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => toggleFavourite(profile.id)}
          aria-label="Save to favourites"
          className={cn(
            'absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition',
            fav
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-white/90 text-green-900 hover:bg-white',
          )}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </motion.button>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <p className="font-display text-[22px] font-bold leading-tight">
            {profile.name}, {profile.age}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[13px] font-medium text-white/85">
            <MapPin size={13} />
            {profile.city} · {profile.height}
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-semibold text-slate-600">{profile.occupation}</p>
        <p className="truncate text-[13px] text-slate-400">{profile.education}</p>
        <Link
          href={`/profile/${profile.id}`}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-green-700/[0.07] py-2.5 text-sm font-bold text-green-900 ring-1 ring-inset ring-green-700/10 transition hover:bg-green-700 hover:text-white hover:ring-green-700"
        >
          View profile
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </motion.article>
  );
}
