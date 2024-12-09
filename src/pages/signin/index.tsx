import Input from "@/components/input";
import PasswordInput from "@/components/passwordInput";
import Button from "@/components/button";
import {ChangeEvent, useEffect, useState} from "react";

const Page = () => {
    const [disabled, setDisabled] = useState(true)
    const [inputs, setInputs] = useState({email: "", password: ""})

    const {email, password} = inputs;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, id} = e.target;

        setInputs({
            ...inputs,
            [id]: value
        })
    }

    useEffect(() => {
        (() => {
            setDisabled(!(email && password))
        })();
    }, [email, password]);

    return <div className="w-96">
        <h1 className="text-2xl font-bold mb-10">로그인</h1>
        <form className="flex flex-col gap-5 mb-4">
            <Input id="email" type="email" name="이메일" required={true} placeholder="이메일을 입력하세요." onChange={onChange}/>
            <PasswordInput id="password"
                           type="password"
                           name="비밀번호"
                           required={true}
                           hasTooltip={true}
                           onChange={onChange}
            />
            <Button value="로그인" className="py-2" disabled={disabled}/>
        </form>
    </div>
}

export default Page;