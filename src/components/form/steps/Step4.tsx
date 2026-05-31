import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from '../../../context/FormContext'
import { submitFormData } from '../../../services/submitForm'
import { clearFormData } from '../../../hooks/useFormPersist'
import styles from './Steps.module.css'
import reviewStyles from './Step4.module.css'

export default function Step4() {
  const { t } = useTranslation()
  const { formData, prevStep, resetForm, setSubmission } = useFormContext()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setLocalSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { step1, step2, step3 } = formData

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      await submitFormData(formData)
      clearFormData()
      setSubmission(true)
      setLocalSubmitted(true)
    } catch {
      setError(t('errors.generic'))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={reviewStyles.successWrapper}>
        <div className={reviewStyles.successIcon}>✓</div>
        <h2 className={reviewStyles.successTitle}>
          {t('review.submitted')}
        </h2>
        <p className={reviewStyles.successMessage}>
          {t('review.submittedMessage')}
        </p>
        <button
          onClick={resetForm}
          className={styles.btnNext}
        >
          {t('review.newApplication')}
        </button>
      </div>
    )
  }

  return (
    <div className={reviewStyles.wrapper}>

      <div className={reviewStyles.header}>
        <h2 className={reviewStyles.title}>{t('review.title')}</h2>
        <p className={reviewStyles.subtitle}>{t('review.subtitle')}</p>
      </div>

      <ReviewSection title={t('review.personal')}>
        <ReviewRow label={t('review.name')} value={step1.name} />
        <ReviewRow label={t('review.nationalId')} value={step1.nationalId} />
        <ReviewRow label={t('review.dateOfBirth')} value={step1.dateOfBirth} />
        <ReviewRow label={t('review.gender')} value={t(`step1.genderOptions.${step1.gender}`)} />
        <ReviewRow label={t('review.address')} value={step1.address} />
        <ReviewRow label={t('review.city')} value={step1.city} />
        <ReviewRow label={t('review.emirate')} value={step1.emirate} />
        <ReviewRow label={t('review.country')} value={step1.country} />
        <ReviewRow label={t('review.phone')} value={step1.phone} />
        <ReviewRow label={t('review.email')} value={step1.email} />
      </ReviewSection>

      <ReviewSection title={t('review.family')}>
        <ReviewRow label={t('review.maritalStatus')} value={t(`step2.maritalOptions.${step2.maritalStatus}`)} />
        <ReviewRow label={t('review.dependents')} value={String(step2.dependents)} />
        <ReviewRow label={t('review.employmentStatus')} value={t(`step2.employmentOptions.${step2.employmentStatus === 'self-employed' ? 'selfEmployed' : step2.employmentStatus}`)} />
        <ReviewRow label={t('review.monthlyIncome')} value={`AED ${step2.monthlyIncome}`} />
        <ReviewRow label={t('review.housingStatus')} value={t(`step2.housingOptions.${step2.housingStatus}`)} />
      </ReviewSection>

      <ReviewSection title={t('review.situation')}>
        <ReviewRow label={t('review.financialSituation')} value={step3.financialSituation} />
        <ReviewRow label={t('review.employmentCircumstances')} value={step3.employmentCircumstances} />
        <ReviewRow label={t('review.reasonForApplying')} value={step3.reasonForApplying} />
      </ReviewSection>

      {error && (
        <p className={reviewStyles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.navBetween}>
        <button
          type="button"
          onClick={prevStep}
          disabled={submitting}
          className={styles.btnBack}
        >
          {t('back')}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className={styles.btnNext}
        >
          {submitting ? t('review.submitting') : t('submit')}
        </button>
      </div>

    </div>
  )
}

function ReviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={reviewStyles.section}>
      <h3 className={reviewStyles.sectionTitle}>{title}</h3>
      <div className={reviewStyles.sectionContent}>
        {children}
      </div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={reviewStyles.row}>
      <span className={reviewStyles.rowLabel}>{label}</span>
      <span className={reviewStyles.rowValue}>{value || '-'}</span>
    </div>
  )
}