import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { FormData, Step1Data, Step2Data, Step3Data } from '../types/form'
import { loadFormData, saveFormData, clearFormData } from '../hooks/useFormPersist'

const defaultFormData: FormData = {
  step1: {
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    emirate: '',
    country: 'United Arab Emirates',
    phone: '',
    email: '',
  },
  step2: {
    maritalStatus: 'single',
    dependents: 0,
    employmentStatus: 'employed',
    monthlyIncome: 0,
    housingStatus: 'rented',
  },
  step3: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
}

interface FormContextType {
  formData: FormData
  currentStep: number
  updateStep1: (data: Step1Data) => void
  updateStep2: (data: Step2Data) => void
  updateStep3: (data: Step3Data) => void
  nextStep: () => void
  prevStep: () => void
  resetForm: () => void
  setSubmission: (value: boolean) => void
  submission: boolean
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const stored = loadFormData()

  const [formData, setFormData] = useState<FormData>(
    stored?.data ?? defaultFormData
  )
  const [currentStep, setCurrentStep] = useState(
    stored?.step ?? 1
  )
  const [submission, setSubmission] = useState(false)

  useEffect(() => {
    saveFormData(formData, currentStep)
  }, [formData, currentStep])

  const updateStep1 = (data: Step1Data) => {
    debugger
    setFormData(prev => ({ ...prev, step1: data }))
  }

  const updateStep2 = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, step2: data }))
  }

  const updateStep3 = (data: Step3Data) => {
    setFormData(prev => ({ ...prev, step3: data }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const resetForm = () => {
  setFormData(defaultFormData)
  setCurrentStep(1)
  setSubmission(false)
  clearFormData()
}

  return (
    <FormContext.Provider value={{
      formData,
      currentStep,
      submission,
      updateStep1,
      updateStep2,
      updateStep3,
      nextStep,
      prevStep,
      resetForm,
      setSubmission,
    }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}