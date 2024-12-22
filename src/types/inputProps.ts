import {ChangeEvent} from "react";

export type InputProps = {
    id: string,
    type: InputType,
    labelName: string,
    defaultValue?: string,
    value?: string,
    className?: string,
    disabled?: boolean,
    maxLength?: number,
    required?: boolean,
    placeholder?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => any,
}

export type PasswordInputProps = {
    id: string,
    type: InputType,
    name: string,
    className?: string,
    required?: boolean,
    placeholder?: string,
    hasTooltip?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}

type InputType = "text" | "password" | "email"