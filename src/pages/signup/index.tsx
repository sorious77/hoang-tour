import Button from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpProps} from "@/types/user";
import TooltipComponent from "@/components/tooltip";
import {useRouter} from "next/navigation";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import ApiError from "@/types/apiError";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<SignUpProps>()

    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpProps> = async data => {
        if (data.password !== data.passwordConfirm) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        try {
            await apiClient.post("/api/v1/members", {...data});

            alert("회원가입에 성공했습니다.")
            router.push("/signin")
        } catch (e) {
            if (e instanceof ApiError) {
                alert(e.description);
            } else {
                // 네트워크 또는 기타 Axios 에러
                alert("회원 가입 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.")
            }
        }
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
                <label htmlFor="nickname">
                    <div>
                        <span className="font-bold px-1 text-lg">닉네임</span>
                        <span className="text-sm text-red-700">*</span>
                        <TooltipComponent message="닉네임은 2자 이상 30자 이하, 숫자를 제외하고 영문/특수문자(_, .)를 최소 하나 이상씩을 포함해야 합니다."/>
                    </div>
                </label>
                <div className="text-sm text-red-700 ml-2 text-left">{errors.password?.message}</div>
                <input type="text" id="text" required placeholder="닉네임을 입력하세요."
                       className="border border-gray-200 rounded-lg px-4 py-1.5 w-full"
                       minLength={2}
                       maxLength={30}
                       {...register("nickname", {
                           required: true,
                           pattern: {
                               value: /^(?=.*[a-z_.])[a-z0-9_.]{2,30}$/,
                               message: "닉네임은 2자 이상 30자 이하, 숫자를 제외하고 영문/특수문자(_, .)를 최소 하나 이상씩을 포함해야 합니다."
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