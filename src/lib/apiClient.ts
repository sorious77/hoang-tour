import axios from "axios";
import getConfig from "next/config";
import ApiError from "@/types/apiError";

const {publicRuntimeConfig} = getConfig();

const apiClient = axios.create({
    baseURL: publicRuntimeConfig.apiBaseUrl,
    withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
    }

    return config;
})

apiClient.interceptors.response.use(
    (response) => {
        if (typeof window !== "undefined" && response.config.url === "/api/v1/members/signIn" && response.data?.data?.token) {
            // cookie setting
            const {data: {data: {token}}} = response;

            document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
        }

        const result: BaseResponse<any> = response.data;

        // `code` 값이 1000이 아닌 경우 에러 처리
        if (result.code !== 1000) {
            throw new ApiError(result)
        }

        return result.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;