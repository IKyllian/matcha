import { User, USERS } from "./user";

export type ChatSidebarType = {
    id: number;
    user1: User;
    user2: User;
    lastMessage: string;
    last_send_at: string;
    unreadNumber?: number;
}

export type MessageType = {
    id: number;
    senderId: number;
    message: string;
    createdAt: Date;
}

export type ChatType = {
    id: number;
    participants: User[];
    messages: MessageType[];
}

export const CHAT_SIDEBAR: ChatSidebarType[] = [
    {
        id: 1,
        user1: USERS[0],
        user2: USERS[1],
        lastMessage: 'Salut comment ça va?',
        last_send_at: 'hier',
    },
    {
        id: 2,
        user1: USERS[0],
        user2: USERS[2],
        lastMessage: 'Je suis content!',
        unreadNumber: 3,
        last_send_at: '12h00',
    },
    {
        id: 3,
        user1: USERS[0],
        user2: USERS[2],
        lastMessage: 'Je suis content!',
        last_send_at: 'Mardi',
    }
]

export const CHAT_DATA: ChatType[] = [
    {
        id: 1,
        participants: [
            USERS[0],
            USERS[1]
        ],
        messages: [
            {
                id: 1,
                senderId: 1,
                message: 'Salut',
                createdAt: new Date(),
            },
            {
                id: 2,
                senderId: 1,
                message: 'Comment ça va?',
                createdAt: new Date(),
            },
            {
                id: 3,
                senderId: 2,
                message: 'Hello !',
                createdAt: new Date(),
            },
            {
                id: 4,
                senderId: 2,
                message: 'Bien et toi?',
                createdAt: new Date(),
            }
        ]
    },
    {
        id: 2,
        participants: [
            USERS[0],
            USERS[2]
        ],
        messages: []
    },
    {
        id: 3,
        participants: [
            USERS[1],
            USERS[2]
        ],
        messages: []
    }
] 