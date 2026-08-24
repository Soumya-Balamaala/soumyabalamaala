'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Paperclip } from 'lucide-react';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { StaggerContainer, StaggerItem } from './motion';
import { ACCODE, CustomField } from '@/lib/api/jobPostings';

function buildCustomFieldsSchema(fields: CustomField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.type === 'checkbox') {
      shape[field.id] = field.required
        ? z.boolean({ required_error: `Please answer: ${field.label}` })
        : z.boolean().optional();
    } else {
      shape[field.id] = field.required
        ? z.string().min(1, `${field.label} is required`)
        : z.string().optional();
    }
  }
  return z.object(shape);
}

function buildSchema(fields: CustomField[]) {
  return z.object({
    name: z.string().min(2, 'Please enter your name'),
    email: z.string().email('Please enter a valid email'),
    phone: z
      .string({ required_error: 'Please enter your phone number' })
      .refine((v) => isValidPhoneNumber(v), 'Please enter a valid phone number'),
    message: z.string().max(250, 'Please keep it under 250 characters').optional(),
    custom: buildCustomFieldsSchema(fields),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

interface ApplyErrorPayload {
  missingFields?: string[];
  cooldownUntil?: string;
  respdesc?: string;
  message?: string;
}

export function JobApplicationForm({
  jobId,
  jobTitle,
  customFields = [],
}: {
  jobId: string;
  jobTitle: string;
  customFields?: CustomField[];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = buildSchema(customFields);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      custom: Object.fromEntries(
        customFields.map((f) => [f.id, f.type === 'checkbox' ? undefined : ''])
      ),
    } as Partial<FormValues>,
  });

  const messageValue = watch('message') ?? '';

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

    const formData = new FormData();
    formData.append('accode', ACCODE);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', formatPhoneNumberIntl(data.phone) || data.phone);
    if (data.message) formData.append('message', data.message);
    formData.append('resume', resumeFile);
    formData.append('customFieldResponses', JSON.stringify(data.custom ?? {}));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/job-postings/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 201) {
        setSubmitted(true);
        setResumeFile(null);
        reset();
        return;
      }

      const payload: ApplyErrorPayload = result?.data ?? result ?? {};
      if (response.status === 400 && payload.missingFields?.length) {
        setSubmitError(`Missing required fields: ${payload.missingFields.join(', ')}`);
      } else if (response.status === 409) {
        setSubmitError(
          payload.cooldownUntil
            ? `You've already applied recently. You can reapply after ${new Date(payload.cooldownUntil).toLocaleString()}.`
            : "You've already applied recently. Please try again later."
        );
      } else if (response.status === 429) {
        setSubmitError('Too many submissions from this network. Please try again later.');
      } else {
        setSubmitError(payload.respdesc || payload.message || 'Something went wrong submitting your application.');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      setSubmitError('Something went wrong submitting your application. Please try again.');
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

              {customFields.map((field) => (
                <StaggerItem key={field.id}>
                  <Field
                    label={field.label}
                    error={(errors.custom as Record<string, { message?: string }> | undefined)?.[field.id]?.message}
                  >
                    <CustomFieldInput field={field} register={register} control={control} />
                  </Field>
                </StaggerItem>
              ))}

              <StaggerItem>
                <Field label="Why Are You a Good Fit? (optional)" error={errors.message?.message}>
                  <textarea {...register('message')} rows={4} maxLength={250} className="form-input resize-none" />
                  <span className="mt-1 block text-right text-xs text-slate-light">{messageValue.length}/250</span>
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

            {submitError && (
              <p className="text-left text-sm font-medium text-red-600">{submitError}</p>
            )}

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

function CustomFieldInput({
  field,
  register,
  control,
}: {
  field: CustomField;
  register: ReturnType<typeof useForm<FormValues>>['register'];
  control: ReturnType<typeof useForm<FormValues>>['control'];
}) {
  const name = `custom.${field.id}` as const;

  if (field.type === 'select') {
    return (
      <select {...register(name)} defaultValue="" className="form-input">
        <option value="" disabled>
          Select one
        </option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: controllerField }) => (
          <div className="flex gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-slate-text">
              <input
                type="radio"
                checked={controllerField.value === true}
                onChange={() => controllerField.onChange(true)}
                onBlur={controllerField.onBlur}
                className="h-4 w-4"
              />
              Yes
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-text">
              <input
                type="radio"
                checked={controllerField.value === false}
                onChange={() => controllerField.onChange(false)}
                onBlur={controllerField.onBlur}
                className="h-4 w-4"
              />
              No
            </label>
          </div>
        )}
      />
    );
  }

  if (field.type === 'date') {
    return <input {...register(name)} type="date" className="form-input" />;
  }

  if (field.type === 'number') {
    return <input {...register(name)} type="number" className="form-input" />;
  }

  if (field.type === 'textarea') {
    return <textarea {...register(name)} rows={3} className="form-input resize-none" />;
  }

  return <input {...register(name)} type="text" className="form-input" />;
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
