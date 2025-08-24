import React from "react";
import TooltipComponent from "@/components/tooltip";

interface FormFieldProps {
    id: string;
    label: string;
    type: "text" | "email" | "password";
    placeholder: string;
    required?: boolean;
    error?: string;
    tooltip?: string;
    minLength?: number;
    maxLength?: number;
    register: any;
    validation?: any;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    required = false,
    error,
    tooltip,
    minLength,
    maxLength,
    register,
    validation
}) => {
    return (
        <div className="flex flex-col gap-1 items-start w-full">
            <label htmlFor={id} className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <span className="font-bold px-1 text-lg">{label}</span>
                    {required && <span className="text-sm text-red-700">*</span>}
                    {tooltip && <TooltipComponent message={tooltip} />}
                </div>
                {error && <div className="text-sm text-red-700 ml-2">{error}</div>}
            </label>
            <input
                type={type}
                id={id}
                required={required}
                placeholder={placeholder}
                className="border border-gray-200 rounded-lg px-4 py-1.5 w-full"
                minLength={minLength}
                maxLength={maxLength}
                {...register(id, validation)}
            />
        </div>
    );
};

export default FormField;
