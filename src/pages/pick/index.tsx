import {useEffect, useState} from "react";
import axios from "axios";


const Pick = () => {
    const [stations, setStations] = useState<Station[] | null>(null)
    const [station, setStation] = useState<Station | null>(null)

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
            Gacha!
        </button>
        <div>{station?.name}</div>
    </div>
}

export default Pick;