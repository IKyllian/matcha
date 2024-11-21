import { sva } from "styled-system/css";

export const searchTagStyle = sva({
    slots: ['searchTagContainer', 'tagInput', 'icon'],
    base: {
        searchTagContainer: {
            position: 'relative'
        },
        tagInput: {
            border: '2px solid black',
            borderRadius: '15px',
            width: '100%',
            padding: '4px 6px'
        },
        icon: {
            position: 'absolute',
            right: '15px',
            top: '10px'
        }
    }
})