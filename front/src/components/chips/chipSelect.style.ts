import { sva } from "styled-system/css";

export const chipSelectStyle = sva({
    slots: ['chipContainer', 'boxContainer', 'inputChip', 'selectContainer', 'divider', 'formDisplayIcon', 'openFormButtonContainer'],
    base: {
        selectContainer: {
            display: 'flex',
            flexDir: 'column',
            border: '2px solid black',
            borderRadius: '7px'
        },
        chipContainer: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            height: '150px',
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
        formDisplayIcon: {
            fontSize: '25px'
        },
        openFormButtonContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            border: '2px solid black',
            boxShadow: '1.3px 1.3px 0 black',
            borderRadius: '50%',
            backgroundColor: 'buttonPrimaryBackground',
            '&:focus': {
                boxShadow: '0px 0px 0 black',
                transition: 'box-shadow 0.3s',
            }
        }
    }
})