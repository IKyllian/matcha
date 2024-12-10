import { sva } from "styled-system/css";

export const notificationsModalStyle = sva({
  slots: ['modalContainer', 'imgSender', 'notifItem', 'deleteIcon', 'link'],
  base: {
    modalContainer: {
      position: 'absolute',
      top: '30px',
      right: '0px',
      borderRadius: '10px',
      padding: '10px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflowY: 'scroll',
      border: '2px solid black',
      boxShadow: '2.5px 2.5px 0 black',
      width: '370px',
      backgroundColor: 'secondaryBackground'
    },
    imgSender: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      border: '2px solid black',
    },
    notifItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      padding: '10px',
      borderRadius: '10px',
      _hover: {
        backgroundColor: '#fae3d2'
      },
      '& > span': {
        flex: 1
      }
    },
    deleteIcon: {
      fontSize: '14px',
      color: '#FF6B6B',
      cursor: 'pointer',
    },
    link: {
      textAlign: 'center',
      cursor: 'pointer',
      _hover: {
        textDecoration: 'underline'
      }
    }
  }
})