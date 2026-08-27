import { createResourceStore } from './createResourceStore';
import { fetchTestimonials, Testimonial } from '@/lib/api/testimonials';

export const useTestimonialsStore = createResourceStore<Testimonial[]>(
  'testimonials',
  () => fetchTestimonials(),
  []
);
