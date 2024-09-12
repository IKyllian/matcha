import { sva } from "styled-system/css";

export const tabsStyle = sva({
    slots: ['tabsContainer', 'tab'],
    base: {
        tabsContainer: {
            display: 'flex',
            gap: '8px',
            borderRadius: '7px',
            border: '2px solid black',
            boxShadow: '0px 3px 0 black',
            padding: '5px',
            width: 'fit-content',
            backgroundColor: 'secondaryBackground',
            margin: '24px auto'
        },
        tab: {
            height: '40px',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '7px',
            fontWeight: '600',
            cursor: 'pointer',
            // transition: 'border 0.3s ease, background-color 0.3s ease',

            '&[data-active="true"]': {
                border: '2px solid black',
                backgroundColor: 'buttonPrimaryBackground',
            },
        },
    }
})