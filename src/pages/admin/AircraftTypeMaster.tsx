import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import { aircraftMaster } from "../../utils/tableColumns";
import { getAircraftType, addEditAircraftType } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import {
  EditModalShell,
  EditModalRenderer,
} from "../../components/common/EditModal";

import { aircraftTypeFields } from "../../components/common/EditModal/fieldRenderers";
import { buildAircraftTypePayload } from "../../utils/permissions/buildPayloads";

const AircraftTypeMaster = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ================= STATE ================= */

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  /* ================= API ================= */

  const aircraftQuery: any = useQuery({
    queryKey: ["aircraftType", userId],
    queryFn: getAircraftType,
    enabled: !!userId,
  });

  const rows = useMemo(() => {
    return withRowId(aircraftQuery.data?.aircraftTypes ?? []);
  }, [aircraftQuery.data?.aircraftTypes]);

  /* ================= EDIT CLICK ================= */

  const handleEditClick = (row: any) => {
    setOriginalRow(row);

    setEditForm({
      aircraftType: row.aircraftType,
      isActive: row.isActive,
    });

    setEditOpen(true);
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditAircraftType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraftType"] });
      setEditOpen(false);
    },
    onError: (err) => {
      console.error("Aircraft Type update failed", err);
    },
  });

  const handleSubmit = () => {
    if (!originalRow || !userId) return;

    mutation.mutate(
      buildAircraftTypePayload(originalRow, editForm, userId)
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mx-10 mt-3">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between shrink-0 mt-[2%]">
            <div className="flex gap-6 items-center">
              <button className="flex items-center gap-2">
                <img
                  src={questionBnkIcon}
                  alt=""
                  className="w-12 h-12"
                />
                <span className="text-md font-extrabold text-black">
                  Aircraft Type Master
                </span>
              </button>
            </div>

            {/* ===== SEARCH ===== */}
            <div className="flex items-center w-[16%] h-8 rounded-xl bg-[#C3BFBF] px-2 mt-9">
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

          {/* ===== TABLE ===== */}
          <div className="flex overflow-hidden mt-7 h-[510px]">
            <DataTable
              ref={tableRef}
              columns={aircraftMaster}
              rows={rows}
              includeActionColumn
              actionConfig={{ edit: true }}
              onEditClick={handleEditClick}
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* ===== EDIT MODAL ===== */}
      {editOpen && editForm && (
        <EditModalShell
          open={editOpen}
          title="Edit Aircraft Type"
          leftTitle="Edit Aircraft Type"
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalRenderer
            fields={aircraftTypeFields}
            values={editForm}
            onChange={(name, value) =>
              setEditForm((prev: any) => ({
                ...prev,
                [name]: value,
              }))
            }
          />
        </EditModalShell>
      )}
    </div>
  );
};

export default AircraftTypeMaster;
