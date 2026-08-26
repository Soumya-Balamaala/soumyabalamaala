'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper, { Area, Point } from 'react-easy-crop';
import { PenLine, Send, CheckCircle2, Loader2, ImagePlus, X } from 'lucide-react';
import { Reveal, SectionReveal, StaggerContainer, StaggerItem } from './motion';
import { api } from '@/lib/axios';
import { getCroppedImageDataUrl } from '@/lib/cropImage';
import { projectsData, timelineData } from '@/lib/portfolio-data';

// Fixed for every submission from this form — not user-editable.
const ACCODE = 'SOU';
const TESTIMONIAL_TYPE = 'recommendation';

// Only real client/employer engagements — exclude personal projects.
const projectOptions = projectsData.filter((p) => p.company !== 'Personal Project');

// Companies Soumya has worked at, in reverse-chronological order, de-duplicated.
const companyOptions = Array.from(
  new Set(timelineData.filter((entry) => entry.type === 'work').map((entry) => entry.organization))
);

interface TestimonialOptions {
  authorTypes: string[];
  relationshipTypes: string[];
}

function labelize(value: string) {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function dataUrlToFile(dataUrl: string, filename: string): File {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/data:(.*);base64/)?.[1] ?? 'image/jpeg';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}

async function uploadAvatar(dataUrl: string, authorName: string): Promise<string> {
  const formData = new FormData();
  formData.append('accode', ACCODE);
  const slug = authorName.trim().toLowerCase().replace(/\s+/g, '-') || 'guest';
  formData.append('name', `testimonial-avatar-${slug}`);
  formData.append('file', dataUrlToFile(dataUrl, 'avatar.jpg'));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/upload/image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const result = await response.json();
  const relativeUrl: string = result?.data?.url ?? '';
  return `${process.env.NEXT_PUBLIC_API_URL ?? ''}${relativeUrl}`;
}

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  role: z.string().min(2, 'Please enter your role or title'),
  company: z.string().min(2, 'Please enter your company'),
  relationship: z.string().min(1, 'Please select how we worked together'),
  authorType: z.string().min(1, 'Please select a type'),
  subjectLabel: z.string().min(1, 'Please select the project you worked on together'),
  linkedinUrl: z.union([z.string().url('Please enter a valid LinkedIn URL'), z.literal('')]).optional(),
  text: z.string().min(20, 'Please write at least 20 characters').max(250, 'Please keep it under 250 characters'),
});

type FormValues = z.infer<typeof schema>;

export function RecommendSoumya() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [options, setOptions] = useState<TestimonialOptions | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const textValue = watch('text') ?? '';

  useEffect(() => {
    api
      .get('/api/public/options/testimonials')
      .then((res) => setOptions(res.data?.data ?? null))
      .catch((error) => console.error('Failed to load testimonial options:', error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setRawImageSrc(reader.result as string);
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixelsValue: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  }, []);

  const handleCancelCrop = () => {
    setRawImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleConfirmCrop = async () => {
    if (!rawImageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImageDataUrl(rawImageSrc, croppedAreaPixels);
    setAvatarPreview(cropped);
    handleCancelCrop();
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const authorAvatarUrl = avatarPreview ? await uploadAvatar(avatarPreview, data.name) : undefined;

      await api.post('/api/public/testimonials', {
        accode: ACCODE,
        testimonialType: TESTIMONIAL_TYPE,
        authorName: data.name,
        authorType: data.authorType,
        relationshipType: data.relationship,
        subjectLabel: data.subjectLabel,
        content: data.text,
        authorTitle: data.role,
        authorCompany: data.company,
        consentToPublish: true,
        ...(authorAvatarUrl ? { authorAvatarUrl } : {}),
        ...(data.linkedinUrl ? { authorLinkedInUrl: data.linkedinUrl } : {}),
      });
      setSubmitted(true);
      setAvatarPreview(null);
      reset();
    } catch (error) {
      console.error('Failed to submit recommendation:', error);
      setSubmitError('Something went wrong submitting your recommendation. Please try again.');
    }
  };

  return (
    <>
    <SectionReveal className="section-padding bg-gradient-to-b from-white to-sage-light/20">
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
                    <StaggerItem>
                      <div className="flex flex-col items-center gap-3 md:flex-row">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-sage-light/30 text-slate-light">
                          {avatarPreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                          ) : (
                            <ImagePlus size={22} />
                          )}
                        </span>
                        <div className="flex flex-col items-center gap-1 md:items-start">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-pill border-2 border-navy px-4 py-1.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                          >
                            {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                          </button>
                          <span className="text-xs text-slate-light">Optional — square photo, cropped to a circle</span>
                        </div>
                      </div>
                    </StaggerItem>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StaggerItem>
                        <Field label="Your Name" error={errors.name?.message}>
                          <input {...register('name')} className="form-input" />
                        </Field>
                      </StaggerItem>
                      <StaggerItem>
                        <Field label="During our collaboration, your role was..." error={errors.role?.message}>
                          <input {...register('role')} className="form-input" />
                        </Field>
                      </StaggerItem>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StaggerItem>
                        <Field label="Company We Worked At" error={errors.company?.message}>
                          <select {...register('company')} defaultValue="" className="form-input">
                            <option value="" disabled>
                              Select a company
                            </option>
                            {companyOptions.map((company) => (
                              <option key={company} value={company}>
                                {company}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </StaggerItem>
                      <StaggerItem>
                        <Field label="How We Worked Together" error={errors.relationship?.message}>
                          <select
                            {...register('relationship')}
                            defaultValue=""
                            disabled={!options}
                            className="form-input"
                          >
                            <option value="" disabled>
                              {options ? 'Select one' : 'Loading...'}
                            </option>
                            {options?.relationshipTypes.map((value) => (
                              <option key={value} value={value}>
                                {labelize(value)}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </StaggerItem>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <StaggerItem>
                        <Field label="You Are A" error={errors.authorType?.message}>
                          <select
                            {...register('authorType')}
                            defaultValue=""
                            disabled={!options}
                            className="form-input"
                          >
                            <option value="" disabled>
                              {options ? 'Select one' : 'Loading...'}
                            </option>
                            {options?.authorTypes.map((value) => (
                              <option key={value} value={value}>
                                {labelize(value)}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </StaggerItem>
                      <StaggerItem>
                        <Field label="LinkedIn URL (optional)" error={errors.linkedinUrl?.message}>
                          <input
                            {...register('linkedinUrl')}
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            className="form-input"
                          />
                        </Field>
                      </StaggerItem>
                    </div>
                    <StaggerItem>
                      <Field label="Project We Worked On" error={errors.subjectLabel?.message}>
                        <select {...register('subjectLabel')} defaultValue="" className="form-input">
                          <option value="" disabled>
                            Select a project
                          </option>
                          {projectOptions.map((p) => (
                            <option key={p.name} value={`${p.name} (${p.company})`}>
                              {p.name} ({p.company})
                            </option>
                          ))}
                        </select>
                      </Field>
                    </StaggerItem>
                    <StaggerItem>
                      <Field label="Your Recommendation" error={errors.text?.message}>
                        <textarea {...register('text')} rows={4} maxLength={250} className="form-input resize-none" />
                        <span className="mt-1 block text-right text-xs text-slate-light">{textValue.length}/250</span>
                      </Field>
                    </StaggerItem>
                  </StaggerContainer>

                  {submitError && (
                    <p className="text-center text-sm font-medium text-red-600 md:text-left">
                      {submitError}
                    </p>
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
    </SectionReveal>

    {/*
      Rendered outside SectionReveal: framer-motion applies its scroll
      animation to <section> via a CSS transform, and any transform on an
      ancestor turns fixed-position descendants into ancestor-relative ones
      — which would break this modal's fixed inset-0 full-viewport overlay.
    */}
    <AnimatePresence>
      {rawImageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-card bg-white p-5 shadow-card"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Crop Photo</h3>
              <button
                type="button"
                onClick={handleCancelCrop}
                className="text-slate-light transition-colors hover:text-navy"
                aria-label="Cancel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative h-72 w-full overflow-hidden rounded-card bg-slate-100">
              <Cropper
                image={rawImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold text-navy">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </label>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelCrop}
                className="rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCrop}
                className="rounded-pill bg-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
              >
                Save Crop
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
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
