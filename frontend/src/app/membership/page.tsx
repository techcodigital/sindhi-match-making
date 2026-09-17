'use client';

import { useQuery } from '@tanstack/react-query';
import { Check, Crown, Gift, Lock, ShieldCheck, Sparkles, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SubscriptionService } from '@/services/subscription.service';
import type { Plan } from '@/types';

function PlanSkeleton() {
  return (
    <div className="card grid gap-3 p-8">
      <div className="skeleton h-12 w-12 rounded-2xl" />
      <div className="skeleton h-7 w-1/2 rounded-full" />
      <div className="skeleton h-4 w-2/3 rounded-full" />
      <div className="skeleton mt-3 h-12 w-1/3 rounded-2xl" />
      <div className="skeleton mt-3 h-4 w-full rounded-full" />
      <div className="skeleton h-4 w-full rounded-full" />
      <div className="skeleton h-4 w-3/4 rounded-full" />
      <div className="skeleton mt-4 h-12 w-full rounded-xl" />
    </div>
  );
}

export default function Membership() {
  const router = useRouter();
  const { data, isLoading } = useQuery<Plan[]>({ queryKey: ['plans'], queryFn: SubscriptionService.getPlans });
  const plans = data ?? [];

  const handleChoose = async (planName: string) => {
    const result = await SubscriptionService.subscribe(planName);
    router.push(result.success ? '/membership/success' : '/membership/failure');
  };

  return (
    <>
      <SiteHeader />

      <main className="shell py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill">
            <Sparkles size={13} />
            Membership, thoughtfully simple
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-green-950 sm:text-5xl">
            A small step toward something{' '}
            <em className="bg-gradient-to-r from-green-700 to-amber-600 bg-clip-text text-transparent">
              meaningful.
            </em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
            Choose the access that’s right for you. No surprise fees, no pressure — just a more
            personal way to meet.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {isLoading ? (
            <>
              <PlanSkeleton />
              <PlanSkeleton />
            </>
          ) : (
            plans.map(plan =>
              plan.featured ? (
                <article
                  key={plan.name}
                  className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-800 via-green-900 to-green-950 p-8 text-white shadow-lift"
                >
                  <div className="bg-dots-light absolute inset-0 opacity-30" />
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" />
                  <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-green-950 shadow-lg shadow-amber-500/30">
                    Most chosen
                  </span>
                  <div className="relative mt-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
                      <Crown size={22} />
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold">{plan.name}</h2>
                    <p className="mt-1 text-sm text-green-200">{plan.note}</p>
                    <p className="mt-6 font-display text-5xl font-bold">{plan.price}</p>
                    <p className="mt-1 text-sm text-green-200/80">monthly · cancel anytime</p>
                    <ul className="mt-7 grid gap-3">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex gap-2.5 text-sm text-green-50">
                          <Check size={17} className="shrink-0 text-amber-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="gold" size="lg" onClick={() => handleChoose(plan.name)} className="mt-8 w-full">
                      Choose membership
                    </Button>
                  </div>
                </article>
              ) : (
                <article key={plan.name} className="card relative p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-green-700/[0.08] text-green-700">
                    <Gift size={22} />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-green-950">{plan.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{plan.note}</p>
                  <p className="mt-6 font-display text-5xl font-bold text-green-950">{plan.price}</p>
                  <p className="mt-1 text-sm text-slate-400">forever · no card required</p>
                  <ul className="mt-7 grid gap-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex gap-2.5 text-sm text-slate-700">
                        <Check size={17} className="shrink-0 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleChoose(plan.name)}
                    className="mt-8 w-full"
                  >
                    Create a free profile
                  </Button>
                </article>
              ),
            )
          )}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-green-600" />
            Mock checkout only
          </span>
          <span className="flex items-center gap-2">
            <Lock size={17} className="text-green-600" />
            No card required
          </span>
          <span className="flex items-center gap-2">
            <Undo2 size={17} className="text-green-600" />
            Cancel anytime
          </span>
        </div>
      </main>

      <Footer />
    </>
  );
}
