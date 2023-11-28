import { z } from 'zod';

export const editProductAttributesSchema = z.object({
  formatName: z.optional(
    z
      .string()
      .min(2, {
        message: 'Format must be at least 2 characters.',
      })
      .max(30, {
        message: 'Format must not be longer than 30 characters.',
      })
  ),
  price: z
    .preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().nonnegative().optional()
    )
    .optional(),
  quantityStock: z
    .preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().nonnegative().optional()
    )
    .optional(),
});

export type editProductAttributesFormValues = z.infer<
  typeof editProductAttributesSchema
>;
