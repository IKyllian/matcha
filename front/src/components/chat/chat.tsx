import { USERS } from "front/typing/user"
import { IoSend } from "react-icons/io5";
import { chatStyle } from "./chat.style";
import { css } from "styled-system/css";
import { AiOutlineSend } from "react-icons/ai";

const CHAT = {
    participants: [
        USERS[0],
        USERS[1]
    ],
    messages: [
        {
            id: 1,
            senderId: 1,
            text: 'Salut',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            senderId: 1,
            text: 'Comment ça va?',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            senderId: 2,
            text: 'Hello !',
            createdAt: new Date().toISOString(),
        },
        {
            id: 4,
            senderId: 2,
            text: 'Bien et toi?',
            createdAt: new Date().toISOString(),
        }
    ]
}
const Chat = () => {
    const slotsStyles = chatStyle.raw()
    const recipientId = 2
    const recipient = CHAT.participants.find(participant => participant.id === recipientId)
    return (
        <div className={css(slotsStyles.chatContainer)}>
            <div className={css(slotsStyles.chatWrapper)}>
                <div className={css(slotsStyles.chatHeader)}>
                    <img src={recipient.img} className={css(slotsStyles.img)} />
                    <p> {recipient.firstName} {recipient.lastname} </p>
                </div>
                <div className={css(slotsStyles.messagesContainer)}>
                    {
                        CHAT.messages.map((message) => {
                            return (
                                <div
                                    key={message.id}
                                    className={css(
                                        slotsStyles.messageItem,
                                        message.senderId === recipientId ? slotsStyles.recipient : slotsStyles.sender
                                    )}
                                >
                                    <p>{message.text}</p>
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