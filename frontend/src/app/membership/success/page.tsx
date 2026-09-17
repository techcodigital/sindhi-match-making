import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function Success() {
	return (
		<>
			<SiteHeader />

			<main className="shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
				<section className="card max-w-md p-8 text-center">
					<CheckCircle2 className="mx-auto text-green-600" size={56} />

					<h1 className="mt-5 text-3xl font-extrabold text-green-950">
						You’re all set.
					</h1>

					<p className="mt-3 text-sm leading-6 text-slate-600">
						Your membership is ready. Start discovering the introductions that could lead somewhere wonderful.
					</p>

					<Link href="/search">
						<Button className="mt-7 w-full">Discover matches</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
