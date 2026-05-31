import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { step1Schema, type Step1FormData } from '../../../schemas/step1Schema'
import { useFormContext } from '../../../context/FormContext'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import styles from './Steps.module.css'

export default function Step1() {
  const { t } = useTranslation()
  const { formData, updateStep1, nextStep } = useFormContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1,
  })

  const emirateOptions = [
  { value: 'abu-dhabi', label: 'Abu Dhabi' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'sharjah', label: 'Sharjah' },
  { value: 'ajman', label: 'Ajman' },
  { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
  { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
  { value: 'fujairah', label: 'Fujairah' },
]
  const genderOptions = [
    { value: 'male', label: t('step1.genderOptions.male') },
    { value: 'female', label: t('step1.genderOptions.female') },
    { value: 'other', label: t('step1.genderOptions.other') },
  ]

  const onSubmit = (data: Step1FormData) => {
    updateStep1(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className="required-note" >
        Fields marked with <span className="asterisk">*</span> are required
        </p>
      <div className={styles.formGrid}>

        <div className={styles.fullWidth}>
          <InputField
            id="name"
            label={t('step1.name')}
            placeholder={t('step1.placeholders.name')}
            required={true}
            error={errors.name}
            {...register('name')}
          />
        </div>

        <div className={styles.fullWidth}>
          <InputField
            id="nationalId"
            label={t('step1.nationalId')}
            required={true}
            placeholder={t('step1.placeholders.nationalId')}
            error={errors.nationalId}
            {...register('nationalId')}
          />
        </div>

        <div className={styles.grid}>
          <InputField
            id="dateOfBirth"
            label={t('step1.dateOfBirth')}
            type="date"
            required={true}
            error={errors.dateOfBirth}
            {...register('dateOfBirth')}
          />
          <SelectField
            id="gender"
            label={t('step1.gender')}
            options={genderOptions}
            error={errors.gender}
            {...register('gender')}
          />
        </div>

        <div className={styles.fullWidth}>
          <InputField
            id="address"
            label={t('step1.address')}
            placeholder={t('step1.placeholders.address')}
            required={true}
            error={errors.address}
            {...register('address')}
          />
        </div>

        <div className={styles.grid}>
          <InputField
            id="city"
            label={t('step1.city')}
            placeholder={t('step1.placeholders.city')}
            error={errors.city}
            required={true}
            {...register('city')}
          />
          <SelectField
            id="emirate"
            label={t('step1.emirate')}
            options={emirateOptions}
            error={errors.emirate}
            required
            {...register('emirate')}
/>
        </div>

        <div className={styles.grid}>
          <InputField
            id="country"
            label={t('step1.country')}
            value="United Arab Emirates"
            disabled
            {...register('country')}
            />
          <InputField
            id="phone"
            label={t('step1.phone')}
            placeholder={t('step1.placeholders.phone')}
            error={errors.phone}
            {...register('phone')}
          />
        </div>

        <div className={styles.fullWidth}>
          <InputField
            id="email"
            label={t('step1.email')}
            type="email"
            placeholder={t('step1.placeholders.email')}
            error={errors.email}
            {...register('email')}
          />
        </div>
        <p className="required-note" style={{ marginTop: '6px' }}>
            <span className="asterisk">*</span> At least one of phone or email is required
        </p>

      </div>

      <div className={styles.nav}>
        <button type="submit" className={styles.btnNext}>
          {t('next')}
        </button>
      </div>
    </form>
  )
}