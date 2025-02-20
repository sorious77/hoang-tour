import {GetServerSideProps} from "next";
import {IoCameraReverseOutline} from "react-icons/io5";
import {useHover} from "react-use";
import Button from "@/components/button";
import Input from "@/components/input";
import {Profile, User} from "@/types/user";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";
import apiClient from "@/lib/apiClient";
import {redirect} from "next/navigation";

const Page = ({user}: { user: User }) => {
    const profileImage = (hovered: boolean) => {
        return hovered ?
            <div
                className="w-48 h-48 border border-gray-200 rounded-full flex justify-center items-center cursor-pointer">
                <IoCameraReverseOutline className="text-4xl"/>
            </div> :
            <img src={user.profileImage || ""}
                 className="rounded-full size-48 border border-gray-200 object-cover hover:opacity-50 cursor-pointer"
                 alt="프로필 이미지"/>
    }

    const [hoverable, hovered] = useHover(profileImage);

    return <div>
        <form className="flex flex-col items-center mb-4" onSubmit={(e) => {
            e.preventDefault()
            console.log(e.target)
        }}>
            {hoverable}
            <div className="flex gap-5 flex-col mb-6 w-96">
                <Input id="email" type="text" labelName="이메일" value={user.email} disabled={true}/>
                <Input id="nickname" type="text" labelName="닉네임" defaultValue={user.nickname}/>
                <div className="flex flex-col gap-1 items-start w-full">
                    <label htmlFor="introduction" className="font-bold px-1 text-lg">소개</label>
                    <textarea id="introduction"
                              className="border border-gray-200 rounded-lg px-4 py-1.5 w-full resize-none"
                              rows={2}
                              defaultValue={user.introduction}/>
                </div>
                <Input id="password" type="password" labelName="비밀번호" maxLength={15}/>
                <Input id="passwordConfirm" type="password" labelName="비밀번호 확인" maxLength={15}/>
            </div>
            <Button className="w-full py-2" value="수정"/>
        </form>
    </div>
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, nextAuthOption);

    if (!session) {
        return {
            redirect: {
                destination: "/profile/edit/404",
                permanent: false
            }
        }
    }

    const user: Profile = await apiClient.get(`/api/v1/members/profile?nickname=${session.user.nickname}`);

    console.log(user);

    return {
        props: {
            user: {
                ...user,
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
            }
        }
    }
}