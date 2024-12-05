import { sva } from "styled-system/css";

export const profileStyle = sva({
    slots: [
        'profileContainer',
        'profilInfosContainer',
        'userInfoContainer',
        'profileName',
        'profilContent',
        'profileWrapper',
        'profileImg',
        'flexContainer',
        'profilButtonContainer',
        'starsContainer',
        'lastConnectionText',
        'profileStatus'
    ],
    base: {
        profileContainer: {
            padding: '24px'
        },
        profilInfosContainer: {
            display: 'flex',
            gap: '16px',
            border: '2px solid black',
            boxShadow: '3px 3px 0 black',
            borderRadius: '10px',
            backgroundColor: 'secondaryBackground',
            padding: '16px'
        },
        profilContent: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'space-between',
            gap: '8px',
            flex: '1'
        },
        profileWrapper: {
            display: 'flex',
            flexDir: 'column',
            gap: '8px',
            flex: '1'
        },
        profileName: {
            fontSize: '24px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center'
        },
        profileImg: {
            width: '300px',
            height: '300px',
            borderRadius: '10px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
        },
        flexContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        profilButtonContainer: {
            display: 'flex',
            gap: '8px'
        },
        starsContainer: {
            display: 'flex',
        },
        userInfoContainer: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
        },
        lastConnectionText: {
            fontSize: '12px'
        },
        profileStatus: {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            '&[data-isonline="0"]': {
                backgroundColor: 'lightRed',
            },
            '&[data-isonline="1"]': {
                backgroundColor: '#7FBC8C',
            }
        }
    }
})