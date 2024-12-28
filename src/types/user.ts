export type User = {
    email: string;
    nickname: string;
    profileImage: string;
    introduction: string;
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