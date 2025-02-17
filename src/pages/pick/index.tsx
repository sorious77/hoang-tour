import {ChangeEvent, useEffect, useState} from "react";
import Map from "@/components/map";
import {GetServerSideProps} from "next";
import apiClient from "@/lib/apiClient";
import ApiError from "@/types/apiError";
import Button from "@/components/button";
import {getServerSession} from "next-auth";
import {nextAuthOption} from "@/pages/api/auth/[...nextauth]";

interface PageProps {
    lines: Line[] | null,
    stations: Station[] | null,
    message: string | null
}

const Pick = ({lines, stations, message}: PageProps) => {
    const [filteredStations, setFilteredStations] = useState<Station[] | null>(null)
    const [station, setStation] = useState<Station | null>(null)

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setFilteredStations(stations);
    }, [stations]);

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!stations) return;

        const {target: {value: targetLine}} = e;

        if (targetLine === "전체") {
            setFilteredStations(stations);
            return;
        }

        setFilteredStations(stations.filter(station => station.lineNameList.includes(targetLine)));
    }

    const getRandomStation = () => {
        if (!filteredStations) return;

        const randomIdx = Math.floor(Math.random() * filteredStations.length);

        setStation(filteredStations[randomIdx])
    }

    return <div>
        {lines ? <>
            <div className="flex justify-center gap-4 my-5">
                <select className="text-xl" defaultValue="0" onChange={handleOnChange}>
                    <option value="전체">전체</option>
                    {lines?.map(line => (
                        <option key={line.lineId} value={line.lineName}>{line.lineName}</option>
                    ))}
                </select>
                <Button onClick={getRandomStation} variant="outline" className="text-xl px-4 py-1" value="뽑기"/>
            </div>
            <>
                <div className="text-3xl"
                     style={{color: station?.lineColor || "black"}}>{station?.stationName}</div>
                <div className="my-2">{station?.lineNameList.join(", ")}</div>
                {
                    isClient && <Map station={station}/>
                }
            </>
        </> : <>
            {message}
        </>
        }

    </div>
}

export default Pick;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getServerSession(context.req, context.res, nextAuthOption);

        if (!session) {
            return {
                props: {}
            }
        }

        const {user: {accessToken}} = session;

        let lines: Line[] = await apiClient.get("/api/v1/lines/list",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

        lines = lines.sort((a, b) => {
            if (a.lineName < b.lineName) return -1;
            if (a.lineName > b.lineName) return 1;
            else return 0;
        })

        let stations: Station[] = await apiClient.get("/api/v1/stations/lines",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

        stations = stations.sort((a, b) => {
            if (a.stationName < b.stationName) return -1;
            if (a.stationName > b.stationName) return 1;
            else return 0;
        })

        return {
            props: {
                lines,
                stations
            }
        }
    } catch
        (e) {
        const message = (e instanceof ApiError) ? e.description : "처리 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.";

        return {
            props: {
                message
            }
        }
    }
}