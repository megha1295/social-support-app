import type { SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import styles from './SelectField.module.css'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: FieldError
  options: { value: string; label: string }[]
  required?: boolean
}

export default function SelectField({ label, error, id, options,required, ...rest }: SelectFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className="asterisk"> *</span>}
      </label>
      <select
        id={id}
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className={styles.error} role="alert">
          {error.message}
        </span>
      )}
    </div>
  )
}