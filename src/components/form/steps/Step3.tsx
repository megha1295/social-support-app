import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { step3Schema, type Step3FormData } from '../../../schemas/step3Schema'
import { useFormContext } from '../../../context/FormContext'
import TextareaField from '../ui/TextareaField'
import AIButton from '../ui/AIButton'
import styles from './Steps.module.css'

const MIN_CHARS = 10

export default function Step3() {
  const { t } = useTranslation()
  const { formData, updateStep3, nextStep, prevStep } = useFormContext()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData.step3,
  })

  const financialSituation = useWatch({ control, name: 'financialSituation' }) ?? ''
  const employmentCircumstances = useWatch({ control, name: 'employmentCircumstances' }) ?? ''
  const reasonForApplying = useWatch({ control, name: 'reasonForApplying' }) ?? ''

  const onSubmit = (data: Step3FormData) => {
    updateStep3(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className={styles.requiredNote}>
      Fields marked with <span className={styles.asteriskNote}>*</span> are required
    </p>
      <div className={styles.formGrid}>

        <div className={styles.fullWidth}>
          <TextareaField
            id="financialSituation"
            label={t('step3.financialSituation')}
            placeholder={t('step3.placeholders.financialSituation')}
            error={errors.financialSituation}
            charCount={financialSituation.length}
            minChars={MIN_CHARS}
            {...register('financialSituation')}
          />
          <AIButton
            fieldType="financialSituation"
            currentValue={financialSituation}
            minChars={MIN_CHARS}
            onAccept={(text) => setValue('financialSituation', text, { shouldValidate: true })}
          />
        </div>

        <div className={styles.fullWidth}>
          <TextareaField
            id="employmentCircumstances"
            label={t('step3.employmentCircumstances')}
            placeholder={t('step3.placeholders.employmentCircumstances')}
            error={errors.employmentCircumstances}
            charCount={employmentCircumstances.length}
            minChars={MIN_CHARS}
            {...register('employmentCircumstances')}
          />
          <AIButton
            fieldType="employmentCircumstances"
            currentValue={employmentCircumstances}
            minChars={MIN_CHARS}
            onAccept={(text) => setValue('employmentCircumstances', text, { shouldValidate: true })}
          />
        </div>

        <div className={styles.fullWidth}>
          <TextareaField
            id="reasonForApplying"
            label={t('step3.reasonForApplying')}
            placeholder={t('step3.placeholders.reasonForApplying')}
            error={errors.reasonForApplying}
            charCount={reasonForApplying.length}
            minChars={MIN_CHARS}
            {...register('reasonForApplying')}
          />
          <AIButton
            fieldType="reasonForApplying"
            currentValue={reasonForApplying}
            minChars={MIN_CHARS}
            onAccept={(text) => setValue('reasonForApplying', text, { shouldValidate: true })}
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