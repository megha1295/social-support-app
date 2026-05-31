import { useEffect } from 'react'
import type { FormData } from '../types/form'

const STORAGE_KEY = 'social_support_form'

export function saveFormData(data: FormData, step: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }))
  } catch (err) {
    console.error('Failed to save form data:', err)
  }
}

export function loadFormData(): { data: FormData; step: number } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored)
  } catch (err) {
    console.error('Failed to load form data:', err)
    return null
  }
}

export function clearFormData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Failed to clear form data:', err)
  }
}

export function useFormPersist(formData: FormData, currentStep: number) {
  useEffect(() => {
    saveFormData(formData, currentStep)
  }, [formData, currentStep])
}
export function hasSavedData(): boolean {
  try {
    const stored = localStorage.getItem('social_support_form')
    if (!stored) return false
    const parsed = JSON.parse(stored)
    if (!parsed?.data || !parsed?.step) return false
    return parsed.step > 1 ? true : false
  } catch {
    return false
  }
}