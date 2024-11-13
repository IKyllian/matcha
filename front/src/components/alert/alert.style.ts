import { sva } from "styled-system/css"

export const alertStyle = sva({
    slots: [
        'notifContainer',
        'iconWrapper',
        'notifWrapper',
        'closeIcon',
        'notifContentContainer',
        'notifError',
        'notifSuccess',
        'notifWarning',
        'iconError',
        'iconSuccess',
        'iconWarning',
        'notifExit',
        'notifEnter'
    ],
    base: {
        notifContainer: {
            position: 'fixed',
            zIndex: 30000,
            left: 0,
            right: 0,
            top: '80px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '60%',
        },
        iconWrapper: {
            width: '25px',
            height: '25px',
            '& > svg': {
                width: '25px',
                height: '25px',
                borderRadius: '50%'
            }
        },
        closeIcon: {
            width: '22px',
            height: '22px',
            cursor: 'pointer',
        },
        notifWrapper: {
            borderRadius: '40px',
            border: '2px solid black',
            boxShadow: '2px 2px 0 black',
            padding: '7px 11px',
            width: 'auto',
            maxWidth: '60%',
        },
        notifEnter: {
            animation: 'fadeIn 0.5s ease-out',
        },
        notifExit: {
            animation: 'fadeOut 0.5s ease-in',
        },
        notifContentContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            position: 'relative',
        },
        notifSuccess: {
            backgroundColor: 'successLight',
            color: 'successDark',
        },
        notifError: {
            backgroundColor: 'errorLight',
            color: 'errorDark',
        },
        notifWarning: {
            backgroundColor: 'warningLight',
            color: 'warningDark',
        },
        iconSuccess: {
            border: '2.5px solid successDark'
        },
        iconError: {
            border: '2.5px solid errorDark'
        },
        iconWarning: {
            border: '2.5px solid warningDark'
        },
    },
})