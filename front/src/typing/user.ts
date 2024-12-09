import Image from 'front/assets/images/panda2.webp'

export type User = {
    id: number
    img?: any
    password: string
    email: string
    first_name: string
    last_name: string
    username: string
    location: string
    bio: string
    age: number
    distance?: number
    fame_rating: number
    tags: Tags[]
    pictures: any[]
    gender?: 'M' | 'F'
    birth_date?: any
    sexual_preference?: 'M' | 'F' | 'B'
    images?: Image[]
    latitude: number
    longitude: number
    last_connection?: string
    is_connected: boolean
}

export type Tags = {
    id: number,
    tag_name: string
}

export type Image = {
    id: number
    image_file: string
    mime_type: string
    file_name: string
    is_profile_picture: boolean
    user_id: number
}

export type FormValuesSettings = {
    bio: string
    gender: 'male' | 'female',
    preference: 'male' | 'female' | 'bi',
    birth_date: any
}

export type ImageSettingsType = {
    file: any,
    is_profile_picture: boolean
    file_name: string
    preview?: string
}

export type SettingsDataType = Partial<User> & {
    images: Omit<ImageSettingsType, 'preview'>[]
}