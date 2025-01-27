import { sva } from "styled-system/css";

export const homeStyle = sva({
  slots: ['homeContainer', 'listContainer', 'filterIconContainer', 'filterIcon', 'listHeaderWrapper', 'arrowContainer', 'paginationButton', 'filterListWrapper'],
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
      smDown: {
        display: 'none'
      },
    },
    paginationButton: {
      height: '50px',
      width: '150px',
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
      },
    },
    filterListWrapper: {
      display: 'flex',
      flexDir: 'column',
      justifyContent: 'center',
      gap: '12px'
    }
  }
})