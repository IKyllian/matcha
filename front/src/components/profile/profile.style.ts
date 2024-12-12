import { sva } from "styled-system/css";

export const profileStyle = sva({
    slots: [
        'profileContainer',
        'wrapper',
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
        'likeStatusText',
        'profileStatus',
        'iconsWrapperDesktop',
        'iconsWrapperMobile'
    ],
    base: {
        profileContainer: {
            padding: '24px',
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        wrapper: {
            width: '100%',
            xl: {
                width: '80%',
            }
        },
        profilInfosContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            border: '2px solid black',
            boxShadow: '3px 3px 0 black',
            borderRadius: '10px',
            backgroundColor: 'secondaryBackground',
            padding: '16px',
            flexWrap: 'wrap',
            mdDown: {
                flexDirection: 'column',
                alignItems: 'center'
            },
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
            smDown: {
                width: '200px',
                height: '200px'
            }
        },
        flexContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            mdDown: {
                flexDirection: 'column',
                alignItems: 'baseline'
            }
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
            gap: '8px',
            flexWrap: 'wrap',
        },
        lastConnectionText: {
            fontSize: '12px'
        },
        likeStatusText: {
            fontSize: '12px',
            color: "green"
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
        },
        iconsWrapperDesktop: {
            display: 'block',
            mdDown: {
                display: 'none'
            }
        },
        iconsWrapperMobile: {
            display: 'none',
            mdDown: {
                display: 'block'
            }
        },
    }
})