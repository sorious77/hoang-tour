type BaseResponse<T> = {
    code: number,
    description: string,
    data?: T
}
