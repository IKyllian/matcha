import { sva } from "styled-system/css";

export const chipSelectStyle = sva({
    slots: ['chipContainer', 'boxContainer', 'inputChip', 'selectContainer', 'divider'],
    base: {
        selectContainer: {
            display: 'flex',
            flexDir: 'column',
            gap: '8px',
            border: '2px solid black',
            padding: '8px',
            borderRadius: '7px'
        },
        chipContainer: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            overflowY: 'scroll',
            height: '100px',
            padding: '12px 4px'
        },
        inputChip: {
            padding: '8px 24px',
            borderRadius: '14px',
            cursor: 'pointer',
        },
        divider: {
            width: '100%',
            height: '2px',
            backgroundColor: 'black'
        },
    }
})