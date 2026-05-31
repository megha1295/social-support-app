import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { getAISuggestion, type FieldType } from '../../../services/openai'
import AIPopup from './AIPopup'
import styles from './AIButton.module.css'

interface AIButtonProps {
  fieldType: FieldType
  currentValue: string
  minChars: number
  onAccept: (text: string) => void
}

export default function AIButton({
  fieldType,
  currentValue,
  minChars,
  onAccept,
}: AIButtonProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setError(null)
    setLoading(true)

    try {
      const result = await getAISuggestion(fieldType, currentValue)
      setSuggestion(result)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError(t('errors.timeout'))
        } else if (err.response?.status === 401) {
          setError(t('errors.unauthorized'))
        } else if (err.response?.status === 429) {
          setError(t('errors.rateLimit'))
        } else {
          setError(t('errors.generic'))
        }
      } else {
        setError(t('errors.generic'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = (text: string) => {
    onAccept(text)
    setSuggestion(null)
  }

  const handleDiscard = () => {
    setSuggestion(null)
  }

  return (
    <>
      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={handleClick}
          disabled={currentValue.length < minChars || loading}
          className={styles.button}
        >
          {loading ? t('step3.generating') : t('step3.helpMeWrite')}
        </button>
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>

      {suggestion && (
        <AIPopup
          suggestion={suggestion}
          onAccept={handleAccept}
          onDiscard={handleDiscard}
        />
      )}
    </>
  )
}