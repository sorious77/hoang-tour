type Line = {
    lineId: number;
    lineName: string;
}

type Station = {
    stationId: number;
    stationName: string;
    stationEngName: string;
    latitude: number;
    longitude: number;
    description: string;
    lineNameList: string[];
    lineColor: string;
}