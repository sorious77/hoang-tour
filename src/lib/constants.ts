// API 관련 상수
export const API_SUCCESS_CODE = 1000;

// 인증 관련 상수
export const SESSION_MAX_AGE = 60 * 60; // 1시간

// 유효성 검사 관련 상수
export const VALIDATION = {
    EMAIL: {
        PATTERN: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        MESSAGE: "이메일 형식이 올바르지 않습니다."
    },
    NICKNAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 30,
        PATTERN: /^(?=.*[a-z_.])[a-z0-9_.]{2,30}$/,
        MESSAGE: "닉네임은 2자 이상 30자 이하, 숫자를 제외하고 영문/특수문자(_, .)를 최소 하나 이상씩을 포함해야 합니다."
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 15,
        PATTERN: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        MESSAGE: "비밀번호는 8자 이상 15자 이하, 영문/숫자/특수문자 최소 하나 이상씩을 포함해야 합니다."
    }
};

// 에러 메시지
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    LOGIN_REQUIRED: "로그인이 필요합니다.",
    PASSWORD_MISMATCH: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    SIGNUP_SUCCESS: "회원가입에 성공했습니다.",
    SIGNUP_ERROR: "회원 가입 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
    LOGIN_ERROR: "로그인 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요."
};
