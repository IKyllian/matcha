import { sidebarStyle } from "./sidebar.style"
import { css } from "styled-system/css"
import { ChatSidebarType } from "front/typing/chat"
import { useApi } from "front/hook/useApi"
import { useNavigate } from "react-router-dom"
import { useStore } from "front/store/socketMidlleware.store"

const Sidebar = () => {
    const slotsStyles = sidebarStyle.raw()
    const setChatSidebar = useStore(state => state.setChatSidebar)
    const chatSidebar = useStore(state => state.chatSidebar)
    const { isLoading } = useApi<ChatSidebarType[]>({ endpoint: "sidebar", setter: setChatSidebar })
    const navigate = useNavigate()

    const handleClick = (id: number) => {
        navigate(`/chat/${id}`)
    }
    if (isLoading) {
        return "Loading..."
    }
    if (!chatSidebar) {
        return "No message yet"
    }
    return (
        <div className={css(slotsStyles.sidebarContainer)}>
            {
                chatSidebar.map((chat) => (
                    <div key={chat.id} className={css(slotsStyles.sidebarItemContainer)} onClick={() => handleClick(chat.id)}>
                        <img src={chat.user2.img} className={css(slotsStyles.img)} />
                        <div className={css(slotsStyles.messageContentWrapper)}>
                            <p> {chat.user2.username} </p>
                            <p> {chat.lastMessage} </p>
                        </div>
                        <div className={css(slotsStyles.itemRightSide)}>
                            {chat.unreadNumber && <div className={css(slotsStyles.unreadNumber)}> {chat.unreadNumber} </div>}
                            <p> {chat.last_send_at} </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Sidebar