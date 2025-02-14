import { sva } from "styled-system/css";

export const chatStyle = sva({
    slots: ['chatContainer', 'chatWrapper', 'chatHeader', 'img', 'messagesContainer', 'messageItem', 'recipient', 'sender', 'chatFormContainer', 'sendButtonContainer', 'dateMessage', 'likeIcon', 'likedIcon', 'trashIcon'],
    base: {
        chatContainer: {
            borderLeft: 'none',
            flex: 1,
            padding: '24px',
            height: 'calc(100vh - 70px)',
            display: 'flex',
            justifyContent: 'center'
        },
        chatWrapper: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'space-between',
            borderRadius: '20px',
            height: '100%',
            border: '2px solid black',
            maxWidth: '1000px',
            width: '100%'
        },
        chatHeader: {
            borderBottom: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
        },
        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
        },
        messagesContainer: {
            padding: '8px',
            display: 'flex',
            flexDir: 'column',
            gap: '8px',
            flex: 1,
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        messageItem: {
            padding: '6px 10px',
            backgroundColor: 'secondaryBackground',
            borderRadius: '10px',
            maxWidth: '95%',
            wordWrap: 'break-word',
            position: 'relative',
            border: '2px solid black',
            fontSize: '16px',
            '&:hover .trashIcon, &:hover .likeIcon': {
                display: 'block'
            }
        },
        recipient: {
            alignSelf: 'flex-start',
            backgroundColor: '#f8d6b3'
        },
        sender: {
            alignSelf: 'flex-end',
            backgroundColor: '#ADDAFA',
        },
        chatFormContainer: {
            borderTop: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            '& input': {
                flex: 1,
                border: '2px solid black',
                padding: '8px',
                borderRadius: '10px',
                fontSize: '16px',
                '&:focus': {
                    outline: '2px solid buttonPrimaryBackground',
                }
            },

        },
        sendButtonContainer: {
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px',
            backgroundColor: 'buttonPrimaryBackground',
            border: '2px solid black',
            borderRadius: '50%',
        },
        dateMessage: {
            fontSize: '12px'
        },
        likeIcon: {
            position: 'absolute',
            bottom: '-5px',
            right: '-5px',
            width: '15px',
            height: '15px',
            display: 'none',
            color: '#ed05ab',
            cursor: 'pointer',
        },
        likedIcon: {
            position: 'absolute',
            bottom: '-5px',
            right: '-5px',
            width: '15px',
            height: '15px',
            color: '#ed05ab',
            cursor: 'pointer',
        },
        trashIcon: {
            position: 'absolute',
            bottom: '-5px',
            right: '-5px',
            width: '13px',
            height: '13px',
            color: 'red',
            cursor: 'pointer',
            display: 'none'
        }
    }
})