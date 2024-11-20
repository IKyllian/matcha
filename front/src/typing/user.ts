import Image from 'front/assets/images/panda2.webp'

export type User = {
    id: number;
    img?: any;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    location: string;
    bio: string;
    age: number;
    tags: Tags[];
    pictures: any[];
    gender?: 'M' | 'F'
    birth_date?: any
    sexual_preference?: 'M' | 'F' | 'B'
    images?: Image[]
    latitude: number
    longitude: number
}

export const USERS: User[] = [
    {
        id: 1,
        img: Image,
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        location: 'Paris, France',
        password: 'weqweqweqwe',
        email: 'qwe@gmail.com',
        age: 25,
        tags: [],
        latitude: 1,
        longitude: 1,
        pictures: [
            Image,
            Image,
            Image,
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    },
    {
        id: 2,
        img: Image,
        first_name: 'Jane',
        last_name: 'Smith',
        username: 'janesmith',
        email: 'qwe@gmail.com',
        location: 'New York, USA',
        password: 'weqweqweqwe',
        age: 30,
        tags: [],
        latitude: 1,
        longitude: 1,
        pictures: [
            Image,
            Image,
            Image,
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    },
    {
        id: 3,
        img: Image,
        first_name: 'Alice',
        last_name: 'Williams',
        email: 'qwe@gmail.com',
        username: 'aliciawilliams',
        location: 'Tokyo, Japan',
        password: 'weqweqweqwe',
        age: 28,
        latitude: 1,
        longitude: 1,
        tags: [],
        pictures: [
            Image,
            Image,
            Image,
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    }
]


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

export type User2 = {
    id: number;
    username: string
    pass: string
    email: string
    first_name: string
    last_name: string
    age?: number;
    gender?: 'M' | 'F'
    sexual_preference?: 'M' | 'F' | 'B'
    bio?: string
    profile_picture?: string
    images?: Image[]
    tags?: Tags[]
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
    file_name?: string
    preview?: string
}

export type SettingsDataType = Partial<User> & {
    images: Omit<ImageSettingsType, 'preview'>[]
}