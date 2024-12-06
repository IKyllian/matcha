import { sva } from "styled-system/css";

export const sortStyle = sva({
    slots: ['sortWrapper'],
    base: {
        sortWrapper: {
            // display: 'flex',
            // justifyContent: 'flex-end'
        },
    }
})