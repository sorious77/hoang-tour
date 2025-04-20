"use client";

import {useState, useEffect, useCallback} from "react";
import Button from "@/components/button";
import apiClient from "@/lib/apiClient";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReviewProps} from "@/types/review";
import {useSession} from "next-auth/react";
import {GetServerSideProps} from "next";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";
import {useRouter} from "next/navigation";

interface Station {
    stationId: string;
    stationName: string;
}

interface PageProps {
    stations: Station[];
    email: string;
    memberId: string;
}

const Page = ({stations, email, memberId}: PageProps) => {
    const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm<ReviewProps>();
    const session = useSession();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [dropdown, setDropdown] = useState(false);
    const [station, setStation] = useState("");
    const [filteredStations, setFilteredStations] = useState<Station[]>(stations);

    const images = watch("images");

    const router = useRouter();

    // 이미지 파일 URL 업데이트
    useEffect(() => {
        if (!images?.length) return;
        setImageUrls(Array.from(images).map(file => URL.createObjectURL(file)));
    }, [images]);

    // 6장 이상 업로드 방지
    useEffect(() => {
        if (imageUrls.length > 6) {
            setImageUrls(prev => prev.slice(0, 6));
            alert("사진은 최대 6장까지 업로드 가능합니다.");
        }
    }, [imageUrls]);

    // 역 이름 검색 필터링
    useEffect(() => {
        setFilteredStations(
            station.trim() ? stations?.filter(st => st.stationName.includes(station)) : stations
        );
    }, [station, stations]);

    // 드롭다운 핸들링 (버그 해결)
    const handleStationChange = useCallback((value: string) => {
        setStation(value);
        if (value.trim()) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    }, []);

    const handleStationSelect = useCallback((selected: string) => {
        setValue("stationName", selected);
        setStation(selected);
        setDropdown(false);
    }, [setValue]);

    const handleFileRemove = useCallback((targetUrl: string) => {
        setImageUrls(prev => prev.filter(url => url !== targetUrl));
    }, []);

    // 리뷰 저장 핸들러
    const onSubmit: SubmitHandler<ReviewProps> = async (data) => {
        if (!confirm("저장하시겠습니까? 저장 이후엔 수정이 불가능합니다.")) return;

        const targetStation = stations.filter(item => item.stationName === station)[0];

        const formData = new FormData();
        Array.from(data.images).forEach(file => formData.append("imageList", file));

        formData.append("title", data.title);
        formData.append("contents", data.contents);
        formData.append("memberId", memberId);
        formData.append("email", email);
        formData.append("stationId", targetStation.stationId);
        formData.append("stationName", data.stationName);

        try {
            await apiClient.post("/api/v1/reviews", formData, {
                headers: {Authorization: `Bearer ${session.data?.user.accessToken}`}
            });

            router.push("/review");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex flex-col w-full pb-10 -mt-2">
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <Button className="sticky self-end top-2 px-2 py-1 mr-2 w-16" value="저장" type="submit"/>

                {/* 제목 입력 */}
                <div className="w-full flex flex-col">
                    <input
                        id="title"
                        className="border-b border-gray-200 px-4 py-1.5 w-full text-3xl focus:outline-none"
                        placeholder="제목"
                        {...register("title", {
                            required: "제목은 5자 이상 30자 이하로 입력해주세요",
                            minLength: {value: 5, message: "제목은 5자 이상 30자 이하로 입력해주세요"}
                        })}
                    />
                    <div className="text-sm text-red-700 px-2 mt-2">{errors?.title?.message}</div>
                </div>

                {/* 역 이름 입력 */}
                <div className="relative flex flex-col border border-gray-200 rounded-lg">
                    <div className="flex w-full">
                        <input
                            id="station"
                            className="px-4 py-1.5 w-11/12 rounded-lg focus:outline-none"
                            placeholder="역 이름"
                            value={station}
                            onFocus={() => setDropdown(true)}
                            onChange={(e) => handleStationChange(e.target.value)}
                        />
                        <button
                            className="text-right w-1/12 pr-4"
                            type="button"
                            onClick={() => setDropdown(prev => !prev)}
                        >
                            ▼
                        </button>
                    </div>

                    {dropdown && filteredStations?.length > 0 && (
                        <div
                            className="absolute z-10 bg-white text-left px-2 py-2 top-11 max-h-40 overflow-y-scroll w-full border border-gray-200 rounded-lg"
                            onMouseDown={(e) => e.preventDefault()} // 드롭다운 클릭 시 닫히는 문제 해결
                        >
                            {filteredStations.map(st => (
                                <div
                                    key={st.stationId}
                                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                                    onClick={() => handleStationSelect(st.stationName)}
                                >
                                    {st.stationName}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 내용 입력 */}
                {errors?.contents?.message &&
                    <div className="text-sm text-red-700 px-2 mt-2">{errors?.contents?.message}</div>}
                <textarea
                    id="contents"
                    className="border border-gray-200 rounded-lg px-4 py-1.5 w-full resize-none focus:outline-none"
                    placeholder="내용을 입력하세요."
                    rows={20}
                    {...register("contents", {
                        required: "내용을 입력하세요",
                        minLength: {value: 10, message: "내용을 10자 이상 1000자 이하로 입력하세요"},
                        maxLength: {value: 1000, message: "내용을 10자 이상 1000자 이하로 입력하세요"}
                    })}
                />

                <div>
                    <div className="grid grid-cols-3 gap-3 mb-10 px-2">
                        {imageUrls.map(url => (
                            <div key={url} className="relative">
                                <img src={url} className="shadow rounded h-96 w-96" alt="image preview"/>
                                <div
                                    onClick={() => handleFileRemove(url)}
                                    className="absolute -right-2 -top-2 bg-gray-200 text-black cursor-pointer rounded-full w-6 h-6 flex justify-center items-center">
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                    <label
                        className={`px-5 py-4 rounded-xl cursor-pointer border ${imageUrls.length >= 6 ? "bg-gray-400 text-white cursor-not-allowed" : "border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white"}`}>
                        사진을 추가해주세요
                        <input type="file" className="hidden" multiple accept="image/*" {...register("images")}
                               disabled={imageUrls.length >= 6}/>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // 세션 가져오기 (사용자 인증 정보)
        const session = await getServerSession(context.req, context.res, nextAuthOption);
        if (!session?.user?.accessToken) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
            };
        }

        // API 요청 (역 정보 가져오기)
        const stations: Station[] = await apiClient.get("/api/v1/stations/lines", {
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
            },
        });

        // 유효한 데이터인지 확인
        if (!stations || stations.length === 0) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                stations: stations.sort((a, b) => a.stationName.localeCompare(b.stationName)),
                email: session.user.email,
                memberId: session.user.memberId
            },
        };
    } catch (error) {
        console.error("Error fetching stations:", error);

        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};