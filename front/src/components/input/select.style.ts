import { sva } from "styled-system/css";

export const selectInputStyle = sva({
    slots: [
        'inputSelectWrapper',
        'selectedItemContainer',
        'itemContainer',
        'selectListContainer'
    ],
    base: {
        inputSelectWrapper: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
        },
        selectedItemContainer: {
            width: 'fit-content',
            border: '2px solid black',
            borderRadius: '7px',
            '& > span': {
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px',
                borderRadius: '4px',
                width: '150px',
            }
        },
        selectListContainer: {
            backgroundColor: 'primaryBackground',
            border: '2px solid black',
            borderRadius: '7px',
            width: 'fit-content',
            padding: '2px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            position: 'absolute',
            zIndex: '3',
        },
        itemContainer: {
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '4px',
            width: '150px',
            '&:hover': {
                backgroundColor: 'buttonPrimaryBackground',
            }
        },
    }
})