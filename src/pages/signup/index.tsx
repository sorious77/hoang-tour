import Button from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpProps} from "@/types/user";
import {useRouter} from "next/navigation";
import apiClient from "@/lib/apiClient";
import ApiError from "@/types/apiError";
import FormField from "@/components/ui/form-field";
import {VALIDATION, ERROR_MESSAGES} from "@/lib/constants";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<SignUpProps>()

    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
        if (data.password !== data.passwordConfirm) {
            alert(ERROR_MESSAGES.PASSWORD_MISMATCH);
            return;
        }
        try {
            await apiClient.post("/api/v1/members", {...data});

            alert(ERROR_MESSAGES.SIGNUP_SUCCESS)
            router.push("/signin")
        } catch (e) {
            if (e instanceof ApiError) {
                alert(e.description);
            } else {
                // 네트워크 또는 기타 Axios 에러
                alert(ERROR_MESSAGES.SIGNUP_ERROR)
            }
        }
    };

    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">회원가입</h1>
        <form className="flex flex-col gap-5 mb-4"
              onSubmit={handleSubmit(onSubmit)}>
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
                id="nickname"
                label="닉네임"
                type="text"
                placeholder="닉네임을 입력하세요."
                required
                error={errors.nickname?.message}
                tooltip={VALIDATION.NICKNAME.MESSAGE}
                minLength={VALIDATION.NICKNAME.MIN_LENGTH}
                maxLength={VALIDATION.NICKNAME.MAX_LENGTH}
                register={register}
                validation={{
                    required: true,
                    pattern: {
                        value: VALIDATION.NICKNAME.PATTERN,
                        message: VALIDATION.NICKNAME.MESSAGE
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
                tooltip={VALIDATION.PASSWORD.MESSAGE}
                minLength={VALIDATION.PASSWORD.MIN_LENGTH}
                maxLength={VALIDATION.PASSWORD.MAX_LENGTH}
                register={register}
                validation={{
                    required: true,
                    pattern: {
                        value: VALIDATION.PASSWORD.PATTERN,
                        message: VALIDATION.PASSWORD.MESSAGE
                    }
                }}
            />
            <FormField
                id="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 한 번 더 입력하세요."
                required
                minLength={VALIDATION.PASSWORD.MIN_LENGTH}
                maxLength={VALIDATION.PASSWORD.MAX_LENGTH}
                register={register}
                validation={{
                    required: true,
                }}
            />
            <Button value="회원가입" className="py-2" type="submit"/>
        </form>
    </div>
}

export default Page;