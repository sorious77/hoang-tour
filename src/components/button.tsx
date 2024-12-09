const Button = ({className, value, onClick, variant = "primary", disabled}: ButtonProps) => {
    return <button
        className={`${variant === "primary" ? "bg-blue-600 hover:bg-blue-400 text-white disabled:bg-blue-400" : "text-blue-600 hover:text-blue-950"} px-3 py-1 rounded-lg ${className}`}
        onClick={onClick}
        disabled={disabled}
    >
        {value}
    </button>
}

export default Button;