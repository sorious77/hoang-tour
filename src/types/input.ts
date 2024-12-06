type InputProps = {
    id: string,
    type: InputType,
    name: string,
    defaultValue?: string,
    value?: string,
    className?: string,
    disabled?: boolean,
    maxLength?: number,
    required?: boolean
}

type InputType = "text" | "password" | "email"