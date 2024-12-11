import { sidebarStyle } from "./sidebar.style"
import { css } from "styled-system/css"
import { ChatSidebarType } from "front/typing/chat"
import { useApi } from "front/hook/useApi"
import { useNavigate } from "react-router-dom"
import { useStore } from "front/store/store"
import ProfilePicture from "front/components/utils/profilePicture"
import { getLightMessageDateString } from "front/utils/chat"

type SidebarProps = {
    isOpen: boolean
}
const Sidebar = ({ isOpen }: SidebarProps) => {
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
        <div className={css(slotsStyles.sidebarContainer)} data-isopen={+isOpen}>
            {!isLoading && chatSidebar?.length === 0 && (
                <span>Pas de conversation pour le moment</span>
            )}
            {
                !isLoading && chatSidebar?.length > 0 && (
                    chatSidebar.map((chat) => (
                        <div key={chat.liked_user.id} className={css(slotsStyles.sidebarItemContainer)} data-isopen={+isOpen} onClick={() => handleClick(chat.liked_user.id)}>
                            <ProfilePicture className={slotsStyles.img} width="40px" height="40px" userImages={chat.liked_user.images} data-isopen={+isOpen} />
                            {
                                isOpen && (
                                    <>
                                        <div className={css(slotsStyles.messageContentWrapper)}>
                                            <p className={css(slotsStyles.messageSender)}>{chat.liked_user.username}</p>
                                            {chat.last_message && <p className={css(slotsStyles.lastMessage)}>{chat.last_message}</p>}
                                        </div>
                                        <div className={css(slotsStyles.itemRightSide)}>
                                            {chat.unreadNumber && <div className={css(slotsStyles.unreadNumber)}>{chat.unreadNumber}</div>}
                                            {chat.last_send_at && <p className={css(slotsStyles.sentDate)}>{getLightMessageDateString(chat.last_send_at)}</p>}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Sidebar