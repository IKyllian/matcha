import { useCallback, useEffect, useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css } from "styled-system/css"
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { makePositionRequest, makeSettingsRequest } from "front/api/profile"
import { useStore } from "front/store/store"
import { ImageSettingsType, Tags, User } from "front/typing/user"
import { useApi } from "front/hook/useApi"
import { AlertTypeEnum } from "front/typing/alert"

type InputRadioProps = {
  value: string
  label: string
  register: any
}

type PositionType = {
  displayName: string,
  latitude: number,
  longitude: number
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
  const profileImageFromUser = profileSettings?.user?.images?.find(i => i.is_profile_picture)?.image_file
  const slotsStyles = settingsStyle.raw()
  const { token } = useStore((state) => state.authStore)
  const addAlert = useStore((state) => state.addAlert)
  const [selectedChips, setSelectedChips] = useState<Tags[]>(profileSettings.user.tags)
  const [profilePicturePreview, setProfilPicturePreview] = useState<string | undefined>(profileImageFromUser ? profileImageFromUser : undefined)
  const [profilesImages, setProfilesImages] = useState<ImageSettingsType[]>(profileSettings.user.images.map(i => ({
    file: i.image_file,
    is_profile_picture: i.is_profile_picture,
    preview: i.image_file,
    file_name: i.file_name
  })))
  const [inputPositionsList, setInputPositionsList] = useState<PositionType[]>([])
  const [positionSelected, setPositionSelected] = useState<PositionType>()
  const [inputPosition, setInputPosition] = useState<string>('')

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

    for (const [key, value] of Object.entries(values)) {
      if (key !== 'tags' && key !== 'images' && key !== 'fame_rating') {
        formData.append(key, value)
      }
    }

    profilesImages.forEach((image: any, index) => {
      const imageFile: string = image?.file
      if (typeof imageFile === 'string' && imageFile.startsWith("data:")) {
        // Si l'image est en base64, convertit en File
        const byteString = atob(imageFile.split(",")[1]); // Décoder Base64
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const mimeType = imageFile.match(/data:(.*?);base64/)[1];
        const blob = new Blob([ab], { type: mimeType });
        const fileName = image.file_name ? image.file_name : `image${index + 1}.${mimeType.split('/')[1]}`
        const file = new File([blob], fileName, { type: mimeType });

        formData.append(`images[${index}][file]`, file);
      } else {
        // Si c'est déjà un objet File, l'ajoute directement
        formData.append(`images[${index}][file]`, imageFile);
      }
      formData.append(`images[${index}][is_profile_picture]`, image.is_profile_picture.toString());
    });

    selectedChips.forEach((tag) => {
      formData.append(`tag_ids`, tag.id.toString());
    });

    if (positionSelected) {
      console.info('set new position = ', positionSelected)
      formData.append('longitude', positionSelected.longitude.toString())
      formData.append('latitude', positionSelected.latitude.toString())
    }

    console.info("formData = ", formData)

    const ret = await makeSettingsRequest(
      {
        data: formData,
        token,
        addAlert
      }
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
        setProfilesImages(prev => [...prev, { file, preview: URL.createObjectURL(file), is_profile_picture: false }])
      }
    }
  }

  const onImageDelete = (index: number) => {
    const newArray = [...profilesImages]
    newArray.splice(index, 1)
    setProfilesImages([...newArray])
  }

  const onPositionClick = (value: PositionType) => {
    setInputPosition(value.displayName)
    setPositionSelected(value)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputPosition(value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (inputPosition.trim() === "" || inputPosition.trim().length < 2) {
        setInputPositionsList([])
        return
      }
      console.info('CALL API')
      const ret: any = await makePositionRequest({ city: inputPosition })
      if (ret && Array.isArray(ret)) {
        setInputPositionsList(ret.map(p => ({ displayName: p.display_name, latitude: p.lat, longitude: p.lon })))
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [inputPosition])

  return (
    <div className={css(slotsStyles.settingsContainer)}>
      <h2 className={css(slotsStyles.title)}> Completez votre profil </h2>
      <form className={css(slotsStyles.settingsWrapper)} onSubmit={handleSubmit(onSubmit)}>
        <div className={css(slotsStyles.rowInputs)}>
          <label htmlFor="last_name">
            Nom*:
            <input id="last_name" type='text' {...register('last_name')} />
          </label>
          <label htmlFor="first_name">
            Prenom*:
            <input id="first_name" type='text' {...register('first_name')} />
          </label>
        </div>
        <label htmlFor="email">
          Email*:
          <input id="email" type='text' {...register('email')} />
        </label>
        <label>
          Genre*:
          <div className={css(slotsStyles.radioWrapper)}>
            <InputRadio value="M" label="Homme" register={{ ...register('gender') }} />
            <InputRadio value="F" label="Femme" register={{ ...register('gender') }} />
          </div>
        </label>
        <label>
          Attirer par*:
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
        <label className={css(slotsStyles.positionContainer)}>
          Position:
          <input type='text' onChange={handleChange} value={inputPosition} />
          {
            inputPositionsList.length > 0 && (
              <div className={css(slotsStyles.positionListContainer)}>
                {
                  inputPositionsList.map((position, index) =>
                    <span
                      key={position.displayName}
                      className={css(slotsStyles.positionItem)}
                      data-border={+(index < inputPositionsList.length - 1)}
                      onClick={() => onPositionClick(position)}
                    >
                      {position.displayName}
                    </span>)
                }
              </div>
            )
          }
        </label>
        <label>
          Centre d'interets:
          <ChipSelect chips={profileSettings.tags} selectedChips={selectedChips} onChipClick={onChipClick} />
        </label>
        <div className={css(slotsStyles.profilPictureContainer)}>
          <label>
            Photo de profile*:
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
        <span className={css(slotsStyles.textInfo)}>* Champs requis pour interagir avec les autres utilisateurs</span>
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