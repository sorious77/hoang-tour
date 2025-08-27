import ReviewItem from "@/components/reviewItem";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { GetServerSideProps } from "next";
import { Review } from "@/types/review";
import { requireServerSideAuth } from "@/lib/auth";
import Button from "@/components/button";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import { useSession } from "next-auth/react";
// 간단한 스켈레톤 컴포넌트를 인라인으로 정의
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-300 rounded-lg ${className || ""}`} />
);

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(
    null
  ) as MutableRefObject<IntersectionObserver | null>;
  const lastReviewRef = useRef<HTMLDivElement | null>(
    null
  ) as MutableRefObject<HTMLDivElement | null>;

  const fetchReviews = useCallback(
    async (pageNum: number) => {
      if (!session?.user?.accessToken) return;

      try {
        setLoading(true);
        const response: Review[] = await apiClient.get(
          `/api/v1/reviews/list/${pageNum}`
        );

        if (pageNum === 0) {
          setReviews(response);
        } else {
          setReviews((prev) => [...prev, ...response]);
        }

        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (response.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("리뷰를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [session?.user?.accessToken]
  );

  // 초기 로딩
  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchReviews(0);
    }
  }, [session?.user?.accessToken, fetchReviews]);

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
    if (page > 0) {
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

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center w-full">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full max-w-2xl h-32 mb-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div
            key={review.reviewId}
            ref={index === reviews.length - 1 ? setLastReviewRef : undefined}
            className="w-full flex justify-center"
          >
            <ReviewItem review={review} isListView />
          </div>
        ))
      ) : (
        <div className="flex flex-col">
          <div className="mb-4">작성된 리뷰가 없습니다.</div>
          <Button
            value="리뷰 작성하기"
            className="py-2"
            variant="outline"
            onClick={() => router.push("/review/write")}
          />
        </div>
      )}

      {loading && (
        <div className="w-full max-w-2xl mt-4">
          <Skeleton className="w-full h-32 mb-4" />
        </div>
      )}

      {!hasMore && reviews.length > 0 && (
        <div className="text-gray-500 text-center py-4">
          모든 리뷰를 불러왔습니다.
        </div>
      )}

      <Link
        href="/review/write"
        className="fixed bottom-20 right-5 md:right-20 border-2 border-gray-600 rounded-full p-3 cursor-pointer hover:text-gray-500 hover:border-gray-500"
      >
        <FaRegPenToSquare className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const authResult = await requireServerSideAuth(context);

    // redirect가 반환된 경우 처리
    if (authResult.redirect) {
      return authResult;
    }

    return {
      props: {},
    };
  } catch (e) {
    console.error(e);

    return {
      props: {},
    };
  }
};
