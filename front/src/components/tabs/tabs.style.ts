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
            backgroundColor: 'secondaryBackground',
            margin: '24px auto',
            width: 'fit-content',
            mdDown: {
                overflow: 'scroll',
                width: '80%',
                gap: '12px',
            }
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
            '&[data-active="true"]': {
                border: '2px solid black',
                backgroundColor: 'buttonPrimaryBackground',
            },
            mdDown: {
                width: '150px',
                padding: '10px'
            }
        },
    }
})