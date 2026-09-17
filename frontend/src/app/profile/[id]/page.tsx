'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Download,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from 'lucide-react';
import { ProfileService } from '@/services/profile.service';
import { apiClient } from '@/services/api-client';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/utils/cn';

function ProfileSkeleton() {
  return (
    <main className="shell py-7 sm:py-10">
      <div className="skeleton h-5 w-40 rounded-full" />
      <div className="mt-5 grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="skeleton aspect-[4/5] rounded-[1.75rem]" />
        <div className="grid content-start gap-3">
          <div className="skeleton h-10 w-2/3 rounded-2xl" />
          <div className="skeleton h-5 w-1/3 rounded-full" />
          <div className="skeleton mt-3 h-40 rounded-3xl" />
          <div className="skeleton h-24 rounded-3xl" />
        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: p } = useQuery({ queryKey: ['profile', id], queryFn: () => ProfileService.get(id) });
  const { favouriteIds, toggleFavourite } = useAppStore();

  if (!p)
    return (
      <>
        <SiteHeader />
        <ProfileSkeleton />
        <Footer />
      </>
    );

  const fav = favouriteIds.includes(p.id);
  const firstName = p.name.split(' ')[0];

  const expressInterest = async () => {
    try {
      await apiClient.post(`/interests/${p.id}`);
      toast.success('Interest sent with care!');
    } catch {
      toast.error('Please sign in to express interest.');
    }
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Profile link copied!');
    } catch {
      toast('Copy this page URL to share.');
    }
  };

  const facts = [
    { icon: GraduationCap, label: 'Education', value: p.education },
    { icon: Briefcase, label: 'Profession', value: p.occupation },
    { icon: Users, label: 'Community', value: `${p.religion}, ${p.caste}` },
    { icon: Wallet, label: 'Income', value: p.income },
  ];

  return (
    <>
      <SiteHeader />
      <main className="shell py-7 sm:py-10">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 transition-all hover:gap-2.5"
        >
          <ArrowLeft size={17} />
          Back to discovery
        </Link>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[380px_1fr]">
          {/* Gallery */}
          <div className="card overflow-hidden p-3 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 via-transparent to-transparent" />
              {p.verified && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-green-800 backdrop-blur">
                  <BadgeCheck size={13} />
                  Verified
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={p.image} alt="Gallery photo" fill sizes="120px" className="object-cover" />
              </div>
              <div className="col-span-2 grid place-items-center rounded-xl bg-green-700/[0.07] text-sm font-bold text-green-800 ring-1 ring-inset ring-green-700/10">
                +4 photos after interest
              </div>
            </div>
          </div>

          <div>
            {/* Header card */}
            <section className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="flex flex-wrap items-center gap-2 font-display text-4xl font-bold text-green-950">
                    {p.name}, {p.age}
                    {p.verified && <BadgeCheck size={26} className="text-green-600" />}
                  </h1>
                  <p className="mt-2 flex items-center gap-1.5 text-[15px] text-slate-500">
                    <MapPin size={16} />
                    {p.city} · {p.height}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavourite(p.id)}
                  aria-label="Save to favourites"
                  className={cn(
                    'grid h-12 w-12 place-items-center rounded-2xl transition',
                    fav
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-green-700/[0.07] text-green-800 hover:bg-green-700/[0.12]',
                  )}
                >
                  <Heart size={20} fill={fav ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-green-700/[0.05] p-4 ring-1 ring-inset ring-green-700/10"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-green-700 shadow-sm">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-bold text-green-950">{value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="mt-7 font-display text-2xl font-bold text-green-950">About {firstName}</h2>
              <p className="mt-2 leading-7 text-slate-600">{p.about}</p>

              <h2 className="mt-6 font-display text-2xl font-bold text-green-950">
                What they’re looking for
              </h2>
              <p className="mt-2 leading-7 text-slate-600">
                A warm, emotionally mature partner who values family, independence and a life built
                together.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button size="lg" onClick={expressInterest}>
                  <Heart size={17} />
                  Express interest
                </Button>
                <Button size="lg" variant="secondary" onClick={() => toast('Contact access is included with membership.')}>
                  <Phone size={17} />
                  Call details
                </Button>
                <Button size="lg" variant="secondary" onClick={() => toast('WhatsApp details are shared after mutual interest.')}>
                  <MessageCircle size={17} />
                  WhatsApp
                </Button>
                <Button size="lg" variant="outline" onClick={share}>
                  <Share2 size={17} />
                  Share profile
                </Button>
              </div>

              <button
                onClick={() => toast('Your biodata download is being prepared.')}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
              >
                <Download size={17} />
                Download biodata
              </button>
            </section>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <section className="card p-6">
                <p className="flex items-center gap-2 font-bold text-green-950">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
                    <Star size={17} />
                  </span>
                  Family details
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Shared once both members express interest, keeping every introduction respectful
                  and private.
                </p>
              </section>
              <section className="card bg-gradient-to-b from-green-700/[0.06] to-white p-6">
                <p className="flex items-center gap-2 font-bold text-green-950">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-700 text-white">
                    <ShieldCheck size={17} />
                  </span>
                  Stay safe
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-slate-600">
                  <li>· Keep early conversations on the platform.</li>
                  <li>· Meet in public places, with family informed.</li>
                  <li>· Never share money or sensitive documents.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
