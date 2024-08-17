import {IoEllipsisHorizontalSharp, IoHeartOutline, IoBookmarkOutline, IoArrowRedoOutline} from "react-icons/io5";
import {LiaCommentAltSolid} from "react-icons/lia";
import {SkeletonImage} from "@/components/skeleton";
import HorizonLine from "@/components/horizonLine";


const Article = (article: Article) => {
    return <div className="w-full sm:w-5/6 lg:w-2/3 flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 w-1/2">
                <SkeletonImage skeletonClassName="w-4 h-4" imgClassName="w-10 h-10 rounded-full border border-gray-300"
                               src={article.user.profileImage} alt="프로필 이미지"/>
                <div className="flex gap-2 text-sm">
                    <div className="font-semibold">{article.user.id}</div>
                    ·
                    <div className="text-gray-500">3일</div>
                </div>
            </div>
            <IoEllipsisHorizontalSharp/>
        </div>
        <div>
            <SkeletonImage skeletonClassName="w-full aspect-square"
                           imgClassName="w-full aspect-square rounded-lg border-gray-200 border"
                           alt="호엥"
                           src={article.photos[0].url}/>
        </div>
        <div className="flex justify-between text-2xl">
            <div className="flex w-1/4 justify-between">
                <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">
                    <IoHeartOutline/></div>
                <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">
                    <LiaCommentAltSolid/></div>
                <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">
                    <IoArrowRedoOutline/></div>
            </div>
            <div className="cursor-pointer hover:text-gray-400 transition-colors duration-100 ease-in-out">
                <IoBookmarkOutline/></div>
        </div>
        <div className="font-bold text-left text-sm">좋아요 1000개</div>
        <div className="text-left text-sm">
            <div>

            </div>
            <div className="text-gray-400 flex flex-col gap-2">
                <div>댓글 100개 모두 보기</div>
                <div>댓글달기...</div>
            </div>
        </div>
        <HorizonLine/>
    </div>
}

export default Article;