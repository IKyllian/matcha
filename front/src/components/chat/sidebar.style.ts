import { sva } from "styled-system/css";

export const sidebarStyle = sva({
    slots: ['sidebarContainer', 'sidebarItemContainer', 'img', 'messageContentWrapper', 'unreadNumber', 'itemRightSide'],
    base: {
        sidebarContainer: {
            height: 'calc(100vh - 70px)',
            width: '350px',
            borderRight: '2px solid black',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px',
            overflowY: 'scroll',
        },
        sidebarItemContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#ffcfbb',
            }
        },
        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        messageContentWrapper: {
            display: 'flex',
            flexDir: 'column',
            gap: '4px',
            flex: 1,
            paddingLeft: '10px',
        },
        unreadNumber: {
            width: '25px',
            height: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            backgroundColor: 'buttonPrimaryBackground',
            color: 'black',
            fontSize: '14px',
            fontWeight: '600',
        },
        itemRightSide: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
        }
    }
})