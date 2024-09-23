import { chatStyle } from "./chat.style";
import { css } from "styled-system/css";
import { AiOutlineSend } from "react-icons/ai";
import { useApi } from "front/hook/useApi";
import { ChatType } from "front/typing/chat";
import { USERS } from "front/typing/user";
import { useChatStore } from "front/store/chat.store";

type ChatProps = {
    chatId: number;
}
const Chat = ({ chatId }: ChatProps) => {
    const slotsStyles = chatStyle.raw()
    const { setChat, chat } = useChatStore()
    const { isLoading } = useApi<ChatType>({ endpoint: "chat", dependencies: [chatId], params: { id: chatId }, setter: setChat })
    const userConnected = USERS[0]
    const recipient = chat?.participants.find(participant => participant.id !== userConnected.id)

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
                    <p> {recipient.firstName} {recipient.lastname} </p>
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
                <div className={css(slotsStyles.chatFormContainer)}>
                    <input type='text' />
                    <div className={css(slotsStyles.sendButtonContainer)}>
                        <AiOutlineSend />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat