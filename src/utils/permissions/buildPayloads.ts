// // utils/permissions/buildPermissionPayload.ts
// export const buildPermissionPayload = (
//   originalRow: any | null,
//   editForm: any,
//   permissionState: Record<string, Set<string>>,
//   userId: number,
//   isAdd:boolean
// ) => {

import { format } from "date-fns";

//   const basePayload = {
//     ...(originalRow ?? {}),

//     role: editForm.role,
//     reportTo: isAdd ? editForm.reportTo : originalRow.reportTo,
//     isActive: editForm.isActive,

//     rolePermission: (originalRow?.rolePermission ?? []).map((group: any) => {
//       const selected = permissionState[group.permission] ?? new Set();

//       return {
//         ...group,
//         permissionList: group.permissionList.map((item: any) => ({
//           ...item,
//           isActive: selected.has(item.menu),
//         })),
//       };
//     }),

//     userId,
//   };

//   // 🔥 REMOVE sno ON ADD
//   if (isAdd) {
//     const { sno, ...payloadWithoutSno } = basePayload;
//     return payloadWithoutSno;
//   }

//   return basePayload;
// };


// // utils/buildUserPayload.ts
// export const buildUserPayload = (
//   originalRow: any,
//   form: any,
//   userId: number
// ) => {
//   return {
//     ...originalRow, // keeps sno or backend-required keys

//     userName: originalRow.userName, // immutable
//     name: form.name,
//     emailId: form.emailId,
//     contactNumber: form.contactNumber,
//     roleName: form.roleName,
//     isActive: form.isActive,

//     userId, // mandatory for backend
//   };
// };



// // utils/buildAircraftTypePayload.ts
// export const buildAircraftTypePayload = (
//   originalRow: any,
//   form: any,
//   userId: number
// ) => {
//   return {
//     sno: originalRow.sno,
//     aircraftType: originalRow.aircraftType, // immutable
//     isActive: form.isActive,
//     userId,
//   };
// };

// // src/utils/buildAtaPayload.ts

// export const buildAtaPayload = (
//   originalRow: any,
//   editForm: any,
//   aircraftState: Record<string, Set<string>>,
//   userId: number
// ) => {
//   // 👇 preserve original order from row
//   const originalOrder = originalRow.aircraftType
//     ? originalRow.aircraftType.split(",").map((v: string) => v.trim())
//     : [];

//   // 👇 selected aircraft (from UI)
//   const selectedSet = aircraftState.aircraftType ?? new Set<string>();

//   // 👇 rebuild CSV in ORIGINAL ORDER
//   const aircraftCsv = originalOrder
//     .filter((v: string) => selectedSet.has(v))
//     .join(",");

//   return {
//     sno: originalRow.sno,
//     ataCode: originalRow.ataCode,
//     ataDescription: editForm.ataDescription,
//     aircraftType: aircraftCsv, // ✅ EXACT MATCH
//     isActive: editForm.isActive,
//     userId,
//   };
// };


// export const buildDosDontPayload = (
//   originalRow: any,
//   editForm: any,
//   userId: number
// ) => {
//   return {
//     sno: originalRow.sno,
//     rule: editForm.rule,
//     isActive: editForm.isActive,
//     userId,
//   };
// };



// export const buildQuestionPayload = (
//   originalRow: any,
//   form: any,
//   userId: number
// ) => {
//   return {
//     sno: originalRow?.sno ?? 0,

//     question: form.question,
//     aircraftType: form.aircraftType,
//     ata: form.ata,
//     complexity: form.complexity,
//     bookTitle: form.bookTitle,
//     chapter: form.chapter,
//     topic: form.topic,
//     page: form.page,

//     answerA: form.answerA,
//     answerB: form.answerB,
//     answerC: form.answerC,
//     answerD: form.answerD,

//     correctAnswer: form.correctAnswer,
//     reason: form.reason,
//     isActive: form.isActive,

//     userId,
//   };
// };







/* =========================================================
   COMMON HELPER
   ========================================================= */

const stripSnoIfAdd = <T extends Record<string, any>>(
  payload: T,
  isAdd: boolean
): Omit<T, "sno"> | T => {
  if (!isAdd) return payload;

  const { sno, ...rest } = payload;
  return rest;
};

/* =========================================================
   ROLE / PERMISSION
   ========================================================= */

export const buildPermissionPayload = (
  originalRow: any | null,
  editForm: any,
  permissionState: Record<string, Set<string>>,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),
    role: editForm.role,
    reportTo: originalRow?.reportTo,
    isActive: editForm.isActive,

    rolePermission: (originalRow?.rolePermission ?? []).map((group: any) => {
      const selected = permissionState[group.permission] ?? new Set<string>();

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

  return stripSnoIfAdd(payload, isAdd);
};

/* =========================================================
   USER MASTER
   ========================================================= */

export const buildUserPayload = (
  originalRow: any | null,
  form: any,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),

    userName: form?.userName, // immutable on edit
    name: form.name,
    emailId: form.emailId,
    contactNumber: form.contactNumber,
    roleName: form.roleName,
    isActive: form.isActive,

    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};

/* =========================================================
   AIRCRAFT TYPE MASTER
   ========================================================= */

export const buildAircraftTypePayload = (
  originalRow: any | null,
  form: any,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),
    aircraftType: form?.aircraftType, // immutable on edit
    isActive: form.isActive,
    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};

/* =========================================================
   ATA MASTER
   ========================================================= */

export const buildAtaPayload = (
  originalRow: any | null,
  editForm: any,
  aircraftState: Record<string, Set<string>>,
  userId: number,
  isAdd: boolean
) => {
  const selectedSet = aircraftState.aircraftType ?? new Set<string>();
  const aircraftCsv = Array.from(selectedSet).join(",");

  const payload = {
    ...(originalRow ?? {}),
    ataCode: editForm?.ataCode,
    ataDescription: editForm.ataDescription,
    aircraftType: aircraftCsv,
    isActive: editForm.isActive,

    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};

/* =========================================================
   DOs & DON'Ts MASTER
   ========================================================= */

export const buildDosDontPayload = (
  originalRow: any | null,
  editForm: any,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),

    rule: editForm.rule,
    isActive: editForm.isActive,

    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};

/* =========================================================
   QUESTION BANK
   ========================================================= */

export const buildQuestionPayload = (
  originalRow: any | null,
  form: any,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),

    question: form.question,
    aircraftType: form.aircraftType,
    ataCode: form.ataCode,
    complexity: form.complexity,
    bookTitle: form.bookTitle,
    chapter: form.chapter,
    topic: form.topic,
    page: Number(form.page),

    answer1: form.answer1,
    answer2: form.answer2,
    answer3: form.answer3,

    correctAnswer: form.correctAnswer,
    reason: form.reason ? form.reason : null,
    isActive: form.isActive,

    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};




interface EditedRow {
  ataCode?: string;
  ataDescription?: string;
  complexity?: number | string;
  duration?: number | string;
  S1?: number | string;
  S2?: number | string;
  S3?: number | string;
  avaiableQuestion1?: number | string | null;
  avaiableQuestion2?: number | string | null;
  avaiableQuestion3?: number | string | null;
}

interface BuildAtaPhasePayloadParams {
  registerAta: any;
  editedRows: EditedRow[];
  examPhase: string;
  endDate: Date;
  userId: string | number;
}

export const buildAtaPhasePayload = ({
  registerAta,
  editedRows,
  examPhase,
  endDate,
  userId,
}: BuildAtaPhasePayloadParams) => {
  if (!registerAta || !examPhase||!endDate) return null;

  const mappedDetails = editedRows.map((e) => ({
    ataCode: e?.ataCode,
    ataDescription: e?.ataDescription,
    complexity: Number(e?.complexity ?? 0),
    duration: Number(e?.duration ?? 0),
    level1Question: Number(e?.S1 ?? 0),
    level2Question: Number(e?.S2 ?? 0),
    level3Question: Number(e?.S3 ?? 0),
    avaiableQuestion1:
      e?.avaiableQuestion1 != null ? Number(e.avaiableQuestion1) : null,
    avaiableQuestion2:
      e?.avaiableQuestion2 != null ? Number(e.avaiableQuestion2) : null,
    avaiableQuestion3:
      e?.avaiableQuestion3 != null ? Number(e.avaiableQuestion3) : null,
  }));

  const updatedAtaPhases = registerAta.ataPhases.map((phase: any) =>
    phase.phase === examPhase
      ? {
          ...phase,
          ataPhaseDetails: mappedDetails,
          endDate: format(endDate, "dd-MM-yyyy"),
        }
      : phase
  );

  const { ataId, ...restRegisterAta } = registerAta;

  return {
    ...restRegisterAta,
    ataPhases: updatedAtaPhases,
    userId,
  };
};

