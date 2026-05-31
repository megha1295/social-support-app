import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFormContext } from '../../context/FormContext'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import LanguageToggle from '../layout/LanguageToggle'
import styles from './FormWizard.module.css'

export default function FormWizard() {
  const { currentStep, submission } = useFormContext()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const stepRef = useRef<HTMLDivElement>(null)

  const steps = [
    { id: 1, label: t('steps.personal') },
    { id: 2, label: t('steps.family') },
    { id: 3, label: t('steps.situation') },
    { id: 4, label: t('steps.review') },
  ]

  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus()
    }
  }, [currentStep])

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />
      case 2: return <Step2 />
      case 3: return <Step3 />
      case 4: return <Step4 />
      default: return null
    }
  }

  const progressWidth = `${((currentStep - 1) / (steps.length - 1)) * 80}%`

  return (
    <div className={styles.page}>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo} onClick={() => navigate('/')}>
          <div className={styles.navEmblem}>DGE</div>
          <span className={styles.navTitle}>Department of Government Enablement</span>
        </div>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </nav>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.card}>

          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div>
              <h1 className={styles.cardTitle}>{t('appTitle')}</h1>
              <p className={styles.cardSubtitle}>
                Department of Government Enablement, Abu Dhabi
              </p>
            </div>
            <LanguageToggle />
          </div>

          {!submission && (
            <>
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {t('stepOf', { current: currentStep, total: steps.length })}: {steps[currentStep - 1].label}
              </div>

              {/* Progress Bar */}
              <div className={styles.progressWrap}>
                <div className={styles.progressTrack} />
                <div
                  className={styles.progressFill}
                  style={{ width: progressWidth }}
                />
                <div className={styles.circlesRow}>
                  {steps.map((step) => (
                    <div key={step.id} className={styles.stepCol}>
                      <div
                        className={`${styles.circle} ${
                          currentStep > step.id
                            ? styles.circleDone
                            : currentStep === step.id
                            ? styles.circleActive
                            : ''
                        }`}
                        aria-label={
                          currentStep > step.id
                            ? `${step.label} completed`
                            : currentStep === step.id
                            ? `${step.label} current step`
                            : `${step.label} not started`
                        }
                      >
                        {currentStep > step.id ? '✓' : step.id}
                      </div>
                      <span
                        className={`${styles.stepLabel} ${
                          currentStep === step.id ? styles.stepLabelActive : ''
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Info */}
              <p className={styles.stepInfo}>
                {t('stepOf', { current: currentStep, total: steps.length })} - {steps[currentStep - 1].label}
              </p>

              {/* Divider */}
              <div className={styles.divider} />
            </>
          )}

          {/* Step Content */}
          <div
            key={currentStep}
            className={`animate-fadeIn ${styles.stepContent}`}
            ref={stepRef}
            tabIndex={-1}
            aria-label={`Step ${currentStep}: ${steps[currentStep - 1].label}`}
          >
            {renderStep()}
          </div>

        </div>
      </div>

    </div>
  )
}