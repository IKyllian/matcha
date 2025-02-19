import { sva } from "styled-system/css";

export const chatScreenStyle = sva({
    slots: ['chatScreenContainer', 'arrowContainer'],
    base: {
        chatScreenContainer: {
            display: 'flex',
            position: 'relative',
        },
        arrowContainer: {
            position: 'fixed',
            top: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'primaryBackground',
            border: '2px solid black',
            cursor: 'pointer',
            zIndex: '3',
            left: '305px',
            '&[data-issidebaropen="0"]': {
                left: '55px',
            },
            _active: {
                boxShadow: 'none',
            },
            mdDown: {
                '&[data-issidebaropen="1"]': {
                    left: '235px',
                },
            },
            smDown: {
                '&[data-issidebaropen="0"]': {
                    left: '-10px'
                },
            }
        },
    }
})