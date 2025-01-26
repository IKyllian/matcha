import { sva } from "styled-system/css/sva.mjs";

export const formStyle = sva({
    slots: ['wrapper', 'title', 'form', 'label', 'inputStyles', 'button', 'textInfo', 'inputError', 'forgotPassword', 'textConfirm', 'loginButton'],
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
            height: 'fit-content',
            padding: '54px 24px',
            boxShadow: '2.5px 2.5px 0 black',
            borderRadius: '7px',
            border: '2px solid black',
            margin: 'auto',
            display: 'flex',
            flexDir: 'column',
            gap: '44px',
            alignItems: 'center',
            mdDown: {
                width: '90%'
            }
        },
        form: {
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            smDown: {
                width: '90%'
            }
        },
        label: {
            display: 'flex',
            flexDir: 'column',
            textStyle: 'label',
            width: 'fit-content',
            fontWeight: '800',
            smDown: {
                width: '100%'
            }
        },
        inputStyles: {
            border: '2px solid black',
            rounded: '5px',
            width: '300px',
            height: '50px',
            padding: '4px',
            _focus: {
                outline: 'none',
            },
            smDown: {
                width: '100%'
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
            _active: {
                boxShadow: 'none',
            },
            mdDown: {
                width: 'fit-content',
                padding: '5px 20px'
            }
        },
        loginButton: {
            width: 'fit-content',
            padding: '8px',
            fontWeight: 'bold',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            backgroundColor: 'buttonPrimaryBackground',
            _active: {
                boxShadow: 'none',
            }
        },
        textInfo: {
            textAlign: 'center',
            '& > a': {
                color: 'buttonPrimaryBackground',
                _hover: {
                    textDecoration: 'underline'
                }
            }
        },
        inputError: {
            color: 'red',
            fontSize: '12px'
        },
        forgotPassword: {
            textAlign: 'right',
            fontSize: '12px',
            marginTop: '5px',
            '& > a': {
                color: 'buttonPrimaryBackground',
                _hover: {
                    textDecoration: 'underline'
                }
            }
        },
        textConfirm: {
            textAlign: 'center',
            fontWeight: '600'
        }
    }
})