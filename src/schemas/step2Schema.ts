import { z } from 'zod'

export const step2Schema = z.object({
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    error: 'Please select a marital status',
  }),

  dependents: z
    .number({ error: 'Please enter a valid number' })
    .min(0, 'Dependents cannot be negative')
    .max(20, 'Please enter a realistic number of dependents'),

  employmentStatus: z.enum(
    ['employed', 'unemployed', 'self-employed', 'student', 'retired'],
    {
      error: 'Please select an employment status',
    }
  ),

  monthlyIncome: z
    .number({ error: 'Please enter a valid amount' })
    .min(0, 'Income cannot be negative')
    .max(1000000, 'Please enter a realistic income amount'),

  housingStatus: z.enum(['owned', 'rented', 'family', 'homeless'], {
    error: 'Please select a housing status',
  }),
})

export type Step2FormData = z.infer<typeof step2Schema>