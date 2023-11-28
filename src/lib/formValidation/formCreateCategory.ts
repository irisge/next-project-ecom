import { z } from 'zod';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const mainCreateCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  image: z
    .custom<File>()
    .refine((file) => ALLOWED_FILE_TYPES.includes(file?.type)),
  imageAlt: z.string().min(2).max(100),
  description: z.string().max(500).min(4, {
    message: 'Description must be at least 4 characters.',
  }),
  isActive: z.boolean().default(true).optional(),
  product: z.array(z.record(z.string().trim())).optional(),
});

export type MainCreateCategoryFormValues = z.infer<
  typeof mainCreateCategoryFormSchema
>;

export const editCategoryFormSchema = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.string()),
  isActive: z.optional(z.boolean()),
  image: z.optional(
    z.custom<File>().refine((file) => ALLOWED_FILE_TYPES.includes(file?.type))
  ),
  imageDescription: z.string().min(2).max(100).optional(),
  product: z.array(z.record(z.string().trim())).optional(),
});

export type EditCategoryFormValues = z.infer<typeof editCategoryFormSchema>;
