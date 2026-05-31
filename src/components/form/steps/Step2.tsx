import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { step2Schema, type Step2FormData } from '../../../schemas/step2Schema'
import { useFormContext } from '../../../context/FormContext'
import SelectField from '../ui/SelectField'
import InputField from '../ui/InputField'
import styles from './Steps.module.css'

export default function Step2() {
  const { t } = useTranslation()
  const { formData, updateStep2, nextStep, prevStep } = useFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData.step2,
  })

  const maritalStatusOptions = [
    { value: 'single', label: t('step2.maritalOptions.single') },
    { value: 'married', label: t('step2.maritalOptions.married') },
    { value: 'divorced', label: t('step2.maritalOptions.divorced') },
    { value: 'widowed', label: t('step2.maritalOptions.widowed') },
  ]

  const employmentStatusOptions = [
    { value: 'employed', label: t('step2.employmentOptions.employed') },
    { value: 'unemployed', label: t('step2.employmentOptions.unemployed') },
    { value: 'self-employed', label: t('step2.employmentOptions.selfEmployed') },
    { value: 'student', label: t('step2.employmentOptions.student') },
    { value: 'retired', label: t('step2.employmentOptions.retired') },
  ]

  const housingStatusOptions = [
    { value: 'owned', label: t('step2.housingOptions.owned') },
    { value: 'rented', label: t('step2.housingOptions.rented') },
    { value: 'family', label: t('step2.housingOptions.family') },
    { value: 'homeless', label: t('step2.housingOptions.homeless') },
  ]

  const onSubmit = (data: Step2FormData) => {
    updateStep2(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className={styles.requiredNote}>
        Fields marked with <span className={styles.asteriskNote}>*</span> are required
      </p>
      <div className={styles.formGrid}>

        <div className={styles.grid}>
          <SelectField
            id="maritalStatus"
            label={t('step2.maritalStatus')}
            options={maritalStatusOptions}
            error={errors.maritalStatus}
            {...register('maritalStatus')}
          />
          <InputField
            id="dependents"
            label={t('step2.dependents')}
            type="number"
            min={0}
            placeholder="0"
            error={errors.dependents}
            {...register('dependents', { valueAsNumber: true })}
          />
        </div>

        <div className={styles.grid}>
          <SelectField
            id="employmentStatus"
            label={t('step2.employmentStatus')}
            options={employmentStatusOptions}
            error={errors.employmentStatus}
            {...register('employmentStatus')}
          />
          <InputField
            id="monthlyIncome"
            label={t('step2.monthlyIncome')}
            type="number"
            min={0}
            placeholder="0"
            error={errors.monthlyIncome}
            {...register('monthlyIncome', { valueAsNumber: true })}
          />
        </div>

        <div className={styles.fullWidth}>
          <SelectField
            id="housingStatus"
            label={t('step2.housingStatus')}
            options={housingStatusOptions}
            error={errors.housingStatus}
            {...register('housingStatus')}
          />
        </div>

      </div>

      <div className={styles.navBetween}>
        <button
          type="button"
          onClick={prevStep}
          className={styles.btnBack}
        >
          {t('back')}
        </button>
        <button type="submit" className={styles.btnNext}>
          {t('next')}
        </button>
      </div>
    </form>
  )
}