import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { getDoDontRule, addEditDoDontRule } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import {
  EditModalShell,
  EditModalRenderer,
} from "../../components/common/EditModal";

import { dosDontFields } from "../../components/common/EditModal/fieldRenderers";
import { buildDosDontPayload } from "../../utils/permissions/buildPayloads";
import { dosDontMaster } from "../../utils/tableColumns";

const DosDontsMaster = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  /* ================= API ================= */

  const doDontQuery: any = useQuery({
    queryKey: ["doDontRule", userId],
    queryFn: getDoDontRule,
    enabled: !!userId,
  });

  const rows = useMemo(() => {
    return withRowId(doDontQuery.data?.doDonts ?? []);
  }, [doDontQuery.data?.doDonts]);

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    setOriginalRow(row);
    setEditForm({
      rule: row.rule,
      isActive: row.isActive,
    });
    setEditOpen(true);
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditDoDontRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doDontRule"] });
      setEditOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!originalRow || !userId) return;

    mutation.mutate(
      buildDosDontPayload(originalRow, editForm, userId)
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mx-10 mt-3">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ===== HEADER ===== */}
          <div className="flex items-center justify-between shrink-0 mt-[2%]">
            <div className="flex gap-2 items-center">
              <img src={questionBnkIcon} className="w-12 h-12" alt=""/>
              <span className="text-md font-extrabold text-black">
                Dos Donts Master
              </span>
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
              columns={dosDontMaster}
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
          title="Edit Dos and Don'ts"
          leftTitle="Edit Dos and Don'ts"
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalRenderer
            fields={dosDontFields}
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

export default DosDontsMaster;
