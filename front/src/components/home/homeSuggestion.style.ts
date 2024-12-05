import { sva } from "styled-system/css";

export const homeSuggestionStyle = sva({
  slots: ['cardSuggestion', 'suggestionContainer', 'suggestionWrapper', 'arrowIcon'],
  base: {
    cardSuggestion: {
      // width: '500px',
      // height: '500px'
    },
    suggestionContainer: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    suggestionWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    arrowIcon: {
      fontSize: '60px'
    }
  }
})