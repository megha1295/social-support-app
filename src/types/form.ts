export type Gender = 'male' | 'female' | 'other'

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'

export type EmploymentStatus = 'employed' | 'unemployed' | 'self-employed' | 'student' | 'retired'

export type HousingStatus = 'owned' | 'rented' | 'family' | 'homeless'

export interface Step1Data {
  name: string
  nationalId: string
  dateOfBirth: string
  gender: Gender
  address: string
  city: string
  emirate: string
  country: 'United Arab Emirates'
  phone?: string
  email?: string
}

export interface Step2Data {
  maritalStatus: MaritalStatus
  dependents: number
  employmentStatus: EmploymentStatus
  monthlyIncome: number
  housingStatus: HousingStatus
}

export interface Step3Data {
  financialSituation: string
  employmentCircumstances: string
  reasonForApplying: string
}

export interface FormData {
  step1: Step1Data
  step2: Step2Data
  step3: Step3Data
}