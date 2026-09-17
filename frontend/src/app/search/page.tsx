'use client';

import { useQuery } from '@tanstack/react-query';
import { Grid2X2, List, Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { ProfileCard } from '@/components/profile-card';
import { SearchService, type SearchFilters } from '@/services/search.service';
import { Button } from '@/components/ui/button';

const initialFilters: SearchFilters = { city: '', age: '', height: '', religion: '', caste: '', education: '', occupation: '' };
const ageGroups = ['18-22', '22-25', '25-28', '28-31', '31-34', '34-37', '37-40'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [list, setList] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const setFilter = (field: keyof SearchFilters, value: string) => setFilters(current => ({ ...current, [field]: value }));
  const { data, isLoading, isError } = useQuery({ queryKey: ['profiles', query, filters], queryFn: () => SearchService.search(query, filters) });
  const results = data?.profiles ?? [];
  const options = data?.filters ?? { height: [], religion: [], caste: [], education: [], occupation: [] };
  const selectFilter = (label: string, field: keyof SearchFilters, values: string[]) => <label className="label">{label}<select className="field" value={filters[field]} onChange={event => setFilter(field, event.target.value)}><option value="">Any {label}</option>{values.map(value => <option key={value} value={value}>{value}</option>)}</select></label>;

  return <><SiteHeader /><main className="shell py-8 sm:py-12"><p className="eyebrow">Discover</p><h1 className="mt-2 text-3xl font-extrabold text-green-950 sm:text-4xl">Find a connection that feels familiar.</h1><div className="mt-7 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-3 text-green-600" size={19} /><input value={query} onChange={event => setQuery(event.target.value)} className="field mt-0 pl-10" placeholder="Search by name, city or profession" /></label><Button variant="secondary" onClick={() => setShowFilters(open => !open)}><SlidersHorizontal size={17} />Filters</Button><div className="hidden rounded-xl bg-green-50 p-1 sm:flex"><button onClick={() => setList(false)} className={`grid h-9 w-9 place-items-center rounded-lg text-green-700 ${!list ? 'bg-white' : ''}`}><Grid2X2 size={17} /></button><button onClick={() => setList(true)} className={`grid h-9 w-9 place-items-center rounded-lg text-green-700 ${list ? 'bg-white' : ''}`}><List size={17} /></button></div></div><div className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">Your profile preferences are applied automatically. Showing verified {data?.lookingFor === 'Man' ? 'men' : 'women'} only.</div>{showFilters && <section className="card mt-4 p-5"><div className="flex items-center justify-between"><b>Refine your search</b><button onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={18} /></button></div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="label">City<input className="field" value={filters.city} onChange={event => setFilter('city', event.target.value)} placeholder="Type any city" /></label>{selectFilter('Age group', 'age', ageGroups)}{selectFilter('Height', 'height', options.height)}{selectFilter('Religion', 'religion', options.religion)}{selectFilter('Caste', 'caste', options.caste)}{selectFilter('Education', 'education', options.education)}{selectFilter('Occupation', 'occupation', options.occupation)}</div><button onClick={() => setFilters(initialFilters)} className="mt-4 text-sm font-bold text-green-700">Clear all filters</button></section>}<div className="mt-8 flex items-center justify-between"><p className="text-sm text-slate-500">{isLoading ? 'Finding profiles…' : `${results.length} verified matches`}</p><p className="text-xs font-semibold text-green-700">Scroll for more matches</p></div>{isError && <p className="card mt-5 p-5 text-sm text-red-700">Local API is not running. Start it with <code>node backend/server.js</code>.</p>}<div className={`mt-5 grid gap-5 ${list ? 'max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>{results.map(profile => <ProfileCard key={profile.id} profile={profile} />)}</div>{!isLoading && !isError && results.length === 0 && <p className="card mt-5 p-6 text-center text-sm text-slate-600">No profiles match these filters. Try clearing one or more filters.</p>}</main><Footer /></>;
}
