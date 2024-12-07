import { sva } from "styled-system/css";

export const cardStyle = sva({
    slots: ['cardsContainer', 'cardWrapper', 'cardContent', 'cardImg', 'textWrapper', 'cardPrimaryText', 'cardSecondaryText', 'nameWrapper', 'gender', 'likeButton'],
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
            backgroundColor: 'secondaryBackground',
            height: 'fit-content'
        },
        cardContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        cardImg: {
            borderRadius: '10px',
            width: '280px',
            height: '280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        textWrapper: {
            display: 'flex',
            width: '85%',
            flexDir: 'column',
            gap: '4px'
        },
        nameWrapper: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px'
        },
        cardPrimaryText: {
            fontSize: '20px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '230px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        cardSecondaryText: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            width: 'fit-content',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        likeButton: {
            width: '40px'
        }
    }
})