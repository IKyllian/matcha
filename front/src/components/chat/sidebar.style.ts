import { sva } from "styled-system/css";

export const sidebarStyle = sva({
    slots: ['sidebarContainer', 'sidebarItemContainer', 'img', 'messageContentWrapper', 'unreadNumber', 'itemRightSide', 'sentDate', 'messageSender', 'lastMessage'],
    base: {
        sidebarContainer: {
            height: 'calc(100vh - 70px)',
            width: '320px',
            borderRight: '2px solid black',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px',
            overflowY: 'scroll',
            backgroundColor: 'primaryBackground',
            zIndex: '2',
            '&[data-isopen="0"]': {
                width: '70px',
                minWidth: '70px',
            },
            smDown: {
                '&[data-isopen="0"]': {
                    display: 'none'
                },
            },
            mdDown: {
                height: '100vh',
                '&[data-isopen="1"]': {
                    width: '250px',
                    position: 'absolute',
                    top: 0,
                }
            },
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        sidebarItemContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '10px',
            _hover: {
                backgroundColor: '#ffcfbb',
            },
            '&[data-isopen="0"]': {
                padding: 0
            },
        },
        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            '&[data-isopen="0"]': {
                width: '35px',
                height: '35px',
            },
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
        },
        sentDate: {
            fontSize: '12px',
            fontWeight: 'light',
        },
        messageSender: {
            fontWeight: 'bold',
        },
        lastMessage: {
            fontWeight: 'light',
        }
    }
})