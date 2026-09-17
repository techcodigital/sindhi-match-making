import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function Success() {
  return (
    <>
      <SiteHeader />
      <main className="shell grid min-h-[calc(100vh-72px)] place-items-center py-12">
        <section className="card w-full max-w-md p-8 text-center sm:p-10">
          <div className="mx-auto grid h-20 w-20 animate-pop-in place-items-center rounded-full bg-green-100">
            <CheckCircle2 size={40} className="text-green-700" />
          </div>
          <p className="eyebrow mt-6">Membership active</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-green-950">You’re all set.</h1>
          <p className="mt-3 text-[15px] leading-7 text-slate-600">
            Your membership is ready. Start discovering the introductions that could lead somewhere
            wonderful.
          </p>
          <div className="mt-8 grid gap-2.5">
            <Link href="/search">
              <Button size="lg" className="w-full">
                <Sparkles size={17} />
                Discover matches
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" className="w-full">
                Go to dashboard
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
