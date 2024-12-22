import {InputProps} from "@/types/inputProps";

const InputComponent = ({
                            id,
                            type,
                            labelName,
                            defaultValue,
                            value,
                            className,
                            disabled,
                            maxLength,
                            required,
                            placeholder,
                            onChange,
                        }: InputProps) => {
    return <div className="flex flex-col gap-1 items-start w-full">
        <label htmlFor={id}>
            <span className="font-bold px-1 text-lg">{labelName}</span>
            {required && <span className="text-sm text-red-700">*</span>}
        </label>
        <input type={type} id={id} className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full ${className}`}
               defaultValue={defaultValue}
               value={value}
               disabled={disabled}
               maxLength={maxLength}
               required={required}
               placeholder={placeholder}
               onChange={onChange}
        />
    </div>
}

/**
 * const register: <"email">(name: "email", options?: RegisterOptions<SignUpProps, "email"> | undefined) => UseFormRegisterReturn<"email">
 */

export default InputComponent;