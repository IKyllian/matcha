import { User } from "./user";

export type ChatSidebarType = {
    id: number;
    user: Partial<User>;
    liked_user: Partial<User>;
    last_message: string;
    last_send_at: string;
    unreadNumber?: number;
}

export type MessageType = {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
}

export type ChatType = {
    id: number;
    chatter: User;
    messages: MessageType[];
}