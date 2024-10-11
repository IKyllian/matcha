import { useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css } from "styled-system/css"
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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
  const [profilePicturePreview, setProfilPicturePreview] = useState<string | null>(null)

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

  const onUpload = (event: any) => {
    console.info("data - ", event)
    const [file] = event.target.files
    if (file) {
      setProfilPicturePreview(URL.createObjectURL(file))
    }
    console.info("upload", file)
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
        <div className={css(slotsStyles.profilPictureContainer)}>
          <label>
            Photo de profile:
          </label>
          {
            profilePicturePreview &&
            <div className={css(slotsStyles.profilPicturePreview)}>
              <img src={profilePicturePreview} alt="profile picture preview" />
            </div>
          }
          {
            !profilePicturePreview &&
            <label htmlFor="profile-picture" className={css(slotsStyles.uploadButton)}>
              <input type="file" id="profile-picture" hidden onChange={onUpload} />
              <FaUpload />
            </label>
          }
          {
            profilePicturePreview &&
            <div className={css(slotsStyles.uploadButton, slotsStyles.imageResetButton)} onClick={() => setProfilPicturePreview(null)}>
              <IoClose />
            </div>
          }
        </div>
        <button type="submit" className={css(slotsStyles.button)}> Sauvegarder </button>
      </form>
    </div>
  )
}

export default Settings