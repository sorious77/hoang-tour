import {NextApiRequest, NextApiResponse} from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void

type Method = "GET" | "POST" | "PUT" | "DELETE"

const apiHandler = (handler: Handler, method: Method) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            if (req.method !== method) {
                return res.status(405).json({message: `Method ${req.method} Not Allowed`})
            }

            await handler(req, res)
        } catch (e) {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
}

export default apiHandler;