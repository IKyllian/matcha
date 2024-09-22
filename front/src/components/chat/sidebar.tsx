import { USERS } from "front/typing/user"
import { sidebarStyle } from "./sidebar.style"
import { css } from "styled-system/css"

const CHAT = [
    {
        id: 0,
        user1: USERS[0],
        user2: USERS[1],
        lastMessage: 'Salut comment ça va?',
        last_send_at: 'hier',
    },
    {
        id: 1,
        user1: USERS[0],
        user2: USERS[2],
        lastMessage: 'Je suis content!',
        unreadNumber: 3,
        last_send_at: '12h00',
    },
    {
        id: 2,
        user1: USERS[0],
        user2: USERS[2],
        lastMessage: 'Je suis content!',
        last_send_at: 'Mardi',
    }
]
const Sidebar = () => {
    const slotsStyles = sidebarStyle.raw()
    return (
        <div className={css(slotsStyles.sidebarContainer)}>
            {
                CHAT.map((chat) => (
                    <div key={chat.id} className={css(slotsStyles.sidebarItemContainer)}>
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