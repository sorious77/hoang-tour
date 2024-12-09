import TooltipComponent from "@/components/tooltip";

const PasswordInputComponent = ({
                                    id,
                                    type,
                                    name,
                                    className,
                                    required,
                                    placeholder,
                                    hasTooltip
                                }: PasswordInputProps) => {
    return <div className="flex flex-col gap-1 items-start w-full">
        <label htmlFor={id} className="flex items-center">
            <span className="font-bold px-1 text-lg">{name}</span>
            {required && <span className="text-sm text-red-700 mr-1">*</span>}
            {hasTooltip && <TooltipComponent message="비밀번호는 6자 이상 15자 이하, 영문/숫자/특수문자 최소 하나 이상씩을 포함해야 합니다."/>}
        </label>
        <input type={type} id={id} className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full ${className}`}
               maxLength={15}
               required={required}
               placeholder={placeholder || "비밀번호를 입력하세요."}
        />
    </div>
}

export default PasswordInputComponent;