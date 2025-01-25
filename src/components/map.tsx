import {NaverMap, useNavermaps, Container, Marker} from "react-naver-maps";
import {useEffect, useState} from "react";

const Map = ({station}: { station: Station | null }) => {
    const navermaps = useNavermaps();
    const [map, setMap] = useState<naver.maps.Map | null>(null);

    useEffect(() => {
        if (station && map) {
            map.setCenter(new navermaps.LatLng(station.latitude, station.longitude))
        }
    }, [map, station]);

    if (!station) return null;

    return <div className="w-[350px] h-[450px] sm:w-[500px] md:w-[700px] lg:w-[900px] bg-gray-400">
        <Container className="w-full h-full shadow border border-gray-200">
            <NaverMap
                defaultCenter={new navermaps.LatLng(station.latitude, station.longitude)}
                defaultZoom={15}
                ref={setMap}
            >
                <Marker defaultPosition={new navermaps.LatLng(37.5563, 127.9723)}
                />
            </NaverMap>
        </Container>
    </div>
}

export default Map;