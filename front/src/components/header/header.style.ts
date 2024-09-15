import { sva } from "styled-system/css";

export const headerStyle = sva({
    slots: ['headerContainer', 'headerLogo', 'headerAvatar', 'headerContentWrapper', 'logoutIcon', 'logoutWrapper', 'divider'],
    base: {
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
        },
        headerContentWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            '& > a': {
                fontSize: '15px',
                fontWeight: '800',
            }
        },
        headerLogo: {
            fontSize: '20px',
            textTransform: 'uppercase',
            fontWeight: '800',
            cursor: 'pointer',
        },
        headerAvatar: {
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            cursor: 'pointer',
            border: '2px solid black',
            overflow: 'hidden',
            "& > img": {
                width: '100%',
                height: '100%',
            }
        },
        logoutWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            backgroundColor: '#f38d8d',
            border: '2px solid black',
            borderRadius: '10px',
            cursor: 'pointer',
            height: '40px',
            '&:hover': {
                boxShadow: '1px 1px 0 black',
                transition: 'box-shadow 0.3s',
            }
        },
        logoutIcon: {
            color: 'red',
        },
        divider: {
            height: '30px',
            width: '2px',
            backgroundColor: 'black',
        }
    }
})