import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import styles from './InputField.module.css'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
  required?: boolean
}

export default function InputField({ label, error, id, required, ...rest }: InputFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className="asterisk"> *</span>}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...rest}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error.message}
        </span>
      )}
    </div>
  )
}