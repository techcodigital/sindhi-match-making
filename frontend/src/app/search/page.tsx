'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  Grid2X2,
  Heart,
  List,
  Search,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  WifiOff,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { ProfileCard } from '@/components/profile-card';
import { SearchService, type SearchFilters } from '@/services/search.service';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/use-app-store';
import type { Profile } from '@/types';
import { cn } from '@/utils/cn';

const initialFilters: SearchFilters = {
  city: '',
  age: '',
  height: '',
  religion: '',
  caste: '',
  education: '',
  occupation: '',
};
const ageGroups = ['18-22', '22-25', '25-28', '28-31', '31-34', '34-37', '37-40'];
const filterLabels: Record<keyof SearchFilters, string> = {
  city: 'City',
  age: 'Age',
  height: 'Height',
  religion: 'Religion',
  caste: 'Caste',
  education: 'Education',
  occupation: 'Occupation',
};

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-green-950/[0.06]">
      <div className="skeleton aspect-[4/5]" />
      <div className="grid gap-2 p-4">
        <div className="skeleton h-4 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="skeleton mt-2 h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}

function CompactRow({ profile }: { profile: Profile }) {
  const { favouriteIds, toggleFavourite } = useAppStore();
  const fav = favouriteIds.includes(profile.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="card flex items-center gap-4 p-4 transition-shadow hover:shadow-lift"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
        <Image src={profile.image} alt={profile.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 font-bold text-green-950">
          {profile.name}, {profile.age}
          {profile.verified && <BadgeCheck size={15} className="shrink-0 text-green-600" />}
        </p>
        <p className="mt-0.5 truncate text-sm text-slate-500">
          {profile.occupation} · {profile.city}
        </p>
      </div>
      <button
        onClick={() => toggleFavourite(profile.id)}
        aria-label="Save to favourites"
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition',
          fav ? 'bg-rose-500 text-white' : 'bg-green-700/[0.07] text-green-800 hover:bg-green-700/[0.12]',
        )}
      >
        <Heart size={17} fill={fav ? 'currentColor' : 'none'} />
      </button>
      <Link
        href={`/profile/${profile.id}`}
        className="hidden shrink-0 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 sm:block"
      >
        View
      </Link>
    </motion.div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [list, setList] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const setFilter = (field: keyof SearchFilters, value: string) =>
    setFilters(current => ({ ...current, [field]: value }));
  const clearFilters = () => {
    setFilters(initialFilters);
    setQuery('');
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profiles', query, filters],
    queryFn: () => SearchService.search(query, filters),
  });

  const results = data?.profiles ?? [];
  const options = data?.filters ?? { height: [], religion: [], caste: [], education: [], occupation: [] };
  const activeFilters = useMemo(
    () => (Object.entries(filters) as [keyof SearchFilters, string][]).filter(([, value]) => value),
    [filters],
  );

  const selectFilter = (label: string, field: keyof SearchFilters, values: string[]) => (
    <label className="label" key={field}>
      {label}
      <select className="field" value={filters[field]} onChange={event => setFilter(field, event.target.value)}>
        <option value="">Any {label.toLowerCase()}</option>
        {values.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <SiteHeader />
      <main className="shell py-8 sm:py-12">
        <p className="eyebrow">Discover</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-green-950 sm:text-[2.75rem]">
          Find a connection that feels familiar.
        </h1>
        <p className="mt-2 max-w-xl text-[15px] text-slate-500">
          Every profile is verified, so you can focus on what truly matters.
        </p>

        <div className="sticky top-[80px] z-30 -mx-1 mt-8 rounded-3xl bg-cream/85 px-1 py-2 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700" size={19} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                className="field mt-0 rounded-2xl py-3.5 pl-11 pr-10 shadow-soft ring-green-950/[0.06]"
                placeholder="Search by name, city or profession"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
              )}
            </label>
            <div className="flex gap-3">
              <Button
                variant={showFilters || activeFilters.length > 0 ? 'primary' : 'secondary'}
                onClick={() => setShowFilters(open => !open)}
                className="min-h-[52px] flex-1 rounded-2xl sm:flex-none"
              >
                <SlidersHorizontal size={17} />
                Filters
                {activeFilters.length > 0 && (
                  <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white/25 px-1.5 text-xs font-extrabold">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
              <div className="hidden items-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-green-950/[0.07] sm:flex">
                <button
                  onClick={() => setList(false)}
                  aria-label="Grid view"
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-xl transition',
                    !list ? 'bg-green-700 text-white shadow' : 'text-slate-400 hover:text-green-800',
                  )}
                >
                  <Grid2X2 size={17} />
                </button>
                <button
                  onClick={() => setList(true)}
                  aria-label="List view"
                  className={cn(
                    'grid h-9 w-9 place-items-center rounded-xl transition',
                    list ? 'bg-green-700 text-white shadow' : 'text-slate-400 hover:text-green-800',
                  )}
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {(activeFilters.length > 0 || query) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery('')}
                className="chip bg-green-700 text-white transition hover:bg-green-800"
              >
                “{query}” <X size={13} />
              </button>
            )}
            {activeFilters.map(([field, value]) => (
              <button
                key={field}
                onClick={() => setFilter(field, '')}
                className="chip bg-white text-green-900 shadow-sm ring-1 ring-green-950/10 transition hover:ring-green-600"
              >
                {filterLabels[field]}: {value} <X size={13} />
              </button>
            ))}
            <button onClick={clearFilters} className="ml-1 text-sm font-bold text-green-700 hover:underline">
              Clear all
            </button>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-green-700/[0.09] to-amber-500/[0.09] p-3.5 text-sm font-semibold text-green-900 ring-1 ring-inset ring-green-700/10">
          <Sparkles size={17} className="shrink-0 text-green-700" />
          Your preferences are applied automatically. Showing verified{' '}
          {data?.lookingFor === 'Man' ? 'men' : 'women'} only.
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <section className="card mt-4 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <b className="font-display text-lg text-green-950">Refine your search</b>
                  <button
                    onClick={() => setShowFilters(false)}
                    aria-label="Close filters"
                    className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="label">
                    City
                    <input
                      className="field"
                      value={filters.city}
                      onChange={event => setFilter('city', event.target.value)}
                      placeholder="Type any city"
                    />
                  </label>
                  {selectFilter('Age group', 'age', ageGroups)}
                  {selectFilter('Height', 'height', options.height)}
                  {selectFilter('Religion', 'religion', options.religion)}
                  {selectFilter('Caste', 'caste', options.caste)}
                  {selectFilter('Education', 'education', options.education)}
                  {selectFilter('Occupation', 'occupation', options.occupation)}
                </div>
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="mt-5 text-sm font-bold text-green-700 hover:underline"
                >
                  Clear all filters
                </button>
              </section>
            </motion.section>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">
            {isLoading ? (
              'Finding profiles…'
            ) : (
              <>
                <b className="font-display text-lg text-green-950">{results.length}</b> verified{' '}
                {results.length === 1 ? 'match' : 'matches'}
              </>
            )}
          </p>
          {!list && <p className="hidden text-xs font-semibold text-slate-400 sm:block">Scroll for more matches</p>}
        </div>

        {isError && (
          <div className="card mt-5 flex flex-col items-center gap-3 p-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500">
              <WifiOff size={24} />
            </span>
            <p className="font-bold text-green-950">Couldn’t reach the local API</p>
            <p className="max-w-sm text-sm text-slate-500">
              Start it with <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">node backend/server.js</code> and
              try again.
            </p>
            <Button variant="secondary" onClick={() => refetch()} className="mt-2">
              Retry
            </Button>
          </div>
        )}

        {isLoading && (
          <div className={list ? 'mt-5 grid max-w-3xl gap-4' : 'mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {Array.from({ length: list ? 4 : 8 }).map((_, index) =>
              list ? (
                <div key={index} className="card flex items-center gap-4 p-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />
                  <div className="grid flex-1 gap-2">
                    <div className="skeleton h-4 w-1/2 rounded-full" />
                    <div className="skeleton h-3 w-2/3 rounded-full" />
                  </div>
                </div>
              ) : (
                <SkeletonCard key={index} />
              ),
            )}
          </div>
        )}

        {!isLoading && !isError && results.length > 0 && (
          <div className={list ? 'mt-5 grid max-w-3xl gap-4' : 'mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {results.map(profile =>
              list ? <CompactRow key={profile.id} profile={profile} /> : <ProfileCard key={profile.id} profile={profile} />,
            )}
          </div>
        )}

        {!isLoading && !isError && results.length === 0 && (
          <div className="card mt-5 flex flex-col items-center p-10 text-center sm:p-14">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green-700/[0.07] text-green-700">
              <SearchX size={24} />
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-green-950">No matches just yet</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Try clearing one or more filters — your person might be one adjustment away.
            </p>
            <Button variant="secondary" onClick={clearFilters} className="mt-5">
              Clear all filters
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
