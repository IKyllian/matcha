import { sva } from "styled-system/css";

export const chatScreenStyle = sva({
    slots: ['chatScreenContainer'],
    base: {
        chatScreenContainer: {
            display: 'flex',

        }
    }
})