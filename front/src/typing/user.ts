import Image from 'front/assets/images/Panda.jpeg'

export type User = {
    id: number;
    img?: any;
    firstName: string;
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
        firstName: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        location: 'Paris, France',
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
        firstName: 'Jane',
        lastname: 'Smith',
        username: 'janesmith',
        location: 'New York, USA',
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
        firstName: 'Alice',
        lastname: 'Williams',
        username: 'aliciawilliams',
        location: 'Tokyo, Japan',
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