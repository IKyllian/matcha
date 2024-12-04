import { sva } from "styled-system/css";

export const chatStyle = sva({
    slots: ['chatContainer', 'chatWrapper', 'chatHeader', 'img', 'messagesContainer', 'messageItem', 'recipient', 'sender', 'chatFormContainer', 'sendButtonContainer', 'dateMessage'],
    base: {
        chatContainer: {
            borderLeft: 'none',
            flex: 1,
            padding: '24px',
            height: 'calc(100vh - 70px)',
        },
        chatWrapper: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'space-between',
            borderRadius: '20px',
            height: '100%',
            border: '2px solid black',
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
        },
        messageItem: {
            padding: '12px',
            backgroundColor: 'secondaryBackground',
            borderRadius: '10px',
            maxWidth: '95%',
            wordWrap: 'break-word',
            position: 'relative',
        },
        recipient: {
            alignSelf: 'flex-start',
            backgroundColor: '#f8d6b3'
        },
        sender: {
            alignSelf: 'flex-end',
            backgroundColor: '#cffce3'
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
            fontSize: '13px'
        }
    }
})