import { z } from 'zod';

export const SEOFormSchema = z.object({
  metaTitle: z
    .string()
    .min(10, {
      message: 'Title must be at least 2 characters.',
    })
    .max(300, {
      message: 'Name must not be longer than 300 characters.',
    }),
  keywords: z.string().min(2).max(150),
  metaDescription: z.string().max(500).min(100, {
    message: 'Description must be at least 100 characters.',
  }),
});

export type SEOFormValues = z.infer<typeof SEOFormSchema>;

export const editSEOFormSchema = z.object({
  metaTitle: z.optional(
    z
      .string()
      .min(10, {
        message: 'Title must be at least 2 characters.',
      })
      .max(300, {
        message: 'Title must not be longer than 300 characters.',
      })
  ),
  keywords: z.optional(z.string()),
  metaDescription: z.optional(
    z
      .string()
      .max(500, {
        message: 'Description must not be longer than 500 characters.',
      })
      .min(100, {
        message: 'Description must be at least 100 characters.',
      })
  ),
});

export type EditSEOFormValues = z.infer<typeof editSEOFormSchema>;
