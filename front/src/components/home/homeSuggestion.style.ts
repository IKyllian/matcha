import { sva } from "styled-system/css";

export const homeSuggestionStyle = sva({
  slots: ['cardSuggestion', 'suggestionContainer', 'suggestionWrapper', 'arrowIcon'],
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
      justifyContent: 'space-evenly'
    },
    arrowIcon: {
      fontSize: '60px'
    }
  }
})