type ButtonProps = {
    className?: string,
    value: string,
    variant?: Variant,
    onClick?: () => any,
    disabled?: boolean,
    type?: Type
}

type Variant = "primary" | "outline" | "none"

type Type = "submit" | "reset" | "button"