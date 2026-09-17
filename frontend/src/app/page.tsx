import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile-card';
import { Reveal } from '@/components/reveal';
import { profiles } from '@/mocks/data';

const stats = [
  ['10k+', 'Community members'],
  ['100%', 'Hand-verified profiles'],
  ['40+', 'Cities worldwide'],
  ['4.9', 'Average rating'],
] as const;

const steps = [
  {
    icon: Sparkles,
    title: 'Tell your story',
    text: 'Add the details that matter — your background, interests and what you hope to find.',
  },
  {
    icon: Search,
    title: 'Discover with intention',
    text: 'Explore curated profiles with filters that keep your values in focus.',
  },
  {
    icon: Heart,
    title: 'Begin a conversation',
    text: 'Express interest when it feels right. We help keep every interaction respectful.',
  },
] as const;

const stories = [
  {
    quote: 'We matched over our love for Sindhi food and old songs. Six months later, our families met.',
    names: 'Priya & Aman',
    meta: 'Married 2025 · Pune',
    initials: 'PA',
  },
  {
    quote: 'The verification gave my parents confidence, and the filters saved us so much time.',
    names: 'Kavya & Rohan',
    meta: 'Engaged 2025 · Mumbai',
    initials: 'KR',
  },
  {
    quote: 'Respectful conversations from day one. It never felt like just another app.',
    names: 'Simran & Arjun',
    meta: 'Married 2024 · Delhi',
    initials: 'SA',
  },
] as const;

const faqs = [
  [
    'Is my profile private?',
    'Yes. Your details are visible only to verified members, and you choose when to share contact information.',
  ],
  [
    'How does matching work?',
    'Start with profiles that share your essentials, then use filters to find the connection that feels right.',
  ],
  [
    'Is it free for women?',
    'Yes. Creating a profile and discovering matches is always complimentary for women.',
  ],
  [
    'How do I stay safe?',
    'Every member is verified, conversations stay respectful, and you can report anything that feels off.',
  ],
] as const;

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

export default function Home() {
  const featured = profiles[0];

  return (
    <>
      <SiteHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="shell grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow-pill">
              <Sparkles size={13} />
              For Sindhis, everywhere
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-tight text-green-950 sm:text-6xl lg:text-[4.4rem]">
              Where shared roots meet a{' '}
              <em className="bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
                beautiful future.
              </em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Thoughtful introductions for the Sindhi community — built around values, verified
              profiles, and the quiet confidence of being understood.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/search">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore matches
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  How it works
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {profiles.slice(0, 5).map(person => (
                  <Image
                    key={person.id}
                    src={person.image}
                    alt={person.name}
                    width={72}
                    height={72}
                    className="h-10 w-10 rounded-full object-cover ring-[2.5px] ring-cream"
                  />
                ))}
              </div>
              <div>
                <Stars />
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  Joined by <b className="text-green-900">10,000+ Sindhis</b> worldwide
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-green-600" />
                Verified members
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-600" />
                Private by design
              </span>
              <span className="flex items-center gap-2">
                <Gift size={18} className="text-green-600" />
                Free for women
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-green-200/60 via-amber-100/50 to-green-100/40 blur-2xl" />
            <div className="bg-dots absolute -right-6 -top-6 h-32 w-32 opacity-70" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-green-950/10">
              <Image
                src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80"
                alt="A couple enjoying a moment outdoors"
                width={900}
                height={1100}
                priority
                className="h-[440px] w-full object-cover sm:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -left-3 top-8 flex animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift backdrop-blur sm:-left-8">
              <Image
                src={featured.image}
                alt={featured.name}
                width={96}
                height={96}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div>
                <p className="flex items-center gap-1 text-sm font-extrabold text-green-950">
                  {featured.name}, {featured.age}
                  <BadgeCheck size={14} className="text-green-600" />
                </p>
                <p className="text-xs font-medium text-slate-500">{featured.city} · Verified</p>
              </div>
            </div>

            <div className="absolute -right-2 bottom-12 flex animate-float-slow items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift backdrop-blur [animation-delay:1.4s] sm:-right-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-500">
                <Heart size={20} fill="currentColor" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-green-950">Interest received</p>
                <p className="text-xs font-medium text-slate-500">Rohan S. · 2m ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────── */}
        <section className="border-y border-green-950/[0.08] bg-white/70 backdrop-blur">
          <div className="shell grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-4xl font-bold text-green-800 sm:text-[2.75rem]">
                  {value}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured profiles ────────────────────────────── */}
        <section className="shell py-16 sm:py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Start somewhere meaningful</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-green-950 sm:text-4xl">
                  People you may like
                </h2>
              </div>
              <Link
                href="/search"
                className="group hidden items-center gap-1 text-sm font-bold text-green-700 sm:inline-flex"
              >
                See all
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {profiles.slice(0, 8).map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
          <Link href="/search" className="mt-8 flex justify-center sm:hidden">
            <Button variant="secondary" className="w-full">
              See all matches
              <ArrowRight size={16} />
            </Button>
          </Link>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden bg-green-950 py-16 text-white sm:py-24">
          <div className="bg-dots-light absolute inset-0 opacity-30" />
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="shell relative">
            <Reveal>
              <p className="eyebrow text-green-300">A more thoughtful process</p>
              <h2 className="mt-2 max-w-xl font-display text-3xl font-bold sm:text-4xl">
                Simple, private, and entirely yours.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.12}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:border-amber-300/30 hover:bg-white/[0.08]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-green-950 shadow-lg shadow-amber-500/20">
                        <step.icon size={21} />
                      </span>
                      <span className="font-display text-5xl font-bold text-white/10">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-green-100/80">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10 text-center">
              <Link href="/login">
                <Button variant="gold" size="lg">
                  Create your free profile
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Stories ──────────────────────────────────────── */}
        <section id="stories" className="shell scroll-mt-24 py-16 sm:py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Community stories</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-green-950 sm:text-4xl">
              Love, the Sindhi way.
            </h2>
            <p className="mt-3 text-slate-600">
              Real beginnings from members who found their person — and their peace.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {stories.map((story, index) => (
              <Reveal key={story.names} delay={index * 0.12}>
                <figure className="card flex h-full flex-col p-7 transition-shadow hover:shadow-lift">
                  <Quote size={26} className="text-amber-500" fill="currentColor" />
                  <blockquote className="mt-4 flex-1 font-display text-[1.15rem] italic leading-8 text-green-950">
                    “{story.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-green-950/[0.07] pt-5">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-green-600 to-green-800 text-sm font-extrabold text-white">
                      {story.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-green-950">{story.names}</span>
                      <span className="block text-xs font-medium text-slate-500">{story.meta}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section id="faq" className="shell scroll-mt-24 pb-4">
          <Reveal>
            <p className="eyebrow">Helpful answers</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-green-950 sm:text-4xl">
              A few things you might ask.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {faqs.map(([question, answer]) => (
              <Reveal key={question}>
                <article className="card h-full p-6 transition-shadow hover:shadow-lift">
                  <h3 className="font-bold text-green-950">{question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────── */}
        <section className="shell py-16 sm:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-green-700 via-green-800 to-green-950 px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16">
              <div className="bg-dots-light absolute inset-0 opacity-25" />
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />
              <p className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                <Heart size={24} className="text-amber-300" fill="currentColor" />
              </p>
              <h2 className="relative mx-auto mt-6 max-w-xl font-display text-3xl font-bold leading-tight sm:text-[2.75rem]">
                Your story could begin today.
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-7 text-green-100">
                Join a community that values family, honesty and meaningful partnership.
              </p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/login">
                  <Button variant="white" size="lg" className="w-full sm:w-auto">
                    Get started — it’s free
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Browse matches
                  </Button>
                </Link>
              </div>
              <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-green-200/70">
                Free for women · 2 minutes to join
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
