import { sva } from "styled-system/css";

export const chipSelectStyle = sva({
    slots: ['chipContainer', 'boxContainer', 'inputChip', 'selectContainer'],
    base: {
        selectContainer: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
        },
        chipContainer: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        inputChip: {
            padding: '8px 24px',
            borderRadius: '14px',
            cursor: 'pointer',
        }
    }
})