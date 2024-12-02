import { RegisterOptions } from "react-hook-form"

export type FieldsInputType<T> = {
    label: string
    type: string
    name: keyof T
    options?: RegisterOptions<T>
}

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/