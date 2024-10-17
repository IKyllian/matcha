import { sva } from "styled-system/css";

export const homeSuggestionStyle = sva({
  slots: ['cardSuggestion', 'suggestionContainer'],
  base: {
    cardSuggestion: {
        // width: '500px',
        // height: '500px'
    },
    suggestionContainer: {
      height: '100vh'
    }
  }
})