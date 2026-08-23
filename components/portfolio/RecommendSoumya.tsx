'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  role: z.string().min(2, 'Please enter your role or title'),
  company: z.string().min(2, 'Please enter your company'),
  relationship: z.string().min(2, 'Please tell me how we worked together'),
  text: z.string().min(20, 'Please write at least 20 characters'),
});

type FormValues = z.infer<typeof schema>;

export function RecommendSoumya() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log('New recommendation submitted:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-gold text-navy">
              <PenLine size={20} />
            </span>
            <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Recommend Soumya</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
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
                  <h3 className="text-lg font-bold text-navy">Thank you!</h3>
                  <p className="mt-1 text-sm text-slate-text">
                    Your recommendation has been received and will appear here soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    Write another
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
                  <p className="text-center text-sm leading-relaxed text-slate-text md:text-left">
                    Worked with me before? I&apos;d love to hear about it — your recommendation helps
                    other teams know what to expect.
                  </p>
                  <StaggerContainer className="space-y-4" staggerDelay={0.06}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StaggerItem>
                        <Field label="Your Name" error={errors.name?.message}>
                          <input {...register('name')} className="form-input" />
                        </Field>
                      </StaggerItem>
                      <StaggerItem>
                        <Field label="Your Role" error={errors.role?.message}>
                          <input {...register('role')} className="form-input" />
                        </Field>
                      </StaggerItem>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StaggerItem>
                        <Field label="Company" error={errors.company?.message}>
                          <input {...register('company')} className="form-input" />
                        </Field>
                      </StaggerItem>
                      <StaggerItem>
                        <Field label="How We Worked Together" error={errors.relationship?.message}>
                          <input {...register('relationship')} className="form-input" />
                        </Field>
                      </StaggerItem>
                    </div>
                    <StaggerItem>
                      <Field label="Your Recommendation" error={errors.text?.message}>
                        <textarea {...register('text')} rows={4} className="form-input resize-none" />
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
                        <Send size={18} /> Submit Recommendation
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
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
