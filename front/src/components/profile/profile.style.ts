import { sva } from "styled-system/css";

export const profileStyle = sva({
    slots: ['profileContainer', 'profilInfosContainer', 'profileName', 'profilContent', 'profileImg', 'flexContainer', 'profilButtonContainer'],
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
            gap: '8px',
            flex: '1'
        },
        profileName: {
            fontSize: '24px',
            fontWeight: '500'
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
        }
    }
})