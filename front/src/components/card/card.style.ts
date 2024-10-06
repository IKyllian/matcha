import { sva } from "styled-system/css";

export const cardStyle = sva({
    slots: ['cardsContainer', 'cardWrapper', 'cardContent', 'cardImg', 'textWrapper', 'cardPrimaryText', 'cardSecondaryText'],
    base: {
        cardsContainer: {
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardWrapper: {
            display: 'flex',
            flexDir: 'column',
            gap: '12px',
            padding: '8px',
            border: '2px solid black',
            boxShadow: '2.5px 2.5px 0 black',
            width: '300px',
            borderRadius: '10px',
            backgroundColor: 'secondaryBackground'
        },
        cardContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        cardImg: {
            borderRadius: '10px',
        },
        textWrapper: {
            display: 'flex',
            flexDir: 'column'
        },
        cardPrimaryText: {
            fontSize: '20px',
            fontWeight: '600',
            cursor: 'pointer'
        },
        cardSecondaryText: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
        }
    }
})