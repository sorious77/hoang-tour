export type User = {
    email: string;
    nickname: string;
    profileImage: string | null;
    introduction: string;
    accessToken: string;
    refreshToken: string;
}

export type Profile = {
    email: string,
    nickname: string,
    introduction: string,
    review: any[],
    totalFollwerCount: number,
    totalFollowingCount: number
}

export type SignUpProps = {
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
}

export type SignInProps = {
    email: string;
    password: string;
}