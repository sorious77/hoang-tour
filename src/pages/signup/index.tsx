import Button from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpProps} from "@/types/user";
import TooltipComponent from "@/components/tooltip";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<SignUpProps>()

    const onSubmit: SubmitHandler<SignUpProps> = data => {
        if (data.password !== data.passwordConfirm) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        alert("회원가입 성공!")
    };

    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">회원가입</h1>
        <form className="flex flex-col gap-5 mb-4"
              onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="email" className="flex justify-between items-center w-full">
                    <div>
                        <span className="font-bold px-1 text-lg">이메일</span>
                        <span className="text-sm text-red-700">*</span>
                    </div>
                    <div className="text-sm text-red-700 ml-2">{errors.email?.message}</div>
                </label>
                <input type="text" id="email" required placeholder="이메일을 입력하세요."
                       className="border border-gray-200 rounded-lg px-4 py-1.5 w-full"
                       {...register("email", {
                           required: true,
                           pattern: {
                               value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                               message: "이메일 형식이 올바르지 않습니다."
                           }
                       })}
                />
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="password">
                    <span className="font-bold px-1 text-lg">비밀번호</span>
                    <span className="text-sm text-red-700 mr-1">*</span>
                    <TooltipComponent message="비밀번호는 8자 이상 15자 이하, 영문/숫자/특수문자 최소 하나 이상씩을 포함해야 합니다."/>
                </label>
                <div className="text-sm text-red-700 ml-2 text-left">{errors.password?.message}</div>
                <input type="password" id="password"
                       className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full`}
                       minLength={8}
                       maxLength={15}
                       required
                       placeholder="비밀번호를 입력하세요."
                       {...register("password", {
                           required: true,
                           pattern: {
                               value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
                               message: "비밀번호는 8자 이상 15자 이하, 영문/숫자/특수문자 최소 하나 이상씩을 포함해야 합니다."
                           }
                       })}
                />
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="passwordConfirm" className="flex items-center">
                    <span className="font-bold px-1 text-lg">비밀번호 확인</span>
                    <span className="text-sm text-red-700 mr-1">*</span>
                </label>
                <input type="password" id="passwordConfirm"
                       className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full`}
                       minLength={8}
                       maxLength={15}
                       required
                       placeholder="비밀번호를 한 번 더 입력하세요."
                       {...register("passwordConfirm", {
                           required: true,
                       })}
                />
            </div>
            <Button value="회원가입" className="py-2" type="submit"/>
        </form>
    </div>
}

export default Page;