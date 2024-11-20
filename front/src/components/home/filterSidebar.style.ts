import { sva } from "styled-system/css";

export const filterSidebarStyle = sva({
  slots: ['sidebarContainer', 'filtersContainer', 'rangeInput', 'title', 'button', 'closeButton'],
  base: {
    title: {
      fontSize: '24px',
      fontWeight: '800',
      marginBottom: '12px',
      textAlign: 'center',
    },
    sidebarContainer: {
      width: '400px',
      height: 'calc(100vh - 70px)',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      left: '0',
      top: '70px',
      zIndex: '5',
      backgroundColor: 'primaryBackground',
      borderRight: '2px solid black',
      padding: '24px'
    },
    closeButton: {
      position: 'absolute',
      fontSize: '24px',
      right: '10px',
      top: '10px',
      cursor: 'pointer',
    },
    filtersContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      width: '100%',
      gap: '10px',
      '& label': {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }
    },
    button: {
      height: '50px',
      width: '200px',
      border: '2px solid black',
      boxShadow: '2.5px 2.5px 0 black',
      backgroundColor: 'buttonPrimaryBackground',
      borderRadius: '7px',
      fontWeight: '500',
      fontSize: '20px',
      margin: '12px auto 0 auto',
      cursor: 'pointer',
      _active: {
        boxShadow: 'none',
      }
    },
    rangeInput: {
      accentColor: 'buttonPrimaryBackground'
    }
  }
})