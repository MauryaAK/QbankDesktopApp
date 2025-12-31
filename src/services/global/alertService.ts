import { AlertConfig } from "../../components/common/AlertModal/alert.types";

type ShowAlertFn = (config: AlertConfig) => void;

let showAlertRef: ShowAlertFn | null = null;

export const alertService = {
  register(fn: ShowAlertFn) {
    showAlertRef = fn;
  },

  show(config: Omit<AlertConfig, "open">) {
    showAlertRef?.({ ...config, open: true });
  },

  hide() {
    showAlertRef?.({
      open: false,
      title: "",
      message: "",
    });
  },
};
