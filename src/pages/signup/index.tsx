import {Button} from "@/components/ui/button";
import Input from "@/components/input";
import PasswordInputComponent from "@/components/passwordInput";

const Page = () => {
    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">회원가입</h1>
        <form className="flex flex-col gap-5 mb-4">
            <Input id="email" type="email" name="이메일" required={true} placeholder="이메일을 입력하세요."/>
            <PasswordInputComponent id="password"
                                    type="password"
                                    name="비밀번호"
                                    required={true}
                                    hasTooltip={true}/>
            <PasswordInputComponent id="passwordConfirm"
                                    type="password"
                                    name="비밀번호 확인"
                                    required={true}
                                    hasTooltip={false}
                                    placeholder="비밀번호를 한 번 더 입력하세요."/>
            <Button>회원가입</Button>
        </form>
    </div>
}

export default Page;