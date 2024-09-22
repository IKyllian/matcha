import Sidebar from "front/components/chat/sidebar"
import Chat from "front/components/chat/chat"
import { chatScreenStyle } from "./chatScreen.style"
import { css } from "styled-system/css"

const ChatScreen = () => {
    const slotsStyles = chatScreenStyle.raw()
    return (
        <div className={css(slotsStyles.chatScreenContainer)}>
            <Sidebar />
            <Chat />
        </div>
    )
}

export default ChatScreen