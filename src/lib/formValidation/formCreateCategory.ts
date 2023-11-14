import { z } from 'zod';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  image: z.custom<File>().refine((file) => ALLOWED_FILE_TYPES.includes(file.type)),
  description: z.string().max(500).min(4, {
    message: 'Description must be at least 4 characters.',
  }),
  isActive: z.boolean().default(true).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
