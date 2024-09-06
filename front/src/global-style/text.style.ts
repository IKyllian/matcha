import { defineTextStyles } from '@pandacss/dev'
 
export const textStyles = defineTextStyles({
  label: {
    description: 'The text style of labels',
    value: {
      fontWeight: '600',
      fontSize: '16px',
      letterSpacing: '0',
      textDecoration: 'None',
      textTransform: 'None'
    }
  },
  title: {
    description: 'The text style of titles',
    value: {
        fontWeight: '800',
        fontSize: '24px',
        letterSpacing: '0',
        textDecoration: 'None',
        textTransform: 'uppercase',
        fontOpticalSizing: 'auto',
        fontStyle: 'normal',
    }
  }
})