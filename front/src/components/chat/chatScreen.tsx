import Sidebar from "front/components/chat/sidebar"
import Chat from "front/components/chat/chat"
import { chatScreenStyle } from "./chatScreen.style"
import { css } from "styled-system/css"
import { useParams } from "react-router-dom"

const ChatScreen = () => {
    const slotsStyles = chatScreenStyle.raw()
    const { chatId } = useParams<{ chatId?: string }>()
    return (
        <div className={css(slotsStyles.chatScreenContainer)}>
            <Sidebar />
            {
                chatId &&
                <Chat chatId={+chatId} />
            }
        </div>
    )
}

export default ChatScreen