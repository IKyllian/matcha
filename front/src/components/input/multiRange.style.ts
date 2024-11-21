import { sva } from "styled-system/css";

export const multiRangeInputStyle = sva({
  slots: [
    'rangeContainer',
    'input',
    'slider',
    'sliderTrack',
    'sliderRange',
    'sliderValue',
    'valueRight',
    'valueLeft'
  ],
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
      height: '0',
      width: '250px',
      outline: 'none',
      WebkitAppearance: 'none',
      WebkitTapHighlightColor: 'transparent',
      pointerEvents: 'none',
      '&::-webkit-slider-thumb': {
        pointerEvents: 'all'
      },
      '&::-moz-range-thumb': {
        pointerEvents: 'all'
      }
    },
    sliderTrack: {
      backgroundColor: 'buttonPrimaryBackground',
      zIndex: '1',
      width: '100%',
      height: '5px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    sliderRange: {
      backgroundColor: 'buttonPrimaryBackground',
      zIndex: '2',
      height: '5px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    slider: {
      position: 'relative',
      width: '250px',
      height: '30px'
    },
    sliderValue: {
      position: 'absolute',
      bottom: '-25px'
    },
    valueRight: {
      right: '-5px'
    },
    valueLeft: {
      left: '-2px'
    }
  }
})