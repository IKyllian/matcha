import { chatStyle } from "./chat.style";
import { css } from "styled-system/css";
import { AiOutlineSend } from "react-icons/ai";
import { useApi } from "front/hook/useApi";
import { ChatType } from "front/typing/chat";
import { useStore } from "front/store/store";
import { useForm } from "react-hook-form";
import ProfilePicture from "front/components/utils/profilePicture"
import { getMessageDateString } from "front/utils/chat";
import { Link } from "react-router-dom";
import { useEffect, useRef } from 'react';
import Loader from "../utils/loader";

type ChatProps = {
    chatId: number;
}

type FormValues = {
    message: string;
}

const OPTIONS = {
    minLength: {
        value: 1,
        message: "Taille min: 1"
    },
    maxLength: {
        value: 500,
        message: "Taille max: 500"
    },
    required: {
        value: true,
        message: 'Le champs ne doit pas etre vide'
    }
}

const Chat = ({ chatId }: ChatProps) => {
    const slotsStyles = chatStyle.raw()
    const chat = useStore(state => state.chat)
    const { user } = useStore(state => state.authStore)
    const setChat = useStore(state => state.setChat)
    const sendMessage = useStore(state => state.sendMessage)
    const updateSidebarMessage = useStore(state => state.updateSidebarMessage)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>()
    const { isLoading } = useApi<ChatType>({ endpoint: "chat", dependencies: [chatId], params: { id: chatId }, setter: setChat })
    const recipient = chat?.chatter

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messagesContainerRef.current && !isLoading) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chat?.messages, chatId, isLoading]);

    const onSubmit = (data: FormValues) => {
        if (user) {
            sendMessage({
                receiver_id: chatId,
                sender_id: user.id,
                message: data.message,
            })
            updateSidebarMessage({ message: data.message, chatId })
            setValue('message', '')
        }
    }

    console.info("chat = ", chat)

    return (
        <Loader isLoading={isLoading} data={chat} shouldDisplay404>
            <div className={css(slotsStyles.chatContainer)}>
                <div className={css(slotsStyles.chatWrapper)}>
                    <Link to={`/profile/${recipient?.id}`} className={css(slotsStyles.chatHeader)}>
                        <ProfilePicture className={slotsStyles.img} width="40px" height="40px" userImages={recipient?.images} />
                        <p> {recipient?.first_name} {recipient?.last_name} </p>
                    </Link>
                    <div ref={messagesContainerRef} className={css(slotsStyles.messagesContainer)}>
                        {
                            chat?.messages.map((message) => {
                                return (
                                    <div
                                        key={message.id}
                                        className={css(
                                            slotsStyles.messageItem,
                                            message.sender_id === recipient?.id ? slotsStyles.recipient : slotsStyles.sender
                                        )}
                                    >
                                        <p>{message.message}</p>
                                        <span className={css(slotsStyles.dateMessage)}>{getMessageDateString(message.created_at)}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <form className={css(slotsStyles.chatFormContainer)} onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' {...register('message', OPTIONS)} name="message" />
                        <button type="submit" className={css(slotsStyles.sendButtonContainer)}>
                            <AiOutlineSend />
                        </button>
                    </form>
                </div>
            </div>
        </Loader>
    )
}

export default Chat