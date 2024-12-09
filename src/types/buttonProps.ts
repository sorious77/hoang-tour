type ButtonProps = {
    className?: string,
    value: string,
    variant?: Variant,
    onClick?: () => any,
    disabled?: boolean,
}

type Variant = "primary" | "outline"