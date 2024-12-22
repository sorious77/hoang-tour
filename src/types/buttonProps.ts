type ButtonProps = {
    className?: string,
    value: string,
    variant?: Variant,
    onClick?: () => any,
    disabled?: boolean,
    type?: Type
}

type Variant = "primary" | "outline"

type Type = "submit" | "reset" | "button"