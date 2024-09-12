import { sva } from "styled-system/css";

export const buttonStyle = sva({
    slots: ['likeButtonContainer', 'likeIcon'],
    base: {
        likeButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40px',
            width: '40px',
            borderRadius: '10px',
            border: '2px solid black',
            boxShadow: '1.5px 1.5px 0 black',
            cursor: 'pointer',
        },
        likeIcon: {
            color: 'darkPink',
        }
    }
})