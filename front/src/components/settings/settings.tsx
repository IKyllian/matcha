import { useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css } from "styled-system/css"
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { makeSettingsRequest } from "front/api/profile"
import { useStore } from "front/store/store"
import { FormValuesSettings, ImageSettingsType } from "front/typing/user"

type InputRadioProps = {
  value: string
  label: string
  register: any
}

const InputRadio = ({ value, label, register }: InputRadioProps) => {
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
  const { token } = useStore((state) => state.authStore)
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [profilePicturePreview, setProfilPicturePreview] = useState<string | null>(null)
  const [profilesImages, setProfilesImages] = useState<ImageSettingsType[]>([])
  console.info('profilesImages = ', profilesImages)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesSettings>()

  const onChipClick = (chip: string, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c !== chip)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  const onSubmit = async (values: FormValuesSettings) => {
    await makeSettingsRequest({
      data: {
        ...values,
        images: [...profilesImages.map(o => ({ file: o.file, is_profile_picture: o.is_profile_picture }))]
      }, token
    })
    console.info("values - ", values)
  }

  const onSingleUpload = (event: any) => {
    console.info("data - ", event)
    const [file] = event.target.files
    // const filesize: string = ((file.size/1024)/1024).toFixed(4);
    if (file) {
      setProfilPicturePreview(URL.createObjectURL(file))
      setProfilesImages(prev => [...prev, { file, is_profile_picture: true }])
    }
    console.info("upload", file)
  }

  const onMultipleUpload = (event: any) => {
    console.info("data - ", event)
    const imagesLength = profilesImages.length
    if (imagesLength === 4) {
      console.info('Max images Uploaded: ', imagesLength)
      return
    }
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      if (i + imagesLength === 4) {
        break
      }
      for (const file of files) {
        // setProfilesImages(prev => [...prev, URL.createObjectURL(file)])
        setProfilesImages(prev => [...prev, { file, preview: URL.createObjectURL(file), is_profile_picture: false }])
      }
    }
  }

  const onImageDelete = (index: number) => {
    const newArray = [...profilesImages]
    newArray.splice(index, 1)
    setProfilesImages([...newArray])
  }

  return (
    <div className={css(slotsStyles.settingsContainer)}>
      <h2 className={css(slotsStyles.title)}> Completez votre profil </h2>
      <form className={css(slotsStyles.settingsWrapper)} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Genre:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRadio value="male" label="Homme" register={{ ...register('gender') }} />
            <InputRadio value="female" label="Femme" register={{ ...register('gender') }} />
          </div>
        </label>
        <label>
          Attirer par:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRadio value="male" label="Homme" register={{ ...register('preference') }} />
            <InputRadio value="female" label="Femme" register={{ ...register('preference') }} />
            <InputRadio value="bi" label="Les deux" register={{ ...register('preference') }} />
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
              <input type="file" id="profile-picture" hidden onChange={onSingleUpload} />
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
        <label>
          Téléchargez plus de photos:
        </label>
        {
          profilesImages.length > 0 &&
          <div className={css(slotsStyles.picturesContainer)}>
            {
              profilesImages.map((profileImage, index) => profileImage.preview ? (
                <div key={profileImage.preview} className={css(slotsStyles.picturesItemContainer)}>
                  <div className={css(slotsStyles.picturesItem)}>
                    <img src={profileImage.preview} alt='' />
                  </div>
                  <div className={css(slotsStyles.uploadButton, slotsStyles.imageResetButton)}>
                    <IoClose onClick={() => onImageDelete(index)} />
                  </div>
                </div>
              ) : null)
            }
          </div>
        }
        <label>
          <input type="file" id="photos" multiple accept="image/*" hidden onChange={onMultipleUpload} />
          <div className={css(slotsStyles.filesUploadContainer)}>
            <FaUpload />
            <span> Upload </span>
          </div>
        </label>
        <button type="submit" className={css(slotsStyles.button)}> Sauvegarder </button>
      </form>
    </div>
  )
}

export default Settings