import type { TextareaHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import styles from './TextareaField.module.css'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: FieldError
  charCount?: number
  minChars?: number
  required?: boolean
}

export default function TextareaField({
  label,
  error,
  id,
  charCount,
  minChars,
  required,
  ...rest
}: TextareaFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className="asterisk"> *</span>}
      </label>
      <textarea
        id={id}
        rows={4}
        className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
        {...rest}
      />
      <div className={styles.footer}>
        {error ? (
          <span className={styles.error} role="alert">
            {error.message}
          </span>
        ) : (
          <span />
        )}
        {charCount !== undefined && minChars !== undefined && (
          <span className={`${styles.charCount} ${charCount >= minChars ? styles.charCountReady : ''}`}>
            {charCount}/{minChars} min characters
          </span>
        )}
      </div>
    </div>
  )
}