// utils/extractAircraftTypes.ts
export const extractAircraftTypes = (ataMasters: any[]) => {
  const set = new Set<string>();

  ataMasters.forEach((row) => {
    if (!row.aircraftType) return;

    row.aircraftType
      .split(",")
      .map((v: string) => v.trim())
      .forEach((v: string) => {
        if (v) set.add(v);
      });
  });

  return Array.from(set).sort();
};
