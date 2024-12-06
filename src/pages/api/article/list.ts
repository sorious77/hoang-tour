import type {NextApiRequest, NextApiResponse} from "next";
import apiHandler from "@/lib/apiHandler";

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<Article[] | null>,
) => {
    const result: Article[] = [
        {
            id: "1",
            title: "Exploring Seoul Station",
            description: "A deep dive into the history and importance of Seoul Station.",
            stationName: "서울역",
            user: {
                email: "user_1",
                nickname: "유저1",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저1"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-01-15T08:00:00Z"),
            updatedAt: new Date("2023-01-15T08:00:00Z")
        },
        {
            id: "2",
            title: "The Beauty of Busan Station",
            description: "Discovering the modern architecture of Busan Station.",
            stationName: "부산역",
            user: {
                email: "user_2",
                nickname: "유저2",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저2"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-02-10T10:30:00Z"),
            updatedAt: new Date("2023-02-11T11:00:00Z")
        },
        {
            id: "3",
            title: "A Guide to Daegu Station",
            description: "Everything you need to know about traveling through Daegu Station.",
            stationName: "대구역",
            user: {
                email: "user_3",
                nickname: "유저3",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저3"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-03-05T12:00:00Z"),
            updatedAt: new Date("2023-03-05T12:00:00Z")
        },
        {
            id: "4",
            title: "Incheon Station: Gateway to Korea",
            description: "How Incheon Station serves as a key transportation hub in Korea.",
            stationName: "인천역",
            user: {
                email: "user_4",
                nickname: "유저4",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저4"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-04-01T09:15:00Z"),
            updatedAt: new Date("2023-04-01T09:15:00Z")
        },
        {
            id: "5",
            title: "Gwangju Station: A Hidden Gem",
            description: "Exploring the cultural significance of Gwangju Station.",
            stationName: "광주역",
            user: {
                email: "user_5",
                nickname: "유저5",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저5"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-04-20T13:45:00Z"),
            updatedAt: new Date("2023-04-20T14:00:00Z")
        },
        {
            id: "6",
            title: "Navigating Daejeon Station",
            description: "Tips and tricks for a smooth journey through Daejeon Station.",
            stationName: "대전역",
            user: {
                email: "user_6",
                nickname: "유저6",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저6"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-05-10T07:30:00Z"),
            updatedAt: new Date("2023-05-10T07:30:00Z")
        },
        {
            id: "7",
            title: "Ulsan Station: The Industrial Heart",
            description: "Understanding Ulsan Station's role in Korea's industrial sector.",
            stationName: "울산역",
            user: {
                email: "user_7",
                nickname: "유저7",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저7"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-06-01T10:00:00Z"),
            updatedAt: new Date("2023-06-01T10:00:00Z")
        },
        {
            id: "8",
            title: "Suwon Station: A Traveler's Hub",
            description: "Why Suwon Station is a must-visit for travelers in Korea.",
            stationName: "수원역",
            user: {
                email: "user_8",
                nickname: "유저8",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저8"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-07-15T15:00:00Z"),
            updatedAt: new Date("2023-07-15T15:30:00Z")
        },
        {
            id: "9",
            title: "Seongnam Station: The New Frontier",
            description: "How Seongnam Station is shaping the future of transportation.",
            stationName: "성남역",
            user: {
                email: "user_9",
                nickname: "유저9",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저9"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-08-10T08:30:00Z"),
            updatedAt: new Date("2023-08-10T08:45:00Z")
        },
        {
            id: "10",
            title: "Cheongju Station: Connecting the Dots",
            description: "The importance of Cheongju Station in Korea's rail network.",
            stationName: "청주역",
            user: {
                email: "user_10",
                nickname: "유저10",
                profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
                introduction: "유저10"
            },
            photos: [{url: "https://i.pinimg.com/736x/9b/65/29/9b6529111b01c8c261d7f83df3dd6c08.jpg"}],
            createdAt: new Date("2023-09-05T11:00:00Z"),
            updatedAt: new Date("2023-09-05T11:00:00Z")
        }
    ];

    return res.status(200).json(result);
}

export default apiHandler(handler, "GET");