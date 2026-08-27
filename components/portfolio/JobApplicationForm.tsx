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

// Some postings leave dependsOnValue blank rather than specifying e.g. "true"
// — treat that as "show once the controlling field has any answer at all"
// instead of an impossible-to-match exact comparison against "".
function isDependencyMet(dependsOnValue: string | undefined, controllingValue: unknown): boolean {
  if (!dependsOnValue) return controllingValue !== undefined && controllingValue !== '';
  return String(controllingValue) === dependsOnValue;
}

function buildCustomFieldsSchema(fields: CustomField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.type === 'file') continue; // handled outside the zod-tracked object, like the resume upload
    // A dependent field is only actually required once its controlling
    // field matches dependsOnValue — enforced below in superRefine, since
    // that can't be expressed as a static per-field schema.
    const staticallyRequired = field.required && !field.dependsOnFieldId;
    if (field.type === 'checkbox') {
      shape[field.id] = staticallyRequired
        ? z.boolean({ required_error: `Please answer: ${field.label}` })
        : z.boolean().optional();
    } else {
      shape[field.id] = staticallyRequired
        ? z.string().min(1, `${field.label} is required`)
        : z.string().optional();
    }
  }
  return z.object(shape).superRefine((values, ctx) => {
    for (const field of fields) {
      if (!field.required || !field.dependsOnFieldId || field.type === 'file') continue;
      if (!isDependencyMet(field.dependsOnValue, values[field.dependsOnFieldId])) continue;
      const value = values[field.id];
      const isEmpty = field.type === 'checkbox' ? value === undefined : !value;
      if (isEmpty) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${field.label} is required`, path: [field.id] });
      }
    }
  });
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
  const [customFiles, setCustomFiles] = useState<Record<string, File | null>>({});
  const [customFileErrors, setCustomFileErrors] = useState<Record<string, string>>({});
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
  const customValues = watch('custom');

  const isFieldVisible = (field: CustomField) =>
    !field.dependsOnFieldId || isDependencyMet(field.dependsOnValue, customValues?.[field.dependsOnFieldId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResumeFile(file);
    setResumeError(null);
  };

  const handleCustomFileChange = (fieldId: string, file: File | null) => {
    setCustomFiles((prev) => ({ ...prev, [fieldId]: file }));
    setCustomFileErrors((prev) => ({ ...prev, [fieldId]: '' }));
  };

  const handleCustomFileError = (fieldId: string, message: string) => {
    setCustomFileErrors((prev) => ({ ...prev, [fieldId]: message }));
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);

    if (!resumeFile) {
      setResumeError('Please attach your resume');
      return;
    }

    const fileErrors: Record<string, string> = {};
    for (const field of customFields.filter(isFieldVisible)) {
      if (field.type === 'file' && field.required && !customFiles[field.id]) {
        fileErrors[field.id] = `Please attach: ${field.label}`;
      }
    }
    if (Object.keys(fileErrors).length > 0) {
      setCustomFileErrors(fileErrors);
      return;
    }

    const formData = new FormData();
    formData.append('accode', ACCODE);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', formatPhoneNumberIntl(data.phone) || data.phone);
    if (data.message) formData.append('message', data.message);
    formData.append('resume', resumeFile);
    for (const field of customFields) {
      if (field.type === 'file' && customFiles[field.id]) {
        // Server contract: a file-type custom field's multipart part name
        // must be exactly `customField_{id}` — any other name is silently
        // dropped (no error), so a bare field.id here would look like a
        // successful submit while the file never actually arrives.
        formData.append(`customField_${field.id}`, customFiles[field.id] as File);
      }
    }

    // The API expects string values for every custom field response (e.g.
    // "true", not a JSON boolean) — matters for checkbox fields especially,
    // since dependsOnValue is itself compared as a string server-side.
    const customFieldResponses: Record<string, string> = {};
    for (const [id, value] of Object.entries(data.custom ?? {})) {
      if (value === undefined || value === '') continue;
      customFieldResponses[id] = String(value);
    }
    formData.append('customFieldResponses', JSON.stringify(customFieldResponses));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/job-postings/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 201) {
        setSubmitted(true);
        setResumeFile(null);
        setCustomFiles({});
        setCustomFileErrors({});
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

              {customFields.filter(isFieldVisible).map((field) => (
                <StaggerItem key={field.id}>
                  <Field
                    label={field.label}
                    error={
                      field.type === 'file'
                        ? customFileErrors[field.id] || undefined
                        : (errors.custom as Record<string, { message?: string }> | undefined)?.[field.id]?.message
                    }
                  >
                    <CustomFieldInput
                      field={field}
                      register={register}
                      control={control}
                      fileValue={customFiles[field.id] ?? null}
                      onFileChange={(file) => handleCustomFileChange(field.id, file)}
                      onFileError={(message) => handleCustomFileError(field.id, message)}
                    />
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
  fileValue,
  onFileChange,
  onFileError,
}: {
  field: CustomField;
  register: ReturnType<typeof useForm<FormValues>>['register'];
  control: ReturnType<typeof useForm<FormValues>>['control'];
  fileValue?: File | null;
  onFileChange?: (file: File | null) => void;
  onFileError?: (message: string) => void;
}) {
  const name = `custom.${field.id}` as const;

  if (field.type === 'file') {
    return (
      <CustomFileField
        value={fileValue ?? null}
        onChange={onFileChange ?? (() => {})}
        onError={onFileError ?? (() => {})}
      />
    );
  }

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

const MAX_CUSTOM_FILE_SIZE = 1.5 * 1024 * 1024; // 1.5MB

function CustomFileField({
  value,
  onChange,
  onError,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = '';
    if (!file) return;
    if (file.type !== 'application/pdf') {
      onError('Please upload a PDF file');
      return;
    }
    if (file.size > MAX_CUSTOM_FILE_SIZE) {
      onError('File must be 1.5MB or smaller');
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <input ref={ref} type="file" accept=".pdf,application/pdf" onChange={handleChange} className="hidden" />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 rounded-pill border-2 border-navy px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <Paperclip size={14} /> {value ? 'Change File' : 'Attach File'}
        </button>
        {value && <span className="truncate text-xs text-slate-light">{value.name}</span>}
      </div>
      <span className="mt-1 block text-xs text-slate-light">PDF only, up to 1.5MB</span>
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
