import { sva } from "styled-system/css";

export const chipsStyle = sva({
    slots: ['chipsContainer', 'chip'],
    base: {
        chipsContainer: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
        },
        chip: {
            padding: '2px 10px',
            borderRadius: '8px',
            border: '1px solid black',
            fontSize: '11px',
            fontWeight: 'bold',
            backgroundColor: '#f8d6b3'
        },
    }
})