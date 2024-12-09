type ButtonProps = {
    className?: string,
    value: string,
    variant?: Variant,
    onClick?: () => any
}

type Variant = "primary" | "outline"