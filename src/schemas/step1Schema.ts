import { z } from 'zod'

export const step1Schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  nationalId: z
    .string()
    .min(6, 'National ID must be at least 6 characters')
    .max(20, 'National ID must be less than 20 characters')
    .regex(/^[A-Z0-9]+$/, 'National ID must contain only uppercase letters and numbers'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val)
      const today = new Date()
      const age = today.getFullYear() - date.getFullYear()
      return age >= 18
    }, 'You must be at least 18 years old'),

  gender: z.enum(['male', 'female', 'other'], {
    error: 'Please select a gender',
  }),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters'),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters'),

  emirate: z
    .string()
    .min(1, 'Please select an emirate'),

  country: z.literal('United Arab Emirates'),
  phone: z
    .string()
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .optional()
    .or(z.literal('')),

}).refine(
  (data) => {
    const hasPhone = data.phone && data.phone.trim().length > 0
    const hasEmail = data.email && data.email.trim().length > 0
    return hasPhone || hasEmail
  },
  {
    message: 'Please provide either a phone number or email address',
    path: ['phone'],
  }
).refine(
  (data) => {
    if (!data.phone || data.phone.trim().length === 0) return true
    return /^\+971[0-9]{8,9}$/.test(data.phone)
  },
  {
    message: 'Enter a valid UAE phone number (e.g. +971501234567)',
    path: ['phone'],
  }
).refine(
  (data) => {
    if (!data.email || data.email.trim().length === 0) return true
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  },
  {
    message: 'Enter a valid email address',
    path: ['email'],
  }
)

export type Step1FormData = z.infer<typeof step1Schema>