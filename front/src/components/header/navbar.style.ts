import { sva } from "styled-system/css";

export const navbarStyle = sva({
    slots: [
        "navBarContainer",
        "contentWrapper",
        "icon",
        "iconContainer"
    ],
    base: {
        navBarContainer: {
            position: "fixed",
            bottom: '10px',
            margin: '0 auto',
            left: 0,
            right: 0,
            width: '320px',
            height: '50px',
            border: '2px solid black',
            boxShadow: '2px 2px 0 black',
            borderRadius: '25px',
            backgroundColor: 'primaryBackground',
            padding: '12px',
            display: 'none',
            mdDown: {
                display: 'flex'
            }
        },
        contentWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        icon: {
            fontSize: '25px'
        },
        iconContainer: {
            borderRadius: '50%',
            padding: '6px',
            '&[data-isactive="1"]': {
                backgroundColor: 'buttonPrimaryBackground',
                border: '2px solid black'
            }
        }
    }
})