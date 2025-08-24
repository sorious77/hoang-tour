import axios from "axios";
import getConfig from "next/config";
import ApiError from "@/types/apiError";
import {API_SUCCESS_CODE} from "@/lib/constants";

const {publicRuntimeConfig} = getConfig();

const apiClient = axios.create({
    baseURL: publicRuntimeConfig.apiBaseUrl,
    withCredentials: true,
})

apiClient.interceptors.request.use(async (config) => {
    if (typeof window !== "undefined") {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => {
        const result: BaseResponse<any> = response.data;

        // `code` 값이 성공 코드가 아닌 경우 에러 처리
        if (result.code !== API_SUCCESS_CODE) {
            throw new ApiError(result)
        }

        return result.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;