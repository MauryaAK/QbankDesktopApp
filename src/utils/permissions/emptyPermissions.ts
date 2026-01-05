import { normalizePermissions } from "./normalizePermissions";

export const buildEmptyPermissions = (masters: any[]) => {
  return masters.map((group) => ({
    permission: group.permission,
    permissionList: group.permissionList.map((item: any) => ({
      ...item,
      isActive: false, // 🔥 FORCE FALSE
    })),
  }));
};
