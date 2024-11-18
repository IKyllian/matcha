import { sva } from "styled-system/css";

export const multiRangeInputStyle = sva({
  slots: ['rangeContainer', 'input', 'slider', 'sliderTrack', 'sliderRange'],
  base: {
    rangeContainer: {
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      zIndex: 'var(--input-z-index)',
      position: 'absolute',
      // pointerEvents: 'none',
      height: '0',
      width: '200px',
      outline: 'none',
      WebkitAppearance: 'none',
      WebkitTapHighlightColor: 'transparent',
    },
    sliderRange: {
      backgroundColor: '#9fe5e1',
      zIndex: '2',
    }
  }
})