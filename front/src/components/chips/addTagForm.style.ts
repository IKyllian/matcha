import { sva } from "styled-system/css";

export const tagFormStyle = sva({
    slots: ['tagFormContainer', 'tagInput', 'buttonIcon', 'buttonContainer', 'closeIcon', 'checkIcon'],
    base: {
        tagFormContainer: {
            padding: '8px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid black',
            width: '100%',
        },
        tagInput: {
            border: '2px solid black',
            padding: '6px',
            borderRadius: '7px',
            flex: '1'
        },
        buttonContainer: {
            display: 'flex',
            gap: '4px',
        },
        buttonIcon: {
            fontSize: '18px',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '50%',
            border: '2px solid black',
            boxShadow: '1.3px 1.3px 0 black',
        },
        closeIcon: {
            backgroundColor: 'lightRed',
            color: 'black'
        },
        checkIcon: {
            backgroundColor: 'buttonPrimaryBackground',
            color: 'black'
        }
    }
})