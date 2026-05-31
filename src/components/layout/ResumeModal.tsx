import styles from './ResumeModal.module.css'

interface ResumeModalProps {
  onResume: () => void
  onFresh: () => void
  onCancel: () => void
}

export default function ResumeModal({ onResume, onFresh, onCancel }: ResumeModalProps) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <div className={styles.modal}>
        <div className={styles.icon}>📋</div>
        <h2 id="resume-title" className={styles.title}>
          Saved Application Found
        </h2>
        <p className={styles.message}>
          You have a previously saved application. Would you like to resume where you left off or start a fresh application?
        </p>
        <div className={styles.actions}>
          <button className={styles.btnResume} onClick={onResume}>
            Resume My Application
          </button>
          <button className={styles.btnFresh} onClick={onFresh}>
            Start Fresh
          </button>
          <button className={styles.btnCancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}