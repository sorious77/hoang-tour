const InputComponent = ({
                            id, type, name, defaultValue, value, className, disabled, maxLength, required
                        }: InputProps) => {
    return <div className="flex flex-col gap-1 items-start w-full">
        <label htmlFor={id}>
            <span className="font-bold px-1 text-lg">{name}</span>
            {required && <span className="text-sm text-red-700">*</span>}
        </label>
        <input type={type} id={id} className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full ${className}`}
               defaultValue={defaultValue}
               value={value}
               disabled={disabled}
               maxLength={maxLength}
               required={required}
        />
    </div>
}

export {InputComponent};