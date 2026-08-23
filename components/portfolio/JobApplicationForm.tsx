'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './motion';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  resumeLink: z.string().url('Please enter a valid URL to your resume'),
  message: z.string().min(20, 'Please write at least 20 characters about why you are a fit'),
});

type FormValues = z.infer<typeof schema>;

export function JobApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log(`Application submitted for "${jobTitle}":`, data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="relative overflow-hidden rounded-card border border-slate-100 bg-white p-6 shadow-card md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-light/50 text-sage-dark"
            >
              <CheckCircle2 size={32} />
            </motion.span>
            <h3 className="text-lg font-bold text-navy">Application sent!</h3>
            <p className="mt-1 text-sm text-slate-text">
              Thanks for applying to {jobTitle}. I&apos;ll be in touch with a referral update soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <StaggerContainer className="space-y-4" staggerDelay={0.06}>
              <div className="grid gap-4 sm:grid-cols-2">
                <StaggerItem>
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register('name')} className="form-input" />
                  </Field>
                </StaggerItem>
                <StaggerItem>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register('email')} type="email" className="form-input" />
                  </Field>
                </StaggerItem>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <StaggerItem>
                  <Field label="Phone" error={errors.phone?.message}>
                    <input {...register('phone')} className="form-input" />
                  </Field>
                </StaggerItem>
                <StaggerItem>
                  <Field label="Resume Link" error={errors.resumeLink?.message}>
                    <input {...register('resumeLink')} className="form-input" />
                  </Field>
                </StaggerItem>
              </div>
              <StaggerItem>
                <Field label="Why Are You a Good Fit?" error={errors.message?.message}>
                  <textarea {...register('message')} rows={4} className="form-input resize-none" />
                </Field>
              </StaggerItem>
            </StaggerContainer>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-navy px-6 py-3 font-semibold text-white shadow-card transition-colors hover:bg-navy-light disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={18} /> Submit Application
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-center md:text-left">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
