import { useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css } from "styled-system/css"
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { makeSettingsRequest } from "front/api/profile"
import { useStore } from "front/store/store"
import { ImageSettingsType, Tags, User } from "front/typing/user"
import { useApi } from "front/hook/useApi"
import { AlertTypeEnum } from "front/typing/alert"

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

const Settings = ({ profileSettings }: { profileSettings: ProfileSettingsType }) => {
  const profileImageFromUser = profileSettings.user.images?.find(i => i.is_profile_picture)?.image_file
  const slotsStyles = settingsStyle.raw()
  const { token } = useStore((state) => state.authStore)
  const addAlert = useStore((state) => state.addAlert)
  const [selectedChips, setSelectedChips] = useState<Tags[]>(profileSettings.user.tags)
  const [profilePicturePreview, setProfilPicturePreview] = useState<string | undefined>(profileImageFromUser ? `data:image/png;base64,${profileImageFromUser}` : undefined)
  const [profilesImages, setProfilesImages] = useState<ImageSettingsType[]>(profileSettings.user.images.map(i => ({
    file: i.image_file,
    is_profile_picture: i.is_profile_picture,
    preview: `data:image/png;base64,${i.image_file}`
  })))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<User>>({
    defaultValues: profileSettings.user
  })

  console.info('selected = ', selectedChips)
  const onChipClick = (chip: Tags, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c.id !== chip.id)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  const onSubmit = async (values: Partial<User>) => {
    console.info('images = ', [...profilesImages.map(o => ({ file: o.file, is_profile_picture: o.is_profile_picture }))])
    const data = {
      ...values,
      images: [...profilesImages.map(o => ({ file: o.file, is_profile_picture: o.is_profile_picture }))]
    }
    console.info('data = ', data)

    const formData = new FormData()

    profilesImages.forEach((image: any, index) => {
      // if (typeof image === 'string' && image.startsWith("data:")) {
      //   // Si l'image est en base64, convertit en File
      //   const [metadata, data] = image.split(',');
      //   const mime = metadata.match(/:(.*?);/)[1];
      //   const byteString = atob(data);
      //   const byteNumbers = new Array(byteString.length);
      //   for (let i = 0; i < byteString.length; i++) {
      //     byteNumbers[i] = byteString.charCodeAt(i);
      //   }
      //   const byteArray = new Uint8Array(byteNumbers);
      //   const blob = new Blob([byteArray], { type: mime });
      //   const file = new File([blob], `image${index + 1}.${mime.split('/')[1]}`, { type: mime });
      //   formData.append(`images[${index}][file]`, file);
      // } else {
      // Si c'est déjà un objet File, l'ajoute directement
      formData.append(`images[${index}][file]`, image.file);
      // }
      formData.append(`images[${index}][is_profile_picture]`, image.is_profile_picture.toString());
    });

    selectedChips.forEach((tag) => {
      formData.append(`tag_ids`, tag.id.toString());
    });

    for (const [key, value] of Object.entries(values)) {
      if (key !== 'tags' && key !== 'images') {
        formData.append(key, value)
      }
    }

    console.info("formData = ", formData)

    const ret = await makeSettingsRequest(
      formData,
      token,
      addAlert
    )

    if (ret) {
      addAlert({ message: 'Votre profile a ete update', type: AlertTypeEnum.SUCCESS })
    }
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
      console.error('Max images Uploaded: ', imagesLength)
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
        <div className={css(slotsStyles.rowInputs)}>
          <label htmlFor="last_name">
            Nom:
            <input id="last_name" type='text' {...register('last_name')} />
          </label>
          <label htmlFor="first_name">
            Prenom:
            <input id="first_name" type='text' {...register('first_name')} />
          </label>
        </div>
        <label htmlFor="email">
          Email:
          <input id="email" type='text' {...register('email')} />
        </label>
        <label>
          Genre:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRadio value="M" label="Homme" register={{ ...register('gender') }} />
            <InputRadio value="F" label="Femme" register={{ ...register('gender') }} />
          </div>
        </label>
        <label>
          Attirer par:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRadio value="M" label="Homme" register={{ ...register('sexual_preference') }} />
            <InputRadio value="F" label="Femme" register={{ ...register('sexual_preference') }} />
            <InputRadio value="B" label="Les deux" register={{ ...register('sexual_preference') }} />
          </div>
        </label>
        <label>
          Desription:
          <textarea className={css(slotsStyles.textAreaInput)} {...register('bio')} name="bio" ></textarea>
        </label>
        <label>
          Centre d'interets:
          <ChipSelect chips={profileSettings.tags} selectedChips={selectedChips} onChipClick={onChipClick} />
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
              profilesImages.map((profileImage, index) => profileImage.preview && !profileImage.is_profile_picture ? (
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

type ProfileSettingsType = {
  user: User,
  tags: Tags[]
}
const ScreenSettings = () => {
  const [profileSettings, setProfileSettings] = useState<ProfileSettingsType>()
  const { isLoading } = useApi<ProfileSettingsType>({
    endpoint: 'profile/settings',
    setter: setProfileSettings,
  })
  console.info("isLoading = ", isLoading)
  if (isLoading) {
    return <div>loading...</div>
  }
  return <Settings profileSettings={profileSettings} />
}

export default ScreenSettings