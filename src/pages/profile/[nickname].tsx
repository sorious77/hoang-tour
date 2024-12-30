import {GetServerSideProps} from "next";
import HorizonLine from "@/components/horizonLine";
import Link from "next/link";
import {Profile} from "@/types/user";
import apiClient from "@/lib/apiClient";
import Button from "@/components/button";
import {useRouter} from "next/navigation";

const Profile = ({user}: { user: Profile }) => {
    const router= useRouter();

    const profileImage = "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106";

    return <div>
        <div className="flex gap-10 py-10 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[850px] lg:pl-48">
            <div className="ml-10 w-28 h-28 flex justify-center">
                <img src={profileImage} className="rounded-full border border-gray-200" alt="프로필 이미지"/>
            </div>
            <div className="text-left flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl">{user.nickname}</span>
                    <button
                        className="text-white bg-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors ease-in-out">
                        <Link href="/profile/edit">
                            프로필 편집
                        </Link>
                    </button>
                </div>
                <div className="flex gap-3">
                    <div>팔로워 <span className="font-bold">{user.totalFollwerCount || 0}</span></div>
                    <div>팔로잉 <span className="font-bold">{user.totalFollowingCount || 0}</span></div>
                </div>
                <div>{user.introduction || ""}</div>
            </div>
        </div>
        <div className="mb-10">
            <HorizonLine/>
        </div>
        <div className="mb-10 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[850px]">
            <div className="grid grid-cols-3 gap-2">
                {user.review ? user.review.map((_, idx) => (
                    <div className="relative group cursor-pointer" key={`_${idx}`}>
                        <img className="aspect-square object-cover group-hover:brightness-50 transition rounded"
                             src="https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"
                             alt="게시글"/>
                        {/* TODO 리뷰 좋아요 댓글 수 Enable */}
                        {/*<div*/}
                        {/*    className="absolute inset-0 flex gap-4 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">*/}
                        {/*    <div className="flex items-center gap-1.5">*/}
                        {/*        <IoHeart/>*/}
                        {/*        <span>548</span>*/}
                        {/*    </div>*/}
                        {/*    <div className="flex items-center gap-1.5">*/}
                        {/*        <LiaCommentAltSolid/>*/}
                        {/*        <span>123</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>)) : <div className="col-end-3 flex flex-col gap-5 items-center">
                    작성한 리뷰가 없습니다.
                    <Button value="리뷰 작성하기" className="w-1/2 py-2" variant="outline" onClick={() => router.push("/review/write")}/>
                </div>}
            </div>
        </div>
    </div>
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const {nickname} = context.params as { nickname: string }; // 동적 경로 변수 가져오기

        const user: Profile = await apiClient.get(`/api/v1/members/profile?nickname=${nickname}`);

        if (!user) {
            return {
                redirect: {
                    destination: "/profile/404",
                    permanent: true
                }
            }
        }

        return {
            props: {
                user
            }
        }
    } catch (e) {
        console.error(e);

        return {
            redirect: {
                destination: "/profile/404",
                permanent: true
            }
        }
    }
}