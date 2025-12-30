import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import { getAtaType, addEditAtaType } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import {
  EditModalShell,
  EditModalRenderer,
} from "../../components/common/EditModal";

import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

import { ataFields } from "../../components/common/EditModal/fieldRenderers";
import { buildAtaPayload } from "../../utils/permissions/buildPayloads";
import { normalizeAircraftTypes } from "../../utils/normalizeAircraftTypes";
import { ataMaster } from "../../utils/tableColumns";

const AtaMaster = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  const [groups, setGroups] = useState<any[]>([]);
  const [aircraftState, setAircraftState] = useState<
    Record<string, Set<string>>
  >({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  /* ================= API ================= */

  const ataQuery: any = useQuery({
    queryKey: ["ataMaster", userId],
    queryFn: getAtaType,
    enabled: !!userId,
  });

  const rows = useMemo(() => {
    return withRowId(ataQuery.data?.ataMasters ?? []);
  }, [ataQuery.data?.ataMasters]);

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    const normalized = normalizeAircraftTypes(
      ataQuery.data?.ataMasters ?? [],
      row.aircraftType
    );

    setOriginalRow(row);
    setEditForm({
      ataCode: row.ataCode,
      ataDescription: row.ataDescription,
      isActive: row.isActive,
    });

    setGroups(normalized.groups);
    setAircraftState({
      aircraftType: normalized.selected.aircraftType,
    });
    setExpanded({});
    setEditOpen(true);
  };

  /* ================= CHECKBOX ================= */

  const handleAircraftChange = (
    groupKey: string,
    itemKey: string,
    checked: boolean
  ) => {
    setAircraftState((prev) => {
      const next = new Set(prev[groupKey] ?? []);
      checked ? next.add(itemKey) : next.delete(itemKey);
      return { ...prev, [groupKey]: next };
    });
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditAtaType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ataMaster"] });
      setEditOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!originalRow || !userId) return;
    mutation.mutate(
      buildAtaPayload(
        originalRow,
        editForm,
        aircraftState,
        userId
      )
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mx-10 mt-3">
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2 items-center">
            <img src={questionBnkIcon} className="w-12 h-12"  alt=""/>
            <h2 className="text-md font-extrabold">ATA Master</h2>
          </div>

          <div className="flex items-center w-[16%] h-8 rounded-xl bg-[#C3BFBF] px-2">
            <img src={searchIcon} className="w-6 h-6" alt=""/>
            <input
              placeholder="Search"
              className="flex-1 bg-transparent px-3 text-sm focus:outline-none"
              onChange={(e) =>
                tableRef.current?.setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex overflow-hidden mt-7 h-[510px]">
          <DataTable
            ref={tableRef}
            columns={ataMaster}
            rows={rows}
            includeActionColumn
            actionConfig={{ edit: true }}
            onEditClick={handleEditClick}
          />
        </div>
      </div>

      <Footer />

      {editOpen && editForm && (
        <EditModalShell
          open={editOpen}
          title="Edit ATA"
          leftTitle="Edit ATA"
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalRenderer
            fields={ataFields}
            values={editForm}
            onChange={(n, v) =>
              setEditForm((p: any) => ({ ...p, [n]: v }))
            }
          />

          <EditModalFieldWrapper label="Aircraft Type" required>
            <ExpandableOptionGroup
              groups={groups}
              value={{
                aircraftType: Array.from(
                  aircraftState.aircraftType ?? []
                ),
              }}
              expanded={expanded}
              onToggleGroup={() => { }}
              onChange={handleAircraftChange}
            />
          </EditModalFieldWrapper>
        </EditModalShell>
      )}
    </div>
  );
};

export default AtaMaster;
