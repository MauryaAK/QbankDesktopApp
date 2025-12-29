export enum LoginResultCode {
  SUCCESS = "SUCCESS",
  MACHINE_NOT_ACTIVATED = "MACHINE_NOT_ACTIVATED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  USER_LOCKED = "USER_LOCKED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface LoginResult {
  code: LoginResultCode;
  message: string;
}
