import { GetServerSideProps } from "next";
import HorizonLine from "@/components/horizonLine";
import type { Profile } from "@/types/user";
import apiClient from "@/lib/apiClient";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOption } from "@/pages/api/auth/[...nextauth]";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import { useSession } from "next-auth/react";

// 간단한 스켈레톤 컴포넌트
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className || ""}`} />
);

const Profile = ({
  user: initialUser,
  isCurrentUser,
}: {
  user: Profile;
  isCurrentUser: boolean | null;
}) => {
  const imageServerBaseUrl =
    process.env.NEXT_PUBLIC_IMAGE_SERVER_BASE_URL || "";
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<Profile>(initialUser);
  const [reviews, setReviews] = useState(initialUser.reviews || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(
    null
  ) as MutableRefObject<IntersectionObserver | null>;
  const lastReviewRef = useRef<HTMLDivElement | null>(
    null
  ) as MutableRefObject<HTMLDivElement | null>;

  const profileImage =
    "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106";

  const fetchReviews = useCallback(
    async (pageNum: number) => {
      if (!session?.user?.accessToken) return;

      try {
        setLoading(true);
        const response: Profile = await apiClient.get(
          `/api/v1/members/profile?nickname=${user.nickname}&pageNumber=${pageNum}`
        );

        if (pageNum === 1) {
          setReviews(response.reviews || []);
        } else {
          setReviews((prev) => [...prev, ...(response.reviews || [])]);
        }

        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (!response.reviews || response.reviews.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("리뷰를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [session?.user?.accessToken, user.nickname]
  );

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (lastReviewRef.current) {
      observer.observe(lastReviewRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  // 페이지 변경 시 리뷰 가져오기
  useEffect(() => {
    if (page > 1) {
      fetchReviews(page);
    }
  }, [page, fetchReviews]);

  // 마지막 리뷰 요소에 ref 설정
  const setLastReviewRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current?.observe(node);
      lastReviewRef.current = node;
    }
  }, []);

  return (
    <div>
      <div className="flex gap-10 py-10 w-[400px] sm:w-[500px] md:w-[700px] justify-center lg:w-[850px]">
        <div className="ml-10 w-28 h-28 flex justify-center">
          <img
            src={profileImage}
            className="rounded-full border border-gray-200"
            alt="프로필 이미지"
          />
        </div>
        <div className="text-left flex flex-col justify-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{user.nickname}</span>
          </div>
          <div className="flex gap-3">
            <div>
              팔로워{" "}
              <span className="font-bold">{user.totalFollwerCount || 0}</span>
            </div>
            <div>
              팔로잉{" "}
              <span className="font-bold">{user.totalFollowingCount || 0}</span>
            </div>
          </div>
          <div>{user.introduction || ""}</div>
        </div>
      </div>
      <div className="mb-10">
        <HorizonLine />
      </div>
      <div className="mb-10 w-[400px] sm:w-[500px] md:w-[700px] lg:w-[850px]">
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {reviews.map((review, idx) => (
              <div
                key={`_${idx}`}
                ref={idx === reviews.length - 1 ? setLastReviewRef : undefined}
                className="relative group cursor-pointer"
              >
                <img
                  className="aspect-square object-cover group-hover:brightness-75 transition rounded border w-96"
                  src={`${imageServerBaseUrl}${review.imageUrl}`}
                  onClick={() => router.push(`/review/${review.reviewId}`)}
                  alt="게시글"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="col-end-3 flex flex-col gap-5 items-center">
            작성한 리뷰가 없습니다.
            {isCurrentUser && (
              <Button
                value="리뷰 작성하기"
                className="w-1/2 py-2"
                variant="outline"
                onClick={() => router.push("/review/write")}
              />
            )}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="aspect-square w-96" />
            ))}
          </div>
        )}

        {!hasMore && reviews.length > 0 && (
          <div className="text-gray-500 text-center py-4">
            모든 리뷰를 불러왔습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const params = context.params;

    if (!params || !params.nickname || typeof params.nickname !== "string") {
      return {
        redirect: {
          destination: "/profile/404",
          permanent: false,
        },
      };
    }

    const { nickname } = params;

    const user: Profile = await apiClient.get(
      `/api/v1/members/profile?nickname=${nickname}&pageNumber=1`
    );

    const session = await getServerSession(
      context.req,
      context.res,
      nextAuthOption
    );

    if (!user) {
      return {
        redirect: {
          destination: "/profile/404",
          permanent: true,
        },
      };
    }

    return {
      props: {
        user,
        isCurrentUser: session?.user?.nickname === user.nickname,
      },
    };
  } catch (e) {
    console.error(e);

    return {
      redirect: {
        destination: "/profile/404",
        permanent: true,
      },
    };
  }
};
