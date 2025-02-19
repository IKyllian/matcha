import { useEffect, useState } from "react"
import ChipSelect from "front/components/chips/chipSelect"
import { settingsStyle } from "./settings.style"
import { css, cx } from "styled-system/css"
import { useForm } from "react-hook-form"
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { makePositionRequest, makeSettingsRequest } from "front/api/profile"
import { useStore } from "front/store/store"
import { ImageSettingsType, Tags, User } from "front/typing/user"
import { useApi } from "front/hook/useApi"
import { AlertTypeEnum } from "front/typing/alert"
import { useNavigate } from "react-router-dom"
import { isUserProfileComplete } from "front/utils/user.utils"
import { makeIpAddressRequest } from "front/api/auth"
import useCloseRef from "front/hook/useCloseRef"

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

const INPUT_OPTIONS: Record<'first_name' | 'last_name' | 'bio', any> = {
  first_name: {
    minLength: {
      value: 2,
      message: "Taille min: 2"
    },
    maxLength: {
      value: 35,
      message: "Taille max: 35"
    },
    required: {
      value: true,
      message: 'Prenom requis'
    }
  },
  last_name: {
    minLength: {
      value: 2,
      message: "Taille min: 2"
    },
    maxLength: {
      value: 35,
      message: "Taille max: 35"
    },
    required: {
      value: true,
      message: 'Nom requis'
    }
  },
  bio: {
    minLength: {
      value: 1,
      message: "Taille min: 1"
    },
    maxLength: {
      value: 1000,
      message: "Taille max: 1000"
    },
  }
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
  const { token, isCompletingAccount } = useStore((state) => state.authStore)
  const changeIsCompletingAccount = useStore((state) => state.changeIsCompletingAccount)
  const addAlert = useStore((state) => state.addAlert)
  const setUser = useStore((state) => state.setUser)
  const openModal = useStore((state) => state.openModal)
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
  const [inputSelected, setInputSelected] = useState<boolean>(false)
  const [disableInput, setDisableInput] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Partial<User>>({
    defaultValues: profileSettings.user
  })
  const navigate = useNavigate()
  const onClose = () => {
    setInputSelected(false)
    setInputPositionsList([])
  }
  const ref = useCloseRef({useEscape: false, onClose})

  useEffect(() => {
    const getPos = async () => {
      const lat = profileSettings.user.latitude
      const lon = profileSettings.user.longitude
      const displayName = profileSettings.user.position_name
      setPositionSelected({
        displayName,
        latitude: lat,
        longitude: lon
      })
      setInputPosition(displayName)
    }
    getPos()
  }, [])

  const onChipClick = (chip: Tags, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChips(prev => [...prev.filter(c => c.id !== chip.id)])
    } else {
      setSelectedChips(prev => [...prev, chip])
    }
  }

  const onSubmit = async (values: Partial<User>) => {
    setDisableInput(true)
    const formData = new FormData()

    for (const [key, value] of Object.entries(values)) {
      if (value && key !== 'tags' && key !== 'images' && key !== 'fame_rating' && key !== 'latitude' && key !== 'longitude' && key !== 'position_name') {
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
      formData.append('longitude', positionSelected.longitude.toString())
      formData.append('latitude', positionSelected.latitude.toString())
      formData.append('position_name', positionSelected.displayName)
    }

    const resIp = await makeIpAddressRequest()
    const retUser = await makeSettingsRequest(
      {
        data: formData,
        token,
        addAlert,
        ip: resIp?.ip
      }
    )

    if (retUser?.user) {
      const { user } = retUser
      addAlert({ message: 'Votre profile a ete update', type: AlertTypeEnum.SUCCESS })
      setUser(user)
      setDisableInput(false)
      if (isCompletingAccount && isUserProfileComplete(user)) {
        changeIsCompletingAccount(false)
        navigate("/")
      }
    } else {
      setDisableInput(false)
    }
  }

  const checkFileNameExist = (file) => {
    const exist = profilesImages.find(p => p.file_name === file.name)
    if (exist) {
      addAlert({
        message: `L'image "${file.name}" existe deja`, type: AlertTypeEnum.ERROR
      })
      return true
    }
  }

  const onSingleUpload = (event: any) => {
    const [file] = event.target.files
    if (file) {
      if (checkFileNameExist(file)) return
      setProfilPicturePreview(URL.createObjectURL(file))
      setProfilesImages(prev => [...prev, { file, is_profile_picture: true, file_name: file.name }])
    }
  }

  const onMultipleUpload = (event: any) => {
    const imagesWithoutProfilePic = profilesImages?.filter(i => !i.is_profile_picture)
    const imagesLength = imagesWithoutProfilePic?.length
    if (imagesLength === 4) {
      console.error('Max images Uploaded: ', imagesLength)
      return
    }
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
      if (checkFileNameExist(files[i])) return
      if (i + imagesLength >= 4) {
        break
      }
      setProfilesImages(prev => [...prev, { file: files[i], file_name: files[i].name, preview: URL.createObjectURL(files[i]), is_profile_picture: false }])
    }
  }

  const onImageDelete = ({ file_name, isProfilePicture = false }: { file_name?: string, isProfilePicture?: boolean }) => {
    const newArray = [...profilesImages]
    const index = isProfilePicture ? newArray.findIndex(e => e.is_profile_picture) : newArray.findIndex(e => e.file_name === file_name)
    if (index < 0) {
      addAlert({
        message: 'Erreur pendant la supression de l\'image', type: AlertTypeEnum.ERROR
      })
      return
    }
    if (isProfilePicture) {
      setProfilPicturePreview(null)
    }
    newArray.splice(index, 1)
    setProfilesImages([...newArray])
  }

  const onPositionClick = (value: PositionType) => {
    setInputPosition(value.displayName)
    setPositionSelected(value)
    setInputPositionsList([])
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputPosition(value)
  }

  useEffect(() => {
    if (!inputSelected) return
    const timeoutId = setTimeout(async () => {
      if (inputPosition.trim() === "" || inputPosition.trim().length < 2) {
        setInputPositionsList([])
        return
      }
      const ret: any = await makePositionRequest({ city: inputPosition })
      if (ret && Array.isArray(ret)) {
        const positionParsed = ret.map(p => {
          const splitName: string[] = p.display_name?.split(',')
          const name = splitName.length > 1 ? `${splitName[0]}-${splitName[splitName.length - 1]}` : splitName.length === 1 ? splitName[0] : ""
          return {...p, display_name: name}
        })
        const uniquePosition = Array.from(
          new Map(positionParsed.map(item => [item.display_name, item])).values()
        )
        setInputPositionsList(uniquePosition.map(p => ({ displayName: p.display_name, latitude: p.lat, longitude: p.lon }) ))
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [inputPosition])

  const onClearPosition = () => {
    setPositionSelected(undefined)
    setInputPosition('')
  }

  const onDeleteAccount = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    openModal({ modalKey: 'deleteAccount' })
  }
  return (
    <div className={css(slotsStyles.settingsContainer)}>
      <h2 className={css(slotsStyles.title)}> Completez votre profil </h2>
      <form className={css(slotsStyles.settingsWrapper)} onSubmit={handleSubmit(onSubmit)}>
        <div className={css(slotsStyles.rowInputs)}>
          <label htmlFor="last_name">
            Nom*:
            <input id="last_name" type='text' {...register('last_name', INPUT_OPTIONS.last_name)} />
            {errors?.last_name?.message && <span className={css(slotsStyles.inputError)}>{errors?.last_name?.message.toString()}</span>}
          </label>
          <label htmlFor="first_name">
            Prenom*:
            <input id="first_name" type='text' {...register('first_name', INPUT_OPTIONS.first_name)} />
            {errors?.first_name?.message && <span className={css(slotsStyles.inputError)}>{errors?.first_name?.message.toString()}</span>}
          </label>
        </div>
        <label htmlFor="username">
          Username*:
          <input id="username" type='text' disabled {...register('username')} />
        </label>
        <label htmlFor="email">
          Email*:
          <input id="email" type='text' disabled {...register('email')} />
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
          <textarea className={css(slotsStyles.textAreaInput)} {...register('bio', INPUT_OPTIONS.bio)} name="bio" ></textarea>{errors?.bio?.message && <span className={css(slotsStyles.inputError)}>{errors?.bio?.message.toString()}</span>}
        </label>
        <label className={css(slotsStyles.positionContainer)} ref={ref as any} onClick={() => setInputSelected(true)}>
          Position:
          <input type='text' onChange={handleChange} value={inputPosition} />
          {
            inputPositionsList.length > 0 && (
              <div className={css(slotsStyles.positionListContainer)}>
                {
                  inputPositionsList.map((position, index) =>
                    <span
                      key={index}
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
          {
            positionSelected &&
            <div className={css(slotsStyles.uploadButton, slotsStyles.imageResetButton)} onClick={onClearPosition}>
              <IoClose />
            </div>
          }
        </label>
        <label>
          Centre d'interets:
          <ChipSelect chips={profileSettings.tags} selectedChips={selectedChips} onChipClick={onChipClick} disableForm={false} />
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
              <input type="file" accept="image/*" id="profile-picture" hidden onChange={onSingleUpload} />
              <FaUpload />
            </label>
          }
          {
            profilePicturePreview &&
            <div className={css(slotsStyles.uploadButton, slotsStyles.imageResetButton)} onClick={() => onImageDelete({ isProfilePicture: true })}>
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
              profilesImages.map(({ preview, is_profile_picture, file_name }, index) => preview && !is_profile_picture ? (
                <div key={index} className={css(slotsStyles.picturesItemContainer)}>
                  <div className={css(slotsStyles.picturesItem)}>
                    <img src={preview} alt='' />
                  </div>
                  <div className={css(slotsStyles.uploadButton, slotsStyles.imageResetButton)}>
                    <IoClose onClick={() => onImageDelete({ file_name })} />
                  </div>
                </div>
              ) : null)
            }
          </div>
        }
        <label>
          <input
            type="file"
            id="photos"
            multiple
            accept="image/*"
            hidden
            onChange={onMultipleUpload}
          />
          <div className={css(slotsStyles.filesUploadContainer)}>
            <FaUpload />
            <span> Upload </span>
          </div>
        </label>
        <span className={css(slotsStyles.textInfo)}>* Champs requis pour que votre compte soit valide</span>
        <button type="submit" className={css(slotsStyles.button)} disabled={disableInput}> Sauvegarder </button>
      </form>
      <button onClick={onDeleteAccount} className={cx(css(slotsStyles.button, slotsStyles.deleteButton))}>Supprimer compte</button>
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
  const navigate = useNavigate()

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!profileSettings) {
    navigate("/404")
  }
  return <Settings profileSettings={profileSettings} />
}

export default ScreenSettings