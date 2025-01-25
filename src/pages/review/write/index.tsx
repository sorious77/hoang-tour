import React, {useEffect, useState} from "react";
import Button from "@/components/button";
import {GetServerSideProps} from "next";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";
import apiClient from "@/lib/apiClient";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReviewProps} from "@/types/review";
import {useSession} from "next-auth/react";

interface PageProps {
    stations: Station[],
    email: string,
    message: string | null
}

const Page = ({stations, email}: PageProps) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [dropdown, setDropdown] = useState(false);
    const [station, setStation] = useState<string>("");

    const [filteredStations, setFilteredStations] = useState<Station[]>([]);
    const member = useSession();

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch
    } = useForm<ReviewProps>();

    useEffect(() => {
        if (imageUrls.length > 6) {
            setImageUrls(prev => prev.slice(0, 6))
            alert("사진은 최대 6장까지 업로드 가능합니다.");
        }
    }, [imageUrls]);

    useEffect(() => {
        if (station.length) {
            setFilteredStations(
                stations.filter(st => st.stationName.includes(station))
            )
        } else {
            setFilteredStations(stations)
        }
    }, [station]);

    const images = watch("images");
    useEffect(() => {
        if (images?.length > 0) {
            let urls: string[] = [];

            Array.from(images).forEach(image => {
                urls.push(URL.createObjectURL(image));
            })

            setImageUrls(urls);
        }
    }, [images]);

    const handleFileRemove = (targetUrl: string) => {
        setImageUrls(prev => prev.filter((url) => url !== targetUrl));
    }

    const handleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setDropdown(prev => !prev);
    }

    const handleStation = (stationName: string) => {
        setValue("stationName", stationName);
        setStation(stationName);
        setDropdown(false);
        console.log(station);
    }

    const onSubmit: SubmitHandler<ReviewProps> = async (data) => {
        const formData = new FormData();

        Array.from(data.images).forEach(file => {
            formData.append("imageList", file);
        })

        formData.append("title", data.title);
        formData.append("contents", data.contents);
        formData.append("memberId", "11");
        formData.append("email", email);
        formData.append("stationId", "17");
        formData.append("stationName", data.stationName);

        try {
            const result = await apiClient.post("/api/v1/reviews",
                formData
                , {
                    headers: {
                        Authorization: `Bearer ${member.data?.user.accessToken}`
                    }
                });

            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    return <div className="flex flex-col w-full pb-10 -mt-2">
        {/* 제목, 방문 날짜, 내용, 이미지 6장까지 */}
        <form className="w-full flex gap-5 flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Button
                className="sticky self-end top-2 px-2 py-1 mr-2 w-16"
                value="저장"
                type="submit"
            />
            <div className="w-full flex flex-col">
                <input id="title" className="border-b border-gray-200 px-4 py-1.5 w-full text-3xl focus:outline-none"
                       type="text"
                       placeholder="제목"
                       {...register("title", {
                           required: {
                               value: true,
                               message: "제목은 5자 이상 30자 이하로 입력해주세요"
                           },
                           minLength: {
                               value: 5,
                               message: "제목은 5자 이상 30자 이하로 입력해주세요"
                           }
                       })}
                />
                <div className="text-left px-2 mt-2 text-sm text-red-700">{errors?.title?.message}</div>
            </div>
            <div className="flex flex-col border border-gray-200 rounded-lg relative">
                <div className="flex w-full">
                    <input id="station" className="px-4 py-1.5 w-11/12 rounded-lg focus:outline-none"
                           type="text"
                           placeholder="역 이름"
                           value={station}
                           onFocus={() => setDropdown(true)}
                           {...register("stationName",
                               {
                                   onBlur: () => setDropdown(false),
                                   onChange: (e) => {
                                       setValue("stationName", e.target.value)
                                       setStation(e.target.value);
                                   }
                               }
                           )}
                    />
                    <button className="text-right w-1/12 pr-4" onClick={handleDropdown}>▼</button>
                </div>

                {(dropdown && filteredStations.length > 0) &&
                    <div
                        className="absolute z-10 bg-white text-left px-2 py-2 top-11 max-h-40 overflow-y-scroll w-full border border-gray-200 rounded-lg">
                        {filteredStations.map((station => (
                            <div key={station.stationId}
                                 className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-lg"
                                 onClick={() => {
                                     setValue("stationName", station.stationName);
                                     setStation(station.stationName);
                                     setDropdown(false);
                                 }}
                            >{station.stationName}</div>
                        )))}
                    </div>}
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <textarea id="contents"
                          className="border border-gray-200 rounded-lg px-4 py-1.5 w-full resize-none focus:outline-none"
                          placeholder="내용을 입력하세요."
                          rows={20}
                          {...register("contents", {
                              required: {
                                  value: true,
                                  message: "내용을 입력하세요"
                              },
                              minLength: {
                                  value: 10,
                                  message: "내용을 10자 이상 1000자 이하로 입력하세요"
                              },
                              maxLength: {
                                  value: 1000,
                                  message: "내용을 10자 이상 1000자 이하로 입력하세요"
                              }
                          })}
                />
                <div className="text-left px-2 mt-2 text-sm text-red-700">{errors?.contents?.message}</div>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-3 mb-10 px-2">
                    {imageUrls.map((url, i) => (
                        <div key={url} className="relative">
                            <img key={url} src={url} className="shadow rounded h-96 w-96" alt={`image${i}`}/>
                            <div
                                onClick={() => handleFileRemove(url)}
                                className="absolute -right-2 -top-2 bg-gray-200 text-black cursor-pointer rounded-full w-6 h-6 flex justify-center items-center">X
                            </div>
                        </div>
                    ))}
                </div>
                <label htmlFor="file"
                       className={`px-5 py-4 rounded-xl hover:cursor-pointer transition-colors ease-in-out
                       ${imageUrls.length >= 6 ? "border-none bg-gray-400 text-white hover:bg-gray-400 hover:cursor-not-allowed" :
                           "border border-amber-400 hover:bg-amber-400 hover:text-white text-amber-400"}`}>사진을
                    추가해주세요</label>
                <input className="absolute w-0 h-0 overflow-hidden border-none" type="file" id="file"
                       multiple={true}
                       disabled={imageUrls.length >= 6}
                       accept="image/*"
                       {...register("images")}
                />
            </div>
        </form>
    </div>
}

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getServerSession(context.req, context.res, nextAuthOption);

        const stations: Station[] = await apiClient.get(`/api/v1/stations/lines`,
            {
                headers: {
                    Authorization: `Bearer ${session?.user.accessToken}`
                }
            }
        );

        if (!stations) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: false,
                },
            }
        }

        return {
            props: {
                stations: stations.sort((a, b) => {
                    if (a.stationName < b.stationName) return -1;
                    if (a.stationName > b.stationName) return 1;
                    return 0;
                }),
                email: session?.user.email,
            }
        }
    } catch (e) {
        console.error(e);

        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        }
    }
}