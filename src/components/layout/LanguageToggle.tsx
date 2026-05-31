import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import styles from './LanguageToggle.module.css'

export default function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const isArabic = i18n.language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }, [isArabic])

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={styles.button}
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {t('language')}
    </button>
  )
}