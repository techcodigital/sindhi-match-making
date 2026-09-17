'use client';

import { useQuery } from '@tanstack/react-query';
import { Check, Crown, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SubscriptionService } from '@/services/subscription.service';
import type { Plan } from '@/types';

export default function Membership() {
  const router = useRouter();

  const { data } = useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: SubscriptionService.getPlans,
  });

  const plans = data ?? [];

  const handleChoose = async (planName: string) => {
    const result = await SubscriptionService.subscribe(planName);

    if (result.success) {
      router.push('/membership/success');
      return;
    }

    router.push('/membership/failure');
  };

  return (
    <>
      <SiteHeader />

      <main className="shell py-12 text-center">
        <p className="eyebrow">Membership, thoughtfully simple</p>

        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold text-green-950">
          A small step toward something meaningful.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Choose the access that’s right for you. No surprise fees, no pressure—just a more personal way to meet.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`card relative p-7 text-left ${
                plan.featured ? 'ring-2 ring-green-600' : ''
              }`}
            >
              {plan.featured ? (
                <>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                    Most chosen
                  </span>

                  <Crown className="text-green-600" />
                </>
              ) : null}

              <h2 className="mt-4 text-2xl font-extrabold">{plan.name}</h2>

              <p className="mt-1 text-sm text-slate-500">{plan.note}</p>

              <p className="mt-6 text-4xl font-extrabold text-green-950">{plan.price}</p>

              {plan.price !== 'Free' ? (
                <p className="text-sm text-slate-500">monthly</p>
              ) : null}

              <ul className="mt-7 grid gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-700">
                    <Check size={17} className="shrink-0 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleChoose(plan.name)}
                variant={plan.featured ? 'primary' : 'secondary'}
                className="mt-8 w-full"
              >
                {plan.price === 'Free' ? 'Create a free profile' : 'Choose membership'}
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-500">
          <ShieldCheck size={17} className="text-green-600" />
          Mock checkout only—no payment information is collected.
        </p>
      </main>

      <Footer />
    </>
  );
}