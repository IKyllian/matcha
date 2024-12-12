import { sva } from "styled-system/css";

export const bannerStyle = sva({
  slots: ['bannerContainer'],
  base: {
    bannerContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#FFA07A',
      padding: '12px',
      fontWeight: 'bold',
      borderBottom: '2px solid black',
      position: 'fixed',
      top: '70px',
      zIndex: '1',
      mdDown: {
        height: 'fit-content',
        top: '0',
      },
      xl: {
        height: '60px',
      },
      '& > span': {
        fontWeight: '800',
        textAlign: 'center',
        mdDown: {
          fontSize: '12px'
        }
      },
      '& > a': {
        padding: '5px 15px',
        border: '2px solid black',
        boxShadow: '2.5px 2.5px 0 black',
        backgroundColor: 'buttonPrimaryBackground',
        borderRadius: '7px',
        fontSize: '12px',
        _active: {
          boxShadow: 'none',
        },
        mdDown: {
          padding: '5px 10px',
          boxShadow: '1.5px 1.5px 0 black',
          fontSize: '10px'
        }
      }
    },
  }
})