import Button from "@/components/button";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import {SignInProps} from "@/types/user";
import ApiError from "@/types/apiError";
import {signIn} from "next-auth/react";
import FormField from "@/components/ui/form-field";
import {VALIDATION, ERROR_MESSAGES} from "@/lib/constants";

const Page = ({providers}: { providers: any }) => {
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
            await signIn("credentials", {callbackUrl: "/", email: data.email, password: data.password});
        } catch (e) {
            if (e instanceof ApiError) {
                console.log(e);
                alert(e.description);
            } else {
                alert(ERROR_MESSAGES.LOGIN_ERROR);
            }
        }
    };

    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">로그인</h1>
        <form className="flex flex-col gap-5 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력하세요."
                required
                error={errors.email?.message}
                register={register}
                validation={{
                    required: true,
                    pattern: {
                        value: VALIDATION.EMAIL.PATTERN,
                        message: VALIDATION.EMAIL.MESSAGE
                    }
                }}
            />
            <FormField
                id="password"
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요."
                required
                error={errors.password?.message}
                minLength={VALIDATION.PASSWORD.MIN_LENGTH}
                maxLength={VALIDATION.PASSWORD.MAX_LENGTH}
                register={register}
                validation={{
                    required: true,
                }}
            />
            <Button value="로그인" className="py-2" disabled={disabled} type="submit"/>
        </form>
    </div>
}

export default Page;