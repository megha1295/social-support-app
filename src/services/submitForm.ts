import type { FormData } from '../types/form'

export async function submitFormData(data: FormData): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 2000))

  console.log('Form submitted:', data)

  // Uncomment this to test error handling:
  // throw new Error('Submission failed')
}