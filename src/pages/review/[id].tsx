import {GetServerSideProps} from "next";
import apiClient from "@/lib/apiClient";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";
import {Review} from "@/types/review";
import ReviewItem from "@/components/reviewItem";

const Page = ({review}: { review: Review }) => {
    return <>
        <ReviewItem review={review} isListView={false} />
    </>
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const params = context.params;

        if (!params || !params.id || isNaN(Number(params.id))) {
            console.log(`id is ${params?.id}`)

            return {
                redirect: {
                    destination: "/404",
                    permanent: true
                },
            };
        }

        const id = Number(params.id)

        const session = await getServerSession(context.req, context.res, nextAuthOption);
        if (!session) {
            return {
                props: {}
            }
        }

        const {user: {accessToken}} = session;

        const review: Review | null = await apiClient.get(`/api/v1/reviews/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!review) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: true
                }
            }
        }

        return {
            props: {
                review
            }
        }
    } catch (e) {
        console.log(e)

        return {
            redirect: {
                destination: "/404",
                permanent: true
            },
        }
    }
}