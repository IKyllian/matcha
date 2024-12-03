import { sidebarStyle } from "./sidebar.style"
import { css } from "styled-system/css"
import { ChatSidebarType } from "front/typing/chat"
import { useApi } from "front/hook/useApi"
import { useNavigate } from "react-router-dom"
import { useStore } from "front/store/store"
import ProfilePicture from "front/components/utils/profilePicture"

type SidebarProps = {
}
const Sidebar = ({ }: SidebarProps) => {
    const slotsStyles = sidebarStyle.raw()
    const setChatSidebar = useStore(state => state.setChatSidebar)
    const chatSidebar = useStore(state => state.chatSidebar)
    const { isLoading } = useApi<ChatSidebarType[]>({ endpoint: "getChatList", setter: setChatSidebar })
    const navigate = useNavigate()

    const handleClick = (id: number) => {
        navigate(`/chat/${id}`)
    }
    if (isLoading) {
        return "Loading..."
    }
    return (
        <div className={css(slotsStyles.sidebarContainer)}>
            {!isLoading && chatSidebar.length === 0 && (
                <span>Pas de conversation pour le moment</span>
            )}
            {
                !isLoading && chatSidebar.length > 0 && (
                    chatSidebar.map((chat) => (
                        <div key={chat.liked_user.id} className={css(slotsStyles.sidebarItemContainer)} onClick={() => handleClick(chat.liked_user.id)}>
                            <ProfilePicture className={slotsStyles.img} width="40px" height="40px" userImages={chat.liked_user.images} />
                            <div className={css(slotsStyles.messageContentWrapper)}>
                                <p> {chat.liked_user.username} </p>
                                {chat.lastMessage && <p>{chat.lastMessage}</p>}
                            </div>
                            <div className={css(slotsStyles.itemRightSide)}>
                                {chat.unreadNumber && <div className={css(slotsStyles.unreadNumber)}> {chat.unreadNumber} </div>}
                                {chat.last_send_at && <p>{chat.last_send_at}</p>}
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Sidebar