import { sva } from "styled-system/css";

export const homeSuggestionStyle = sva({
  slots: ['cardSuggestion', 'suggestionContainer', 'suggestionWrapper', 'arrowIcon', 'leftArrow', 'rightArrow', 'iconContainer'],
  base: {
    cardSuggestion: {
    },
    suggestionContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '54px',
      position: 'relative'
    },
    suggestionWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      smDown: {
        flexDir: 'column',
        gap: '24px'
      }
    },
    arrowIcon: {
      position: 'absolute',
      fontSize: '60px',
      smDown: {
        display: 'none'
      }
    },
    leftArrow: {
      left: '10%'
    },
    rightArrow: {
      right: '10%'
    },
    iconContainer: {
      display: 'none',
      '& > svg': {
        fontSize: '60px'
      },
      smDown: {
        display: 'flex'
      }
    }
  }
})