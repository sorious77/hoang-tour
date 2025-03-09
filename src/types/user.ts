export type User = {
    memberId: number;
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
    reviews: ProfileReview[],
    totalFollwerCount: number,
    totalFollowingCount: number
}

type ProfileReview = {
    reviewId: number;
    imageUrl: string;
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