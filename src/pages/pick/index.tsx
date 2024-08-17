import {useEffect, useState} from "react";
import axios from "axios";
import Map from "@/components/map";


const Pick = () => {
    const [stations, setStations] = useState<Station[] | null>(null)
    const [station, setStation] = useState<Station | null>(null)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get("/api/pick/list");

            setStations(data);
        })();
    }, []);

    const getRandomStation = () => {
        if (!stations) return;

        const randomIdx = Math.floor(Math.random() * stations.length);

        setStation(stations[randomIdx])
    }

    return <div>
        <button onClick={getRandomStation}>
            뽑기!
        </button>
        <>
            <div>{station?.name}</div>
            {isClient
                && <Map station={station}/>}
        </>
    </div>
}

export default Pick;