import { RegisterOptions } from "react-hook-form"

export type FieldsInputType<T> = {
    label: string
    type: string
    name: keyof T
    options?: RegisterOptions<T>
}