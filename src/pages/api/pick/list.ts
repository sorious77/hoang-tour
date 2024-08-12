import type {NextApiRequest, NextApiResponse} from "next";
import apiHandler from "@/lib/apiHandler";


const handler = (
    req: NextApiRequest,
    res: NextApiResponse<Station[] | null>,
) => {
    const result: Station[] = [
        {
            "name": "서울역",
            "lat": 37.5563,
            "lng": 126.9723,
            "engName": "Seoul Station"
        },
        {
            "name": "부산역",
            "lat": 35.1152,
            "lng": 129.0408,
            "engName": "Busan Station"
        },
        {
            "name": "대구역",
            "lat": 35.8714,
            "lng": 128.6014,
            "engName": "Daegu Station"
        },
        {
            "name": "인천역",
            "lat": 37.4763,
            "lng": 126.6165,
            "engName": "Incheon Station"
        },
        {
            "name": "광주역",
            "lat": 35.1595,
            "lng": 126.8526,
            "engName": "Gwangju Station"
        },
        {
            "name": "대전역",
            "lat": 36.3319,
            "lng": 127.4317,
            "engName": "Daejeon Station"
        },
        {
            "name": "울산역",
            "lat": 35.5384,
            "lng": 129.3114,
            "engName": "Ulsan Station"
        },
        {
            "name": "수원역",
            "lat": 37.2659,
            "lng": 127.0001,
            "engName": "Suwon Station"
        },
        {
            "name": "성남역",
            "lat": 37.4117,
            "lng": 127.128,
            "engName": "Seongnam Station"
        },
        {
            "name": "청주역",
            "lat": 36.6433,
            "lng": 127.4898,
            "engName": "Cheongju Station"
        },
        {
            "name": "제주역",
            "lat": 33.4996,
            "lng": 126.5312,
            "engName": "Jeju Station"
        },
        {
            "name": "포항역",
            "lat": 36.019,
            "lng": 129.3435,
            "engName": "Pohang Station"
        },
        {
            "name": "안양역",
            "lat": 37.401,
            "lng": 126.9228,
            "engName": "Anyang Station"
        },
        {
            "name": "창원역",
            "lat": 35.227,
            "lng": 128.6811,
            "engName": "Changwon Station"
        },
        {
            "name": "전주역",
            "lat": 35.8252,
            "lng": 127.1459,
            "engName": "Jeonju Station"
        },
        {
            "name": "춘천역",
            "lat": 37.8813,
            "lng": 127.7298,
            "engName": "Chuncheon Station"
        },
        {
            "name": "강릉역",
            "lat": 37.7519,
            "lng": 128.8761,
            "engName": "Gangneung Station"
        },
        {
            "name": "김해역",
            "lat": 35.2279,
            "lng": 128.8811,
            "engName": "Gimhae Station"
        },
        {
            "name": "경주역",
            "lat": 35.8497,
            "lng": 129.2114,
            "engName": "Gyeongju Station"
        },
        {
            "name": "여수역",
            "lat": 34.7604,
            "lng": 127.6622,
            "engName": "Yeosu Station"
        },
        {
            "name": "순천역",
            "lat": 34.9506,
            "lng": 127.4873,
            "engName": "Suncheon Station"
        },
        {
            "name": "진주역",
            "lat": 35.1923,
            "lng": 128.1317,
            "engName": "Jinju Station"
        },
        {
            "name": "김포역",
            "lat": 37.6154,
            "lng": 126.7158,
            "engName": "Gimpo Station"
        },
        {
            "name": "군산역",
            "lat": 35.9678,
            "lng": 126.7369,
            "engName": "Gunsan Station"
        },
        {
            "name": "원주역",
            "lat": 37.3422,
            "lng": 127.9207,
            "engName": "Wonju Station"
        },
        {
            "name": "천안역",
            "lat": 36.8151,
            "lng": 127.1139,
            "engName": "Cheonan Station"
        },
        {
            "name": "아산역",
            "lat": 36.7915,
            "lng": 127.1049,
            "engName": "Asan Station"
        },
        {
            "name": "목포역",
            "lat": 34.8118,
            "lng": 126.3922,
            "engName": "Mokpo Station"
        },
        {
            "name": "광명역",
            "lat": 37.416,
            "lng": 126.8665,
            "engName": "Gwangmyeong Station"
        },
        {
            "name": "성북역",
            "lat": 37.589,
            "lng": 127.016,
            "engName": "Seongbuk Station"
        },
        {
            "name": "의정부역",
            "lat": 37.7376,
            "lng": 127.0474,
            "engName": "Uijeongbu Station"
        },
        {
            "name": "하남역",
            "lat": 37.5407,
            "lng": 127.2058,
            "engName": "Hanam Station"
        },
        {
            "name": "파주역",
            "lat": 37.7602,
            "lng": 126.7792,
            "engName": "Paju Station"
        },
        {
            "name": "남양주역",
            "lat": 37.6363,
            "lng": 127.2164,
            "engName": "Namyangju Station"
        },
        {
            "name": "구리역",
            "lat": 37.5946,
            "lng": 127.1438,
            "engName": "Guri Station"
        },
        {
            "name": "동두천역",
            "lat": 37.9047,
            "lng": 127.0602,
            "engName": "Dongducheon Station"
        },
        {
            "name": "고양역",
            "lat": 37.6584,
            "lng": 126.8317,
            "engName": "Goyang Station"
        },
        {
            "name": "양주역",
            "lat": 37.7853,
            "lng": 127.0457,
            "engName": "Yangju Station"
        },
        {
            "name": "화성역",
            "lat": 37.1995,
            "lng": 126.8314,
            "engName": "Hwaseong Station"
        },
        {
            "name": "평택역",
            "lat": 36.9905,
            "lng": 127.0854,
            "engName": "Pyeongtaek Station"
        },
        {
            "name": "안산역",
            "lat": 37.3219,
            "lng": 126.8302,
            "engName": "Ansan Station"
        },
        {
            "name": "과천역",
            "lat": 37.4338,
            "lng": 126.8323,
            "engName": "Gwacheon Station"
        },
        {
            "name": "양평역",
            "lat": 37.4919,
            "lng": 127.4874,
            "engName": "Yangpyeong Station"
        },
        {
            "name": "이천역",
            "lat": 37.2794,
            "lng": 127.4429,
            "engName": "Icheon Station"
        },
        {
            "name": "여주역",
            "lat": 37.2987,
            "lng": 127.6372,
            "engName": "Yeoju Station"
        },
        {
            "name": "가평역",
            "lat": 37.8315,
            "lng": 127.5096,
            "engName": "Gapyeong Station"
        },
        {
            "name": "양양역",
            "lat": 38.075,
            "lng": 128.6197,
            "engName": "Yangyang Station"
        },
        {
            "name": "삼척역",
            "lat": 37.4492,
            "lng": 129.1653,
            "engName": "Samcheok Station"
        },
        {
            "name": "동해역",
            "lat": 37.5243,
            "lng": 129.1143,
            "engName": "Donghae Station"
        }
    ]

    return res.status(200).json(result);
}

export default apiHandler(handler, "GET")