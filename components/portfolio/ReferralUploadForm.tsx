'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Send, CheckCircle2, Loader2, Paperclip } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './motion';
import { submitReferralUpload } from '@/lib/api/referral';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string({ required_error: 'Please enter your phone number' })
    .refine((v) => isValidPhoneNumber(v), 'Please enter a valid phone number'),
  targetRole: z.string().min(2, 'Please enter the role you are targeting'),
});

type FormValues = z.infer<typeof schema>;

export function ReferralUploadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResumeFile(file);
    setResumeError(null);
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);

    if (!resumeFile) {
      setResumeError('Please attach your resume');
      return;
    }

    try {
      await submitReferralUpload({
        resume: resumeFile,
        name: data.name,
        email: data.email,
        phone: formatPhoneNumberIntl(data.phone) || data.phone,
        targetRole: data.targetRole,
      });
      setSubmitted(true);
      setResumeFile(null);
      reset();
    } catch (error) {
      console.error('Failed to submit referral upload:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
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
            <h3 className="text-lg font-bold text-navy">Resume submitted!</h3>
            <p className="mt-1 text-sm text-slate-text">
              Thanks — I&apos;ll take a look and follow up if there&apos;s a fit.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Submit another
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
            <p className="text-left text-sm leading-relaxed text-slate-text">
              Submit your resume directly and I&apos;ll follow up if there&apos;s a fit.
            </p>
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

              <StaggerItem>
                <Field label="Phone" error={errors.phone?.message}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="phone-input"
                        placeholder="Enter your phone number"
                      />
                    )}
                  />
                </Field>
              </StaggerItem>

              <StaggerItem>
                <Field label="Target Role" error={errors.targetRole?.message}>
                  <input {...register('targetRole')} className="form-input" placeholder="e.g. React Developer" />
                </Field>
              </StaggerItem>

              <StaggerItem>
                <Field label="Resume (required)" error={resumeError ?? undefined}>
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      <Paperclip size={14} /> {resumeFile ? 'Change File' : 'Attach Resume'}
                    </button>
                    {resumeFile && <span className="truncate text-xs text-slate-light">{resumeFile.name}</span>}
                  </div>
                </Field>
              </StaggerItem>
            </StaggerContainer>

            {submitError && <p className="text-left text-sm font-medium text-red-600">{submitError}</p>}

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
                  <Send size={18} /> Submit
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
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
