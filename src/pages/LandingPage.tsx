import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import styles from './LandingPage.module.css'
import ResumeModal from '../components/layout/ResumeModal'
import { hasSavedData, clearFormData } from '../hooks/useFormPersist'
import { useFormContext } from '../context/FormContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [showResumeModal, setShowResumeModal] = useState(false);
  const { resetForm } = useFormContext();

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }, [isArabic])


  const stats = [
    { num: '48 Hours', label: 'Average processing time' },
    { num: '100%', label: 'Secure and confidential' },
    { num: '24/7', label: 'Application availability' },
  ]

  const steps = [
    { num: '1', title: 'Fill your details', desc: 'Provide your personal and financial information correctly.' },
    { num: '2', title: 'Describe your situation', desc: 'Use AI assistance to help describe your circumstances clearly.' },
    { num: '3', title: 'Submit and track', desc: 'Submit your application and receive confirmation immediately.' },
  ]

  const handleApplyClick = () => {
  if (hasSavedData()) {
    setShowResumeModal(true)
  } else {
    navigate('/apply')
  }
}
  return (
    <div className={styles.page}>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoArea}>
          <div className={styles.emblem}>DGE</div>
          <div>
            <div className={styles.logoEn}>Department of Government Enablement</div>
            <div className={styles.logoAr}>دائرة التمكين الحكومي</div>
          </div>
        </div>
       <div className={styles.navLinks}>
        <a href="https://www.dge.gov.ae/en/about-dge/who-we-are" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            About DGE
        </a>

        <a href="https://www.dge.gov.ae/en/services" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            Services
        </a>

        <a href="https://www.dge.gov.ae/en/get-in-touch" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            Get in touch
        </a>

</div>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroPattern} />
        <div className={styles.heroInner}>
          <div className={styles.eligibilityNote}>
            This programme is available to UAE Nationals (Emiratis) holding a family book issued by the Emirate of Abu Dhabi.
          </div>
          <div className={styles.heroBadge}>
            Social Support Portal
          </div>
          <h1 className={styles.heroTitle}>
            Apply for{' '}
            <span className={styles.heroTitleAccent}>Financial Assistance</span>
            {' '}from Abu Dhabi Government
          </h1>
          <p className={styles.heroDesc}>
            The Department of Government Enablement connects citizens with the
            support they need. Apply for financial assistance quickly and
            securely with AI-powered guidance.
          </p>
          <div className={styles.heroBtns}>
            <button
              className={styles.btnGold}
              onClick={() => handleApplyClick()}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className={styles.howSection}>
        <h2 className={styles.howTitle}>How it works</h2>
        <div className={styles.howGrid}>
          {steps.map((step) => (
            <div key={step.num} className={styles.howCard}>
              <div className={styles.howNum}>{step.num}</div>
              <div className={styles.howStepTitle}>{step.title}</div>
              <div className={styles.howStepDesc}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to apply?</h2>
        <p className={styles.ctaDesc}>
          The application takes approximately 10 minutes to complete.
          Your progress is saved automatically.
        </p>
        <button
          className={styles.btnNavy}
          onClick={() => handleApplyClick()}
        >
          Start Application
        </button>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.footerText}>
          © 2026 Department of Government Enablement, Abu Dhabi
        </span>
        <span className={styles.footerLogo}>dge.gov.ae</span>
      </div>

        {showResumeModal && (
        <ResumeModal
            onResume={() => {
            setShowResumeModal(false)
            navigate('/apply')
            }}
            onFresh={() => {
            clearFormData()
            resetForm()
            setShowResumeModal(false)
            navigate('/apply')
            }}
            onCancel={() => setShowResumeModal(false)}
        />
        )}
    </div>
  )
}