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
            height: '60px',
            backgroundColor: '#FFA07A',
            padding: '12px',
            fontWeight: 'bold',
            borderBottom: '2px solid black',
            position: 'fixed',
            top: '70px',
            zIndex: '1',
            '& > span': {
              fontWeight: '800',
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
              }
            }
        },
    }
})