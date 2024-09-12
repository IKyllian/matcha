import { sva } from "styled-system/css";

export const profileStyle = sva({
    slots: ['profileContainer', 'profilInfosContainer', 'profilContent', 'profileImg'],
    base: {
        profileContainer: {
            padding: '24px'
        },
        profilInfosContainer: {
            display: 'flex',
            gap: '16px',
        },
        profilContent: {
            display: 'flex',
            flexDir: 'column',
            gap: '8px',
        },
        profileImg: {
            width: '300px',
            height: '300px',
            borderRadius: '10px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
        }
    }
})