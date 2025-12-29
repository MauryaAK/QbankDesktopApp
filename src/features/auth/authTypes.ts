/* ================= API RESPONSE TYPES ================= */

export interface UserPermissionItem {
  menu: string;
  isActive: boolean;
}

export interface UserPermissionGroup {
  permission: string;
  permissionList: UserPermissionItem[];
}

export interface LoginApiResponse {
  userId: number;
  userName: string;
  roleName: string;
  updatePassword: boolean;
  userPermission: UserPermissionGroup[];
  deviceName: string | null;
  token: string;
  tokenExpiry: string;
  isError: boolean;
  errorMessage: string | null;
}

/* ================= REDUX USER MODEL ================= */

export interface User {
  id: number;
  name: string;
  role: string;
  permissions: UserPermissionGroup[];
  updatePassword: boolean;
}
