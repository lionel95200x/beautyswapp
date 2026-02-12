import { z } from 'zod'

/**
 * Schéma de validation pour la création d'un produit
 */
export const createProductSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.string()
    .min(1, 'Le prix est obligatoire')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Le prix doit être un nombre positif'
    }),
  category: z.string().min(1, 'Sélectionnez une catégorie'),
  brand: z.string().optional(),
  photos: z.array(z.string()).min(1, 'Ajoutez au moins une photo'),
})

export type CreateProductFormData = z.infer<typeof createProductSchema>
