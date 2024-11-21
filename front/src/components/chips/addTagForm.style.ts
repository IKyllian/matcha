import { sva } from "styled-system/css";

export const tagFormStyle = sva({
    slots: ['tagFormContainer', 'tagInput'],
    base: {
        tagFormContainer: {
            // width: '100%',
        },
        tagInput: {
            border: '2px solid black',
            // width: '100%',
            padding: '4px',
            borderRadius: '7px',
        }
    }
})