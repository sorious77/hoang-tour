const Button = ({className, value, onClick, variant = "primary", disabled, type = "button"}: ButtonProps) => {
    const getClassNameByVariant = (variant: string) => {
        switch(variant) {
            case "primary":
                return "bg-amber-400 hover:bg-amber-600 text-white disabled:bg-amber-200";
            case "outline":
                return "border border-amber-600 text-amber-600 hover:text-white hover:bg-amber-800 hover:border-amber-800"
            default:
                return "text-amber-600 hover:text-amber-950";
        }
    }

    return <button
        className={`${getClassNameByVariant(variant)} px-3 py-1 rounded-lg transition-colors ease-in-out ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        {value}
    </button>
}

export default Button;