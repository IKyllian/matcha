import { sva } from "styled-system/css";

export const settingsStyle = sva({
    slots: [
        'title',
        'settingsContainer',
        'settingsWrapper',
        'radioInput',
        'radioLabel',
        'radioWrapper',
        'textAreaInput',
        'button',
        'uploadButton',
        'profilPicturePreview',
        'profilPictureContainer'
    ],
    base: {
        settingsContainer: {
            width: '80%',
            // minHeight: 'calc(100vh - 70px)',
            margin: 'auto',
            padding: '24px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
        },
        title: {
            fontWeight: 'bold',
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '12px'
        },
        settingsWrapper: {
            height: 'fit-content',
            display: 'flex',
            flexDir: 'column',
            gap: '16px',
            '& > label': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '8px',
            }
        },
        radioWrapper: {
            display: 'flex',
            gap: '8px',
        },
        radioLabel: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '4px',
            fontSize: '16px'
        },
        radioInput: {
            width: 'fit-content'
        },
        textAreaInput: {
            border: '2px solid black',
            padding: '8px'
        },
        button: {
            width: '300px',
            height: '50px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            backgroundColor: 'buttonPrimaryBackground',
            borderRadius: '7px',
            fontWeight: '500',
            fontSize: '20px',
            margin: '12px auto 0 auto',
            _active: {
                boxShadow: 'none',
            }
        },
        uploadButton: {
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            "& > svg": {
                margin: 'auto'
            },
        },
        profilPicturePreview: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid black',
            "& > img": {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
            }
        },
        profilPictureContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: 'fit-content'
        }
    }
})