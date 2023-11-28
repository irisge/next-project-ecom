import { z } from 'zod';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const mainCreateProductFormSchema = z.object({
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
  description: z.string().max(500).min(4, {
    message: 'Description must be at least 4 characters.',
  }),
  imageAlt: z.string().min(2).max(100),
  formats: z.array(
    z.object({
      value: z.string().min(2, { message: 'Please enter a format size.' }),
      price: z
        .preprocess(
          (a) => parseInt(z.string().parse(a), 10),
          z.number().nonnegative().optional()
        )
        .optional(),
      stock: z
        .preprocess(
          (a) => parseInt(z.string().parse(a), 10),
          z.number().int().nonnegative().optional()
        )
        .optional(),
    })
  ),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true).optional(),
  category: z.array(z.record(z.string().trim())),
});

export type MainCreateProductFormValues = z.infer<
  typeof mainCreateProductFormSchema
>;

export const editProductFormSchema = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.string()),
  isActive: z.optional(z.boolean()),
  image: z.optional(
    z.custom<File>().refine((file) => ALLOWED_FILE_TYPES.includes(file?.type))
  ),
  imageDescription: z.string().min(2).max(100).optional(),
  category: z.array(z.record(z.string().trim())),
  formats: z.array(
    z.object({
      value: z.string().min(2, { message: 'Please enter a format size.' }),
      price: z
        .preprocess(
          (a) => parseFloat(z.string().parse(a)),
          z.number().nonnegative().optional()
        )
        .optional(),
      stock: z
        .preprocess(
          (a) => parseInt(z.string().parse(a), 10),
          z.number().int().nonnegative().optional()
        )
        .optional(),
    })
  ),
});

export type EditProductFormValues = z.infer<typeof editProductFormSchema>;
