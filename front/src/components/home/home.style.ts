import { sva } from "styled-system/css";

export const homeStyle = sva({
  slots: ['homeContainer', 'listContainer', 'filterIconContainer', 'filterIcon'],
  base: {
    homeContainer: {
      position: 'relative',
      padding: '0 45px',
      marginTop: '80px'
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
    }
  }
})