import Input from "@/components/input";
import PasswordInput from "@/components/passwordInput";
import Button from "@/components/button";
import {ChangeEvent, useEffect, useState} from "react";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {SignInProps} from "@/types/user";
import TooltipComponent from "@/components/tooltip";
import ApiError from "@/types/apiError";
import apiClient from "@/lib/apiClient";

const Page = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<SignInProps>()

    const [email, password] = useWatch<SignInProps>({
        control,
        name: ["email", "password"],
    })

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if ((email?.length >= 5) && (password?.length >= 8)) setDisabled(false);
        else setDisabled(true);
    }, [email, password])

    const onSubmit: SubmitHandler<SignInProps> = async (data) => {
        try {
            console.log("hihi")
            const result = await apiClient.post("/api/v1/members/signIn", {...data});

            console.log(result);
        } catch (e) {
            if (e instanceof ApiError) {
                console.log(e);
                alert(e.description);
            } else {
                alert("로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">로그인</h1>
        <form className="flex flex-col gap-5 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="email" className="flex justify-between items-center w-full">
                    <span className="font-bold px-1 text-lg">이메일</span>
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
                <span className="font-bold px-1 text-lg">비밀번호</span>
                <div className="text-sm text-red-700 ml-2 text-left">{errors.password?.message}</div>
                <input type="password" id="password"
                       className={`border border-gray-200 rounded-lg px-4 py-1.5 w-full`}
                       minLength={8}
                       maxLength={15}
                       required
                       placeholder="비밀번호를 입력하세요."
                       {...register("password", {
                           required: true,
                       })}
                />
            </div>
            <Button value="로그인" className="py-2" disabled={disabled} type="submit"/>
        </form>
    </div>
}

export default Page;