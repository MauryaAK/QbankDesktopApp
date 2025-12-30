import { AlertConfig } from "../../components/common/AlertModal/alert.types";

type ShowAlertFn = (config: Omit<AlertConfig, "open">) => void;

let showAlertRef: ShowAlertFn | null = null;

export const alertService = {
  register(fn: ShowAlertFn) {
    showAlertRef = fn;
  },

  show(config: Omit<AlertConfig, "open">) {
    if (showAlertRef) {
      showAlertRef(config);
    }
  },
};
