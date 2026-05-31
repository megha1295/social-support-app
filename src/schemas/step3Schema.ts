import { z } from 'zod'

export const step3Schema = z.object({
  financialSituation: z
    .string()
    .min(10, 'Please describe your financial situation in at least 10 characters'),

  employmentCircumstances: z
    .string()
    .min(10, 'Please describe your employment circumstances in at least 10 characters'),

  reasonForApplying: z
    .string()
    .min(10, 'Please describe your reason for applying in at least 10 characters'),
})

export type Step3FormData = z.infer<typeof step3Schema>