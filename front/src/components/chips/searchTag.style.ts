import { sva } from "styled-system/css";

export const searchTagStyle = sva({
    slots: ['searchTagContainer', 'tagInput', 'icon'],
    base: {
        searchTagContainer: {
            position: 'relative',
            padding: '8px',
            borderBottom: '2px solid black'
        },
        tagInput: {
            border: '2px solid black',
            borderRadius: '15px',
            width: '100%',
            padding: '4px 6px 4px 35px'
        },
        icon: {
            position: 'absolute',
            left: '20px',
            top: '19px'
        }
    }
})