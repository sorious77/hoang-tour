import {NextApiRequest, NextApiResponse} from "next";
import apiHandler from "@/lib/apiHandler";
import {User} from "@/types/user";

const handler = (
    req: NextApiRequest,
    res: NextApiResponse<User | null>
) => {
    const nickname = req.query.nickname as string;

    if (!nickname) return res.status(404).json(null);

    const result: User = {
        email: "hi",
        nickname,
        profileImage: "https://item.kakaocdn.net/do/ed9bfa677367ed21c2895cf3c5ed68b4d0bbab1214a29e381afae56101ded106",
        introduction: "찌오 처음봐? 팍씨"
    }

    return res.status(200).json(result);
}

export default apiHandler(handler, "GET")