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
  editedRows: EditedRow[];
  userId: string | number;
  filteredData: any
}

export const buildAtaPhasePayload = ({
  editedRows,
  filteredData,
  userId,
}: BuildAtaPhasePayloadParams) => {
  if (!filteredData) return null;

  const mappedDetails = editedRows.map((e) => ({
    ataCode: e?.ataCode || 0,
    ataDescription: e?.ataDescription,
    level1Question: Number(e?.S1 ?? 0),
    level2Question: Number(e?.S2 ?? 0),
    level3Question: Number(e?.S3 ?? 0),
    avaiableQuestion1: null,
    avaiableQuestion2: null,
    avaiableQuestion3: null,
  }));

  const updatedAtaPhases = {
    ataPhaseDetails: mappedDetails,
    examDate: format(filteredData?.examDate, "dd-MM-yyyy"),
    phase: filteredData?.examPhase?.value
  }

  return {
    "aircraftType": filteredData?.aircraftType?.value,
    "levelOfTraining": filteredData?.trainingType?.value,
    "courseId": filteredData?.courseId?.value,
    "courseName": filteredData?.courseName?.value,
    "startDate": format(filteredData?.trainingStartDate, "dd-MM-yyyy"),
    "endDate": format(filteredData?.trainingEndDate, "dd-MM-yyyy"),
    ataPhases: updatedAtaPhases,
    userId,
  };
};

export const buildRegisterCandidatePayload = (
  originalRow: any | null,
  form: any,
  userId: number,
  isAdd: boolean
) => {
  const payload = {
    ...(originalRow ?? {}),
    "ataGroupId": localStorage.getItem("ataId"),
    "candidateName": form?.name,
    "licenceNumber": form?.ameLicenseNo,
    "dateOfBirth": format(form?.dob, 'dd-MM-yyyy'),
    "conatctNumber": form?.contactNo,
    "emailId": form?.emailId,
    "image": form?.emailId,
    "isActive": true,

    userId,
  };

  return stripSnoIfAdd(payload, isAdd);
};






