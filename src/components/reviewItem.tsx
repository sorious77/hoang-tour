import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import {SkeletonImage} from "@/components/skeleton";
import HorizonLine from "@/components/horizonLine";
import {Review} from "@/types/review";
import React, {useState} from "react";
import {formatRelativeTime} from "@/lib/utils";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface Props {
    review: Review,
    isListView: boolean
}

const ReviewItem = ({review, isListView}: Props) => {
    const [dropdown, setDropdown] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {data: session} = useSession();

    const nextPhoto = () => {
        if (currentIndex < review.reviewImageList.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    const prevPhoto = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev => prev - 1));
        }
    }

    return <div className="w-full sm:w-5/6 lg:w-2/3 flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 w-1/2">
                {/*<SkeletonImage skeletonClassName="w-4 h-4" imgClassName="w-10 h-10 rounded-full border border-gray-300"*/}
                {/*               src={article.user.profileImage || ""} alt="프로필 이미지"/>*/}
                <div className="flex gap-2 items-center">
                    <div className="font-semibold">{review.nickname}</div>
                    ·
                    <div className="text-gray-500 text-sm">{formatRelativeTime(review.insDate)}</div>
                </div>
            </div>
            {session?.user.email === review.userEmail &&
                <div className="relative">
                    <IoEllipsisHorizontalSharp className="cursor-pointer" onClick={() => setDropdown(prev => !prev)}/>
                    {dropdown &&
                        <div
                            className="absolute z-10 bg-white px-5 py-2 top-5 right-0 w-28 border border-gray-200 rounded-lg flex flex-col gap-2">
                            {/*<button onClick={() => router.push(`/review/edit/${review.reviewId}`)}>수정하기</button>*/}
                            {/*<HorizonLine/>*/}
                            <button>삭제하기</button>
                        </div>}
                </div>
            }
        </div>
        {isListView ?
            <Link href={`/review/${review.reviewId}`}>
                <div className="mb-2">
                    <SkeletonImage skeletonClassName="w-full aspect-square"
                                   imgClassName="w-full aspect-square rounded-lg border-gray-200 border"
                                   alt="리뷰 이미지"
                                   src={review.reviewImageList[0].imageUrl}/>
                </div>
                <div className="text-left px-1 break-all overflow-hidden line-clamp-1 overflow-ellipsis mb-2">
                    {review.contents}
                </div>
            </Link>
            :
            <>
                <div className="relative w-full max-w-lg mx-auto mb-5">
                    <div>
                        <SkeletonImage skeletonClassName="w-full aspect-square"
                                       imgClassName="w-full aspect-square rounded-lg border-gray-200 border"
                                       alt="리뷰 이미지"
                                       src={review.reviewImageList[currentIndex].imageUrl}/>

                        {currentIndex > 0 && (
                            <button
                                onClick={prevPhoto}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-75 hover:opacity-100">
                                <ChevronLeft size={24}/>
                            </button>
                        )}

                        {currentIndex < review.reviewImageList.length - 1 && (
                            <button
                                onClick={nextPhoto}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 opacity-75 hover:opacity-100"
                            >
                                <ChevronRight size={24}/>
                            </button>
                        )}
                    </div>

                    <div
                        className="absolute p-1 -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {review.reviewImageList.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-amber-400" : "bg-gray-200"}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="text-left px-1 break-all overflow-hidden line-clamp-1 overflow-ellipsis mb-2">
                    {review.contents}
                </div>
            </>
        }

        {/*<div className="flex justify-between text-2xl">*/}
        {/*    <div className="flex w-1/4 justify-between">*/}
        {/*        <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">*/}
        {/*            <IoHeartOutline/></div>*/}
        {/*        <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">*/}
        {/*            <LiaCommentAltSolid/></div>*/}
        {/*        <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">*/}
        {/*            <IoArrowRedoOutline/></div>*/}
        {/*    </div>*/}
        {/*    <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">*/}
        {/*        <IoBookmarkOutline/></div>*/}
        {/*</div>*/}
        {/*<div className="font-bold text-left text-sm">좋아요 1000개</div>*/}
        {/*<div className="text-left text-sm">*/}
        {/*    <div className="text-gray-400 flex flex-col gap-2">*/}
        {/*        <div>댓글 100개 모두 보기</div>*/}
        {/*        <div>댓글달기...</div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        {isListView && <HorizonLine/>}
    </div>
}

export default ReviewItem;