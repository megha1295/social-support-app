import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AIPopup.module.css'

interface AIPopupProps {
  suggestion: string
  onAccept: (text: string) => void
  onDiscard: () => void
}

export default function AIPopup({ suggestion, onAccept, onDiscard }: AIPopupProps) {
  const { t } = useTranslation()
  const [editedText, setEditedText] = useState(suggestion)
  const discardRef = useRef<HTMLButtonElement>(null)
  const acceptRef = useRef<HTMLButtonElement>(null)
  const firstFocusRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    firstFocusRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onDiscard()
    }

    if (e.key === 'Tab') {
      const focusableElements = [
        firstFocusRef.current,
        discardRef.current,
        acceptRef.current,
      ].filter(Boolean) as HTMLElement[]

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-popup-title"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.modal}>
        <h2 id="ai-popup-title" className={styles.title}>
          {t('aiPopup.title')}
        </h2>
        <p className={styles.subtitle}>
          {t('aiPopup.subtitle')}
        </p>

        <textarea
          ref={firstFocusRef}
          className={styles.textarea}
          rows={6}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          aria-label={t('aiPopup.editLabel')}
        />

        <div className={styles.actions}>
          <button
            ref={discardRef}
            type="button"
            onClick={onDiscard}
            className={styles.btnDiscard}
          >
            {t('aiPopup.discard')}
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => onAccept(editedText)}
            className={styles.btnAccept}
          >
            {t('aiPopup.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}