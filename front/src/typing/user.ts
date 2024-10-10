import Image from 'front/assets/images/Panda.jpeg'

export type User = {
    id: number;
    img?: any;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    location: string;
    description: string;
    age: number;
    interests: string[];
    pictures: any[];
}

export const USERS: User[] = [
    {
        id: 1,
        img: Image,
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        location: 'Paris, France',
        password: 'weqweqweqwe',
        email: 'qwe@gmail.com',
        age: 25,
        interests: [
            'musique',
            'gaming',
            'tech',
            'lecture',
            'voyage'
        ],
        pictures: [
            Image,
            Image,
            Image,
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    },
    {
        id: 2,
        img: Image,
        firstname: 'Jane',
        lastname: 'Smith',
        username: 'janesmith',
        email: 'qwe@gmail.com',
        location: 'New York, USA',
        password: 'weqweqweqwe',
        age: 30,
        interests: [
            'musique',
            'gaming',
            'tech',
            'lecture',
            'voyage'
        ],
        pictures: [
            Image,
            Image,
            Image,
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    },
    {
        id: 3,
        img: Image,
        firstname: 'Alice',
        lastname: 'Williams',
        email: 'qwe@gmail.com',
        username: 'aliciawilliams',
        location: 'Tokyo, Japan',
        password: 'weqweqweqwe',
        age: 28,
        interests: [
            'musique',
            'gaming',
            'tech',
            'lecture',
            'voyage'
        ],
        pictures: [
            Image,
            Image,
            Image,
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique, nisl quis lobortis fermentum, elit tellus varius nisl, sed ullamcorper ex lacus ut ex. Nulla eleifend bibendum tellus interdum sagittis. Suspendisse ac lacus sit amet mauris dapibus fringilla. Proin ut semper elit. Nam vel nisi lacus. Sed scelerisque maximus dui nec vulputate'
    }
]


export type Image = {
    id: number
    image_file: string
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
    tags?: { id: number, tag_name: string }
}