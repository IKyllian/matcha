import Sidebar from "front/components/chat/sidebar"
import Chat from "front/components/chat/chat"
import { chatScreenStyle } from "./chatScreen.style"
import { css } from "styled-system/css"
import { useParams } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { useState } from "react"
import { useStore } from "front/store/store"

const ChatScreen = () => {
    const slotsStyles = chatScreenStyle.raw()
    const { chatId } = useParams<{ chatId?: string }>()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const chatSidebar = useStore(state => state.chatSidebar)

    const onArrowClick = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <div className={css(slotsStyles.chatScreenContainer)}>
            <Sidebar isOpen={isSidebarOpen} onCloseSidebar={() => setIsSidebarOpen(false)} />
            {
                chatSidebar?.length > 0 ? (
                    <>
                        <div className={css(slotsStyles.arrowContainer)} data-issidebaropen={+isSidebarOpen} onClick={onArrowClick}>
                            {isSidebarOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
                        </div>
                        {
                            chatId &&
                            <Chat chatId={+chatId} />
                        }
                    </>
                ) : (
                    <span>Pas de conversation pour le moment.</span>
                )
            }
        </div>
    )
}

export default ChatScreen