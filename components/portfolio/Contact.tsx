'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './motion';
import { contactInfo } from '@/lib/portfolio-data';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  service: z.string().min(3, 'Please tell me a bit about how I can help'),
  countryCode: z.string().min(1, 'Please enter your country code'),
  mobile: z
    .string()
    .min(7, 'Please enter a valid mobile number')
    .regex(/^[0-9\s-]+$/, 'Only digits, spaces and hyphens allowed'),
  country: z.string().min(2, 'Please enter your country'),
  location: z.string().min(2, 'Please enter your location'),
  message: z.string().min(10, 'Please enter a message (at least 10 characters)'),
});

type FormValues = z.infer<typeof schema>;

const contactCards = [
  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: contactInfo.location, href: undefined },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-sage-light/20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-card bg-navy text-white">
              <Mail size={20} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Get In Touch</h2>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* contact details */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="flex h-full flex-col gap-4 text-center md:text-left">
              <p className="text-base leading-relaxed text-slate-text">
                Have a project in mind or looking for a dedicated developer? I&apos;m available for
                new opportunities and open to relocation. Let&apos;s build something great together.
              </p>
              <StaggerContainer className="space-y-3" staggerDelay={0.08}>
                {contactCards.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center gap-3 rounded-card border border-slate-100 bg-white p-4 shadow-card md:justify-start"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-light/40 text-sage-dark">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                          {label}
                        </p>
                        <p className="text-sm font-bold text-navy">{value}</p>
                      </div>
                    </motion.div>
                  );
                  return (
                    <StaggerItem key={label}>
                      {href ? (
                        <a href={href} className="block">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </Reveal>

          {/* form */}
          <Reveal className="lg:col-span-3" delay={0.15}>
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
                    <h3 className="text-lg font-bold text-navy">Message Sent!</h3>
                    <p className="mt-1 text-sm text-slate-text">
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-pill border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      Send another message
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
                      {/* Row 1: Name + Service */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <StaggerItem>
                          <Field label="Name" error={errors.name?.message}>
                            <input {...register('name')} className="form-input" />
                          </Field>
                        </StaggerItem>
                        <StaggerItem>
                          <Field label="How Can I Help You?" error={errors.service?.message}>
                            <input {...register('service')} className="form-input" />
                          </Field>
                        </StaggerItem>
                      </div>

                      {/* Row 2: Country Code + Mobile Number */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <StaggerItem>
                          <Field label="Country Code" error={errors.countryCode?.message}>
                            <input {...register('countryCode')} className="form-input" />
                          </Field>
                        </StaggerItem>
                        <StaggerItem>
                          <Field label="Mobile Number" error={errors.mobile?.message}>
                            <input {...register('mobile')} className="form-input" />
                          </Field>
                        </StaggerItem>
                      </div>

                      {/* Row 3: Country Name + Location */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <StaggerItem>
                          <Field label="Country Name" error={errors.country?.message}>
                            <input {...register('country')} className="form-input" />
                          </Field>
                        </StaggerItem>
                        <StaggerItem>
                          <Field label="Location" error={errors.location?.message}>
                            <input {...register('location')} className="form-input" />
                          </Field>
                        </StaggerItem>
                      </div>

                      {/* Message */}
                      <StaggerItem>
                        <Field label="Message" error={errors.message?.message}>
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
                          <Loader2 size={18} className="animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
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
