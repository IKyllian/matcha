import { sva } from "styled-system/css";

export const homeStyle = sva({
  slots: ['homeContainer', 'listContainer', 'filterIconContainer', 'filterIcon', 'listHeaderWrapper', 'arrowContainer'],
  base: {
    homeContainer: {
      padding: '0 45px 24px 45px',
      overflow: 'hidden'
    },
    listContainer: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterIconContainer: {
      position: 'fixed',
      left: 0,
      top: '150px',
      border: '2px solid black',
      borderLeft: 'none',
      boxShadow: '1.5px 1.5px 0 black',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _active: {
        boxShadow: 'none',
      }
    },
    filterIcon: {
      fontSize: '24px',
    },
    arrowContainer: {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'buttonPrimaryBackground',
      border: '2px solid black',
      boxShadow: '1.5px 1.5px 0 black',
      cursor: 'pointer',
      _active: {
        boxShadow: 'none',
      },
    },
    listHeaderWrapper: {
      // position: 'fixed',
      // backgroundColor: 'primaryBackground',
      // zIndex: '2',
      // width: '100%'
    }
  }
})