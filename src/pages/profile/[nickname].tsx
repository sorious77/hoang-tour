import {GetServerSideProps} from "next";
import axios from "axios";
import {IoHeart} from "react-icons/io5";
import {LiaCommentAltSolid} from "react-icons/lia";
import HorizonLine from "@/components/horizonLine";

const Profile = ({user}: { user: User }) => {

    return <div>
        <div className="flex gap-10 py-10 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[900px] lg:pl-48">
            <div className="ml-10 w-28 h-28 flex justify-center">
                <img src={user.profileImage} className="rounded-full border border-gray-200"/>
            </div>
            <div className="text-left flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl">{user.nickname}</span>
                    <button
                        className="text-white bg-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors ease-in-out">프로필
                        편집
                    </button>
                </div>
                <div className="flex gap-3">
                    <div>게시물 <span className="font-bold">70</span></div>
                    <div>공감 <span className="font-bold">70</span></div>
                </div>
                <div>찌오 처음봐? 팍씨</div>
            </div>
        </div>
        <div className="mb-10">
            <HorizonLine/>
        </div>
        <div className="mb-10">
            <div className="grid grid-cols-3 gap-2">
                {Array.from("x".repeat(10)).map(_ => (
                    <div className="relative group cursor-pointer">
                        <img className="aspect-square object-cover group-hover:brightness-50 transition rounded"
                             src="https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"
                             alt="게시글"/>
                        <div
                            className="absolute inset-0 flex gap-4 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1.5">
                                <IoHeart/>
                                <span>548</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <LiaCommentAltSolid/>
                                <span>123</span>
                            </div>
                        </div>
                    </div>)
                )}
            </div>
        </div>
    </div>
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const nickname = context.query.nickname as string | undefined;

    if (!nickname) return {
        redirect: {
            destination: "/profile/404",
            permanent: true
        }
    }

    try {
        const {data: user}: { data: User } = await axios.get(`http://localhost:3000/api/user/${nickname}`);

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