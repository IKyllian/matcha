import { sva } from "styled-system/css";

export const viewScreenStyle = sva({
  slots: ['title'],
  base: {
    title: {
      textAlign: 'center',
      fontWeight: '800',
      fontSize: '28px',
      marginBottom: '24px',
    }
  }
})