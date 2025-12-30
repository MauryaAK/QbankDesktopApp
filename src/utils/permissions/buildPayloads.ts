// utils/permissions/buildPermissionPayload.ts
export const buildPermissionPayload = (
  originalRow: any,
  editForm: any,
  permissionState: Record<string, Set<string>>,
  userId: number
) => {
  return {
    ...originalRow,

    role: editForm.role,
    reportTo: editForm.reportTo,
    isActive: editForm.isActive,

    rolePermission: originalRow.rolePermission.map((group: any) => {
      const selected = permissionState[group.permission] ?? new Set();

      return {
        ...group,
        permissionList: group.permissionList.map((item: any) => ({
          ...item,
          isActive: selected.has(item.menu),
        })),
      };
    }),

    userId,
  };
};


// utils/buildUserPayload.ts
export const buildUserPayload = (
  originalRow: any,
  form: any,
  userId: number
) => {
  return {
    ...originalRow, // keeps sno or backend-required keys

    userName: originalRow.userName, // immutable
    name: form.name,
    emailId: form.emailId,
    contactNumber: form.contactNumber,
    roleName: form.roleName,
    isActive: form.isActive,

    userId, // mandatory for backend
  };
};



// utils/buildAircraftTypePayload.ts
export const buildAircraftTypePayload = (
  originalRow: any,
  form: any,
  userId: number
) => {
  return {
    sno: originalRow.sno,
    aircraftType: originalRow.aircraftType, // immutable
    isActive: form.isActive,
    userId,
  };
};

// src/utils/buildAtaPayload.ts

export const buildAtaPayload = (
  originalRow: any,
  editForm: any,
  aircraftState: Record<string, Set<string>>,
  userId: number
) => {
  // 👇 preserve original order from row
  const originalOrder = originalRow.aircraftType
    ? originalRow.aircraftType.split(",").map((v: string) => v.trim())
    : [];

  // 👇 selected aircraft (from UI)
  const selectedSet = aircraftState.aircraftType ?? new Set<string>();

  // 👇 rebuild CSV in ORIGINAL ORDER
  const aircraftCsv = originalOrder
    .filter((v: string) => selectedSet.has(v))
    .join(",");

  return {
    sno: originalRow.sno,
    ataCode: originalRow.ataCode,
    ataDescription: editForm.ataDescription,
    aircraftType: aircraftCsv, // ✅ EXACT MATCH
    isActive: editForm.isActive,
    userId,
  };
};


export const buildDosDontPayload = (
  originalRow: any,
  editForm: any,
  userId: number
) => {
  return {
    sno: originalRow.sno,
    rule: editForm.rule,
    isActive: editForm.isActive,
    userId,
  };
};
