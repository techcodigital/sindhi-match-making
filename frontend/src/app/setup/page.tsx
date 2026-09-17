'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { ProfileService } from '@/services/profile.service';
import { SessionService } from '@/services/session.service';

const schema = z.object({ name:z.string().min(2, 'Please enter your full name'), gender:z.enum(['Woman', 'Man']), phone:z.string().min(1), email:z.string().email('Enter a valid email'), dob:z.string().min(1), birthTime:z.string().min(1), birthPlace:z.string().min(2), religion:z.string().min(2), caste:z.string().min(2), subCaste:z.string(), motherTongue:z.string().min(2), maritalStatus:z.string().min(2), height:z.string().min(2), weight:z.string(), education:z.string().min(2), qualification:z.string().min(2), occupation:z.string().min(2), company:z.string(), income:z.string().min(2), city:z.string().min(2), state:z.string().min(2), country:z.string().min(2), about:z.string().min(30, 'Tell us a little more (at least 30 characters).') });
type Form = z.infer<typeof schema>;
const steps: { title:string; fields:(keyof Form)[] }[] = [
  { title:'Basics', fields:['name','gender','phone','email'] },
  { title:'Birth & background', fields:['dob','birthTime','birthPlace','religion','caste','subCaste','motherTongue','maritalStatus'] },
  { title:'Work & education', fields:['height','weight','education','qualification','occupation','company','income'] },
  { title:'Your story', fields:['city','state','country','about'] },
];
const labels: Record<keyof Form, string> = { name:'Full name', gender:'Gender', phone:'Mobile number', email:'Email address', dob:'Date of birth', birthTime:'Time of birth', birthPlace:'Place of birth', religion:'Religion', caste:'Caste', subCaste:'Sub caste', motherTongue:'Mother tongue', maritalStatus:'Marital status', height:'Height', weight:'Weight', education:'Education', qualification:'Highest qualification', occupation:'Occupation', company:'Company', income:'Annual income', city:'Current city', state:'State', country:'Country', about:'About me' };
const initialValues: Form = { name:'', gender:'Woman', phone:'', email:'', dob:'', birthTime:'', birthPlace:'', religion:'Hindu', caste:'Sindhi', subCaste:'', motherTongue:'Sindhi', maritalStatus:'Never married', height:'', weight:'', education:'', qualification:'', occupation:'', company:'', income:'', city:'', state:'', country:'India', about:'' };

export default function Setup() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { register, trigger, reset, getValues, formState:{ errors, isSubmitting } } = useForm<Form>({ resolver:zodResolver(schema), mode:'onTouched', defaultValues:initialValues });
  useEffect(() => { SessionService.current().then(({ user, profile }) => { if (profile) { const saved = profile as Partial<Form>; reset({ ...initialValues, ...saved, phone:String(saved.phone || user.phone || '') }); } else reset({ ...initialValues, phone:user.phone || '' }); }).catch(() => router.replace('/login')).finally(() => setLoading(false)); }, [reset, router]);
  const next = async () => { if (await trigger(steps[step].fields)) setStep(current => Math.min(current + 1, steps.length - 1)); };
  const finish = async () => { if (await trigger(steps[3].fields)) { await ProfileService.save(getValues()); router.replace('/dashboard'); } };
  if (loading) return <><SiteHeader /><main className="shell py-20 text-center text-slate-600">Loading your profile…</main></>;
  return <><SiteHeader /><main className="shell max-w-3xl py-8 sm:py-12"><p className="eyebrow">Your profile</p><h1 className="mt-2 text-3xl font-extrabold text-green-950">Make your introduction feel like you.</h1><div className="mt-7 flex gap-1">{steps.map((item, index) => <div key={item.title} className="flex-1"><div className={`h-1.5 rounded-full ${index <= step ? 'bg-green-600' : 'bg-green-100'}`} /><p className={`mt-2 hidden text-xs font-bold sm:block ${index === step ? 'text-green-700' : 'text-slate-400'}`}>{index + 1}. {item.title}</p></div>)}</div><section className="card mt-7 p-5 sm:p-8"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-green-100 font-bold text-green-700">{step + 1}</span><h2 className="text-xl font-extrabold">{steps[step].title}</h2></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{steps[step].fields.map(field => field === 'about' ? <label className="label sm:col-span-2" key={field}>{labels[field]}<textarea {...register(field)} className="field min-h-32 py-3" placeholder="A few words about your personality, interests and hopes…" />{errors[field] && <span className="mt-1 block text-xs text-red-600">{errors[field]?.message}</span>}</label> : <label className="label" key={field}>{labels[field]}{field === 'gender' ? <select {...register(field)} className="field"><option value="Woman">Woman</option><option value="Man">Man</option></select> : field === 'maritalStatus' ? <select {...register(field)} className="field"><option value="Never married">Never married</option><option value="Previously married">Previously married</option></select> : <input {...register(field)} type={field === 'email' ? 'email' : field === 'dob' ? 'date' : field === 'birthTime' ? 'time' : 'text'} className="field" placeholder={labels[field]} />}{errors[field] && <span className="mt-1 block text-xs text-red-600">{errors[field]?.message}</span>}</label>)}</div><div className="mt-8 flex justify-between gap-3">{step > 0 ? <Button type="button" variant="ghost" onClick={() => setStep(current => current - 1)}><ChevronLeft size={17} />Previous</Button> : <span />}{step < steps.length - 1 ? <Button type="button" onClick={next}>Continue<ChevronRight size={17} /></Button> : <Button type="button" onClick={finish} disabled={isSubmitting}>{isSubmitting ? 'Saving…' : <>Save profile<Check size={17} /></>}</Button>}</div></section></main></>;
}
