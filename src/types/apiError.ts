export default class ApiError<T> extends Error {
    public code: number;
    public description: string;

    constructor(baseResponse: BaseResponse<T>) {
        super(baseResponse.description); // 기본 Error의 메시지로 설정
        this.code = baseResponse.code;
        this.description = baseResponse.description;
    }
}