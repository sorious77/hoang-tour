const Button = ({className, value, onClick, variant = "primary", disabled, type = "button"}: ButtonProps) => {
    return <button
        className={`${variant === "primary" ? "bg-amber-400 hover:bg-amber-600 text-white disabled:bg-amber-200" : "text-amber-600 hover:text-amber-950"} px-3 py-1 rounded-lg transition-colors ease-in-out ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        {value}
    </button>
}

export default Button;