// utils/normalizeAircraftTypes.ts
import { OptionGroup } from "../components/common/EditModal/ExpandableOptionGroup";

export const normalizeAircraftTypes = (
  allAtaRows: any[],
  selectedCsv: string
) => {
  const selectedSet = new Set(
    selectedCsv
      ? selectedCsv.split(",").map((v) => v.trim())
      : []
  );

  const allAircraftTypes = new Set<string>();

  allAtaRows.forEach((row) => {
    if (!row.aircraftType) return;

    row.aircraftType
      .split(",")
      .map((v: string) => v.trim())
      .forEach((v: string) => allAircraftTypes.add(v));
  });

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
