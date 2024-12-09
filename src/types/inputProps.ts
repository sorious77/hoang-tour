type InputProps = {
    id: string,
    type: InputType,
    name: string,
    defaultValue?: string,
    value?: string,
    className?: string,
    disabled?: boolean,
    maxLength?: number,
    required?: boolean,
    placeholder?: string,
}

type PasswordInputProps = {
    id: string,
    type: InputType,
    name: string,
    className?: string,
    required?: boolean,
    placeholder?: string,
    hasTooltip?: boolean,
}

type InputType = "text" | "password" | "email"