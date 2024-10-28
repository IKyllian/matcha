import { sva } from "styled-system/css/sva.mjs";

export const formStyle = sva({
    slots: ['wrapper', 'title', 'form', 'label', 'inputStyles', 'button'],
    base: {
        title: {
            textAlign: 'center',
            fontWeight: '800',
            fontSize: '28px',
            fontFamily: 'title',
            letterSpacing: '1.5px'
        },
        wrapper: {
            backgroundColor: 'secondaryBackground',
            width: '700px',
            height: '700px',
            padding: '24px',
            boxShadow: '2.5px 2.5px 0 black',
            borderRadius: '7px',
            border: '2px solid black',
            margin: 'auto',
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'space-evenly',
        },
        form: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
        },
        label: {
            display: 'flex',
            flexDir: 'column',
            textStyle: 'label',
            width: 'fit-content',
            fontWeight: '800',
        },
        inputStyles: {
            border: '2px solid black',
            rounded: '5px',
            width: '300px',
            height: '50px',
            padding: '4px',
            _focus: {
                outline: 'none',
            }
        },
        button: {
            width: '300px',
            height: '50px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            backgroundColor: 'buttonPrimaryBackground',
            borderRadius: '7px',
            fontWeight: '500',
            fontSize: '20px',
            marginTop: '12px',
            fontFamily: 'body',
            _active: {
                boxShadow: 'none',
            }
        }
    }
})