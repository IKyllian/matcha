import { sva } from "styled-system/css";

export const notificationsScreenStyle = sva({
  slots: ['screenContainer', 'title', 'notificationContainer', 'notificationItem', 'imgSender', 'button', 'buttonContainer'],
  base: {
    screenContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '700px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      margin: '42px 0',
      fontWeight: '800',
      fontSize: '28px',
    },
    notificationContainer: {
      display: 'flex',
      flexDir: 'column',
      justifyContent: 'center',
      width: '100%',
      margin: '0 auto',
      border: '2px solid black',
      boxShadow: '2.5px 2.5px 0 black',
      borderRadius: '7px',
    },
    notificationItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      borderBottom: '1px solid #e6e6e6',
      gap: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: '#d2eef7'
      },
      '& > span': {
        flex: 1
      },
      '& > svg': {
        fontSize: '16px',
        color: '#FF6B6B',
        cursor: 'pointer',
      }
    },
    imgSender: {
      width: '52px',
      height: '52px',
      borderRadius: '50%',
      border: '2px solid black',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end'
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