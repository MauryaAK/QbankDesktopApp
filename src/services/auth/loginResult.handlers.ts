import { loginSuccess } from "../../features/auth/authSlice";
import { LoginResult, LoginResultCode } from "./loginResult.types";
import type { AppDispatch } from "../../store/store";
export const createLoginResultHandlers = (
  dispatch: AppDispatch,
  navigate: (path: string) => void,
  showAlert: (config: any) => void,
  hideAlert: () => void,
  apiRes: any
): Record<LoginResultCode, (result: LoginResult) => void> => ({
  [LoginResultCode.SUCCESS]: () => {
    navigate("/dashboard");
    dispatch(
      loginSuccess(apiRes)
    );
  },

  [LoginResultCode.MACHINE_NOT_ACTIVATED]: (result) => {
    showAlert({
      title: "Machine Activation Required",
      message: result.message,
      variant: "error",
      onClose: hideAlert,
    });
  },

  [LoginResultCode.INVALID_CREDENTIALS]: (result) => {
    showAlert({
      title: "Invalid Credentials",
      message: result.message,
      variant: "warning",
      onClose: hideAlert,
    });
  },

  [LoginResultCode.USER_ALREADY_LOGGED_IN]: (result) => {
    showAlert({
      title: "Already logged In",
      message: `User already logged in on another machine.\n Machine Name:${apiRes.deviceName} \n Do you wish to continue`,
      variant: "error",
      onClose: hideAlert,
    });
  },

  [LoginResultCode.UNKNOWN_ERROR]: (result) => {
    showAlert({
      title: "Login Failed",
      message: result.message,
      variant: "error",
      onClose: hideAlert,
    });
  },
});
