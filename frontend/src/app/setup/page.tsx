'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Briefcase, Cake, Check, ChevronLeft, ChevronRight, PenLine, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { ProfileService } from '@/services/profile.service';
import { SessionService } from '@/services/session.service';
import { cn } from '@/utils/cn';

const schema = z.object({ name:z.string().min(2, 'Please enter your full name'), gender:z.enum(['Woman', 'Man']), phone:z.string().min(1), email:z.string().email('Enter a valid email'), dob:z.string().min(1), birthTime:z.string().min(1), birthPlace:z.string().min(2), religion:z.string().min(2), caste:z.string().min(2), subCaste:z.string(), motherTongue:z.string().min(2), maritalStatus:z.string().min(2), height:z.string().min(2), weight:z.string(), education:z.string().min(2), qualification:z.string().min(2), occupation:z.string().min(2), company:z.string(), income:z.string().min(2), city:z.string().min(2), state:z.string().min(2), country:z.string().min(2), about:z.string().min(30, 'Tell us a little more (at least 30 characters).') });
type Form = z.infer<typeof schema>;
const steps: { title:string; fields:(keyof Form)[] }[] = [
  { title:'Basics', fields:['name','gender','phone','email'] },
  { title:'Birth & background', fields:['dob','birthTime','birthPlace','religion','caste','subCaste','motherTongue','maritalStatus'] },
  { title:'Work & education', fields:['height','weight','education','qualification','occupation','company','income'] },
  { title:'Your story', fields:['city','state','country','about'] },
];
const stepIcons = [User, Cake, Briefcase, PenLine];
const labels: Record<keyof Form, string> = { name:'Full name', gender:'Gender', phone:'Mobile number', email:'Email address', dob:'Date of birth', birthTime:'Time of birth', birthPlace:'Place of birth', religion:'Religion', caste:'Caste', subCaste:'Sub caste', motherTongue:'Mother tongue', maritalStatus:'Marital status', height:'Height', weight:'Weight', education:'Education', qualification:'Highest qualification', occupation:'Occupation', company:'Company', income:'Annual income', city:'Current city', state:'State', country:'Country', about:'About me' };
const initialValues: Form = { name:'', gender:'Woman', phone:'', email:'', dob:'', birthTime:'', birthPlace:'', religion:'Hindu', caste:'Sindhi', subCaste:'', motherTongue:'Sindhi', maritalStatus:'Never married', height:'', weight:'', education:'', qualification:'', occupation:'', company:'', income:'', city:'', state:'', country:'India', about:'' };

export default function Setup() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { register, trigger, reset, getValues, formState:{ errors, isSubmitting } } = useForm<Form>({ resolver:zodResolver(schema), mode:'onTouched', defaultValues:initialValues });

  useEffect(() => {
    SessionService.current()
      .then(({ user, profile }) => {
        if (profile) {
          const saved = profile as Partial<Form>;
          reset({ ...initialValues, ...saved, phone:String(saved.phone || user.phone || '') });
        } else {
          reset({ ...initialValues, phone:user.phone || '' });
        }
      })
      .catch(() => router.replace('/login'))
      .finally(() => setLoading(false));
  }, [reset, router]);

  const next = async () => {
    if (await trigger(steps[step].fields)) setStep(current => Math.min(current + 1, steps.length - 1));
  };
  const finish = async () => {
    if (await trigger(steps[3].fields)) {
      await ProfileService.save(getValues());
      router.replace('/dashboard');
    }
  };

  if (loading)
    return (
      <>
        <SiteHeader />
        <main className="shell max-w-3xl py-12">
          <div className="skeleton h-4 w-28 rounded-full" />
          <div className="skeleton mt-3 h-10 w-80 rounded-2xl" />
          <div className="skeleton mt-8 h-96 rounded-3xl" />
        </main>
      </>
    );

  const StepIcon = stepIcons[step];

  return (
    <>
      <SiteHeader />
      <main className="shell max-w-3xl py-8 sm:py-12">
        <p className="eyebrow">Your profile</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-green-950">
          Make your introduction feel like you.
        </h1>
        <p className="mt-2 text-[15px] text-slate-500">
          Step {step + 1} of {steps.length} · {steps[step].title}
        </p>

        <ol className="mt-8 flex items-start">
          {steps.map((item, index) => {
            const Icon = stepIcons[index];
            const done = index < step;
            const active = index === step;
            return (
              <Fragment key={item.title}>
                <li className="flex w-14 shrink-0 flex-col items-center gap-2">
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-2xl transition-all',
                      done
                        ? 'bg-green-100 text-green-800'
                        : active
                          ? 'bg-green-700 text-white shadow-lg shadow-green-700/30 ring-4 ring-green-600/15'
                          : 'bg-white text-slate-400 ring-1 ring-slate-200',
                    )}
                  >
                    {done ? <Check size={18} /> : <Icon size={18} />}
                  </span>
                  <span
                    className={cn(
                      'hidden text-center text-[11px] font-bold leading-tight sm:block',
                      active ? 'text-green-900' : 'text-slate-400',
                    )}
                  >
                    {item.title}
                  </span>
                </li>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-1 mt-5 h-1 flex-1 rounded-full transition-colors',
                      index < step ? 'bg-green-600' : 'bg-green-700/10',
                    )}
                  />
                )}
              </Fragment>
            );
          })}
        </ol>

        <motion.section
          key={step}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="card mt-8 p-5 sm:p-8"
        >
          <div className="flex items-center gap-3.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-700/25">
              <StepIcon size={19} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-green-950">{steps[step].title}</h2>
              <p className="text-[13px] font-medium text-slate-400">
                {step === steps.length - 1 ? 'Almost there — this is the heart of your profile.' : 'A few details to get to know you better.'}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {steps[step].fields.map(field =>
              field === 'about' ? (
                <label className="label sm:col-span-2" key={field}>
                  {labels[field]}
                  <textarea
                    {...register(field)}
                    rows={5}
                    className="field min-h-32 py-3"
                    placeholder="A few words about your personality, interests and hopes…"
                  />
                  {errors[field] && (
                    <span className="mt-1.5 block text-xs font-medium text-red-600">{errors[field]?.message}</span>
                  )}
                </label>
              ) : (
                <label className="label" key={field}>
                  {labels[field]}
                  {field === 'gender' ? (
                    <select {...register(field)} className="field">
                      <option value="Woman">Woman</option>
                      <option value="Man">Man</option>
                    </select>
                  ) : field === 'maritalStatus' ? (
                    <select {...register(field)} className="field">
                      <option value="Never married">Never married</option>
                      <option value="Previously married">Previously married</option>
                    </select>
                  ) : (
                    <input
                      {...register(field)}
                      type={field === 'email' ? 'email' : field === 'dob' ? 'date' : field === 'birthTime' ? 'time' : 'text'}
                      className="field"
                      placeholder={labels[field]}
                    />
                  )}
                  {errors[field] && (
                    <span className="mt-1.5 block text-xs font-medium text-red-600">{errors[field]?.message}</span>
                  )}
                </label>
              ),
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-green-950/[0.07] pt-6">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={() => setStep(current => current - 1)}>
                <ChevronLeft size={17} />
                Previous
              </Button>
            ) : (
              <span className="text-xs font-medium text-slate-400">Takes about 2 minutes</span>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={next}>
                Continue
                <ChevronRight size={17} />
              </Button>
            ) : (
              <Button type="button" onClick={finish} loading={isSubmitting}>
                Save profile
                <Check size={17} />
              </Button>
            )}
          </div>
        </motion.section>
      </main>
    </>
  );
}
