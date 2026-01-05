// // utils/normalizeAircraftTypes.ts
// import { OptionGroup } from "../components/common/EditModal/ExpandableOptionGroup";

// export const normalizeAircraftTypes = (
//   allAtaRows: any[],
//   selectedCsv: string
// ) => {
//   const selectedSet = new Set(
//     selectedCsv
//       ? selectedCsv.split(",").map((v) => v.trim())
//       : []
//   );

//   const allAircraftTypes = new Set<string>();

//   allAtaRows.forEach((row) => {
//     if (!row.aircraftType) return;

//     row.aircraftType
//       .split(",")
//       .map((v: string) => v.trim())
//       .forEach((v: string) => allAircraftTypes.add(v));
//   });

//   const groups: OptionGroup[] = [
//     {
//       groupKey: "aircraftType",
//       title: "Aircraft Type",
//       expandable: false,
//       items: Array.from(allAircraftTypes).map((v) => ({
//         key: v,
//         label: v,
//       })),
//     },
//   ];

//   return {
//     groups,
//     selected: {
//       aircraftType: selectedSet,
//     },
//   };
// };








// utils/normalizeAircraftTypes.ts
import { OptionGroup } from "../components/common/EditModal/ExpandableOptionGroup";

/* ================= SAFE NORMALIZER ================= */

const toStringArray = (value: any): string[] => {
  if (!value) return [];

  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }

  if (value instanceof Set) {
    return Array.from(value).map((v) => String(v).trim()).filter(Boolean);
  }

  return [];
};

/* ================= MAIN FUNCTION ================= */

export const normalizeAircraftTypes = (
  allAtaRows: any[],
  selectedCsv: string | string[] | Set<string> | null | undefined
) => {
  /* ===== selected values ===== */
  const selectedSet = new Set<string>(toStringArray(selectedCsv));

  /* ===== collect all aircraft types ===== */
  const allAircraftTypes = new Set<string>();

  allAtaRows.forEach((row) => {
    if (!row?.aircraftType) return;

    toStringArray(row.aircraftType).forEach((v) =>
      allAircraftTypes.add(v)
    );
  });

  /* ===== build option groups ===== */
  const groups: OptionGroup[] = [
    {
      groupKey: "aircraftType",
      title: "Aircraft Type",
      expandable: false,
      items: Array.from(allAircraftTypes).map((v) => ({
        key: v,
        label: v,
      })),
    },
  ];

  return {
    groups,
    selected: {
      aircraftType: selectedSet,
    },
  };
};

