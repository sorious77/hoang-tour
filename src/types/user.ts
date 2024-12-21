export type User = {
    email: string;
    nickname: string;
    profileImage: string;
    introduction: string;
}

export type SignUpProps = {
    email: string;
    password: string;
    passwordConfirm: string;
}