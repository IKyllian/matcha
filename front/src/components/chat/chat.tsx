import { chatStyle } from "./chat.style";
import { css } from "styled-system/css";
import { AiOutlineSend } from "react-icons/ai";
import { useApi } from "front/hook/useApi";
import { ChatType } from "front/typing/chat";
import { USERS } from "front/typing/user";
import { useStore } from "front/store/store";
import { useForm } from "react-hook-form";

type ChatProps = {
    chatId: number;
}

type FormValues = {
    message: string;
}

const Chat = ({ chatId }: ChatProps) => {
    const slotsStyles = chatStyle.raw()
    const chat = useStore(state => state.chat)
    const { user } = useStore(state => state.authStore)
    const setChat = useStore(state => state.setChat)
    const sendMessage = useStore(state => state.sendMessage)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()
    const { isLoading } = useApi<ChatType>({ endpoint: "chat", dependencies: [chatId], params: { id: chatId }, setter: setChat })
    const userConnected = USERS[0]
    const recipient = chat?.participants.find(participant => participant.id !== userConnected.id)

    const onSubmit = (data: FormValues) => {
        if (user) {
            sendMessage({
                chatId,
                userId: user.id,
                message: data.message,
            })
        }

    }

    if (isLoading) {
        return <p>Chargement...</p>
    }
    if (!chat || !recipient) {
        return <p>Aucun message pour le moment.</p>
    }
    return (
        <div className={css(slotsStyles.chatContainer)}>
            <div className={css(slotsStyles.chatWrapper)}>
                <div className={css(slotsStyles.chatHeader)}>
                    <img src={recipient.img} className={css(slotsStyles.img)} />
                    <p> {recipient.firstname} {recipient.lastname} </p>
                </div>
                <div className={css(slotsStyles.messagesContainer)}>
                    {
                        chat.messages.map((message) => {
                            return (
                                <div
                                    key={message.id}
                                    className={css(
                                        slotsStyles.messageItem,
                                        message.senderId === recipient.id ? slotsStyles.recipient : slotsStyles.sender
                                    )}
                                >
                                    <p>{message.message}</p>
                                    <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <form className={css(slotsStyles.chatFormContainer)} onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' {...register('message')} name="message" />
                    <button type="submit" className={css(slotsStyles.sendButtonContainer)}>
                        <AiOutlineSend />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat