import { useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css } from "styled-system/css"
import { useForm } from "react-hook-form"

type FormValues = {
  description: string
  gender: 'male' | 'female',
  preference: 'male' | 'female' | 'bi'
}

type InputRatioProps = {
  value: string
  label: string
  register: any
}

const InputRatio = ({ value, label, register }: InputRatioProps) => {
  const slotsStyles = settingsStyle.raw()
  return (
    <label className={css(slotsStyles.radioLabel)}>
      <input className={css(slotsStyles.radioInput)} {...register} type="radio" value={value} />
      {label}
    </label>
  )
}

const Settings = () => {
  const slotsStyles = settingsStyle.raw()
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onChipClick = (chip: string, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c !== chip)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  const onSubmit = (values: FormValues) => {
    console.info("values - ", values)
  }

  return (
    <div className={css(slotsStyles.settingsContainer)}>
      <h2 className={css(slotsStyles.title)}> Completez votre profil </h2>
      <form className={css(slotsStyles.settingsWrapper)} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Genre:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRatio value="male" label="Homme" register={{ ...register('gender') }} />
            <InputRatio value="female" label="Femme" register={{ ...register('gender') }} />
          </div>
        </label>
        <label>
          Attirer par:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRatio value="male" label="Homme" register={{ ...register('preference') }} />
            <InputRatio value="female" label="Femme" register={{ ...register('preference') }} />
            <InputRatio value="bi" label="Les deux" register={{ ...register('preference') }} />
          </div>
        </label>
        <label>
          Desription:
          <textarea className={css(slotsStyles.textAreaInput)} {...register('description')} name="description" ></textarea>
        </label>
        <label>
          Centre d'interets:
          <ChipSelect selectedChips={selectedChips} onChipClick={onChipClick} />
        </label>
        <label>
          Photos:
          <input type="file" multiple />
          <button type="submit" className={css(slotsStyles.button)}> Sauvegarder </button>
        </label>
      </form>
    </div>
  )
}

export default Settings