import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function Failure() {
  return (
    <>
      <SiteHeader />
      <main className="shell grid min-h-[calc(100vh-72px)] place-items-center py-12">
        <section className="card w-full max-w-md p-8 text-center sm:p-10">
          <div className="mx-auto grid h-20 w-20 animate-pop-in place-items-center rounded-full bg-amber-100">
            <AlertCircle size={40} className="text-amber-600" />
          </div>
          <p className="eyebrow mt-6">Something went wrong</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-green-950">Let’s try that again.</h1>
          <p className="mt-3 text-[15px] leading-7 text-slate-600">
            Your mock checkout could not be completed. No payment has been collected.
          </p>
          <div className="mt-8 grid gap-2.5">
            <Link href="/membership">
              <Button size="lg" className="w-full">
                Back to membership
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Go home
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
