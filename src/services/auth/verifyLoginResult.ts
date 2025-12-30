import { LoginResult, LoginResultCode } from "./loginResult.types";

export const verifyLoginResult = (res: any): LoginResult => {
    const data = res ?? {};

    const isError: boolean = Boolean(data.isError);
    const message: string = data.errorMessage || data.message || "";

    const normalized = message.toLowerCase();

    /* ================= SUCCESS ================= */
    if (!isError && data.token) {
        return {
            code: LoginResultCode.SUCCESS,
            message: "Login successful",
        };
    }

    if (isError) {
        if (
            normalized.includes("invalid device") ||
            normalized.includes("device inactive")
        ) {
            return {
                code: LoginResultCode.MACHINE_NOT_ACTIVATED,
                message:
                    message ||
                    "Your machine is registered but pending activation.",
            };
        }

        // 🔐 Invalid credentials
        if (
            normalized.includes("invalid") ||
            normalized.includes("incorrect") ||
            normalized.includes("credentials")
        ) {
            return {
                code: LoginResultCode.INVALID_CREDENTIALS,
                message:
                    message || "Invalid login ID or password.",
            };
        }

        // 🔒 Account locked
        if (normalized.includes("already logged in")) {
            return {
                code: LoginResultCode.USER_ALREADY_LOGGED_IN,
                message:
                    message || "Your account has been locked.",
            };
        }
    }

    /* ================= FALLBACK ================= */
    return {
        code: LoginResultCode.UNKNOWN_ERROR,
        message:
            message || "Something went wrong. Please try again.",
    };
};
