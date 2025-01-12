import ReviewItem from "@/components/reviewItem";
import {FaRegPenToSquare} from "react-icons/fa6";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import {GetServerSideProps} from "next";
import {Review} from "@/types/review";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";
import Button from "@/components/button";
import {useRouter} from "next/router";

const Page = ({reviews}: { reviews: Review[] | null }) => {
    const router = useRouter();

    return <div className="flex flex-col items-center">
        {reviews ? reviews.map(review => (
            <ReviewItem {...review} key={review.reviewId}/>
        )) : <div className="flex flex-col">
            <div className="mb-4">작성된 리뷰가 없습니다.</div>
            <Button value="리뷰 작성하기" className="py-2" variant="outline"
                    onClick={() => router.push("/review/write")}/>
        </div>}
        <Link href="/review/write"
              className="fixed bottom-20 right-5 md:right-20 border-2 border-gray-600 rounded-full p-3 cursor-pointer hover:text-gray-500 hover:border-gray-500">
            <FaRegPenToSquare className="w-6 h-6"/>
        </Link>
    </div>
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getServerSession(context.req, context.res, nextAuthOption);

        const reviews = await apiClient.get(`/api/v1/reviews/list/${0}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`
                }
            }
        );

        return {
            props: {
                reviews
            }
        }
    } catch (e) {
        console.error(e);

        return {
            props: {}
        }
    }
}