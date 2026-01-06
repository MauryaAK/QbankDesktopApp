import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { buildEmptyPermissions } from "../../../utils/permissions/emptyPermissions";

interface Props {
  rows: any[];
  isEdit: boolean;
  permission: any;
  setOriginalRow: (row: any) => void;
}

const PermissionEffectListener = ({
  rows,
  isEdit,
  permission,
  setOriginalRow,
}: Props) => {
  const { values } = useFormikContext<any>();
  const prev = useRef<any>(null);

  useEffect(() => {
    if (values.reportTo === prev.current) return;
    prev.current = values.reportTo;

    if (!values.reportTo) {
      permission.reset();
      setOriginalRow(null);
      return;
    }

    const parent = rows.find((r) => r.sno === values.reportTo);
    if (!parent) return;

    setOriginalRow(parent);

    if (!isEdit) {
      permission.init(
        buildEmptyPermissions(parent.rolePermission)
      );
    } else {
      permission.init(parent.rolePermission);
    }
  }, [values.reportTo]);

  return null;
};

export default PermissionEffectListener;
