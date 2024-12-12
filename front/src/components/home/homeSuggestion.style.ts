import { sva } from "styled-system/css";

export const homeSuggestionStyle = sva({
  slots: ['cardSuggestion', 'suggestionContainer', 'suggestionWrapper', 'arrowIcon', 'iconContainer'],
  base: {
    cardSuggestion: {
    },
    suggestionContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '54px'
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
      fontSize: '60px',
      smDown: {
        display: 'none'
      }
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