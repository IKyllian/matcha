import { sva } from "styled-system/css";

export const modalStyle = sva({
  slots: ['modalContainer', 'modalContentWrapper', 'modalTitle', 'buttonsContainer', 'button', 'closeIcon'],
  base: {
    modalContainer: {
      position: 'absolute',
      width: '500px',
      height: 'fit-content',
      padding: '24px',
      backgroundColor: 'secondaryBackground',
      border: '2px solid black',
      boxShadow: '2.5px 2.5px 0 black',
      borderRadius: '10px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    modalContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'relative',
    },
    closeIcon: {
      position: 'absolute',
      right: 0,
      cursor: 'pointer',
      fontSize: '20px'
    },
    buttonsContainer: {
      display: 'flex',
      gap: '8px'
    },
    button: {
      padding: '4px 18px',
      border: '2px solid black',
      boxShadow: '2.5px 2.5px 0 black',
      backgroundColor: 'buttonPrimaryBackground',
      borderRadius: '7px',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '10px',
      _active: {
        boxShadow: 'none',
      }
    }
  }
})