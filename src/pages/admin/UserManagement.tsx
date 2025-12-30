import { useRef, useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { userManagement } from "../../utils/tableColumns";
import searchIcon from "../../assets/searchIcon.svg";

import {
  addEditUserMaster,
  getUserMaster,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import {
  EditModalShell,
  EditModalRenderer,
} from "../../components/common/EditModal";

import { userFields } from "../../components/common/EditModal/fieldRenderers";
import { buildUserPayload } from "../../utils/permissions/buildPayloads";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ================= STATE ================= */

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  /* ================= API ================= */

  const userQuery: any = useQuery({
    queryKey: ["userMaster", userId],
    queryFn: getUserMaster,
    enabled: !!userId,
  });



  const rows = useMemo(() => {
    return withRowId(userQuery.data?.userDetails ?? []);
  }, [userQuery.data?.userDetails]);

  /* ================= EDIT CLICK ================= */

  const handleEditClick = (row: any) => {
    setOriginalRow(row);

    setEditForm({
      userName: row.userName,
      name: row.name,
      emailId: row.emailId,
      contactNumber: row.contactNumber,
      roleName: row.roleName,
      isActive: row.isActive,
    });

    setEditOpen(true);
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditUserMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMaster"] });
      setEditOpen(false);
    },
    onError: (err) => {
      console.error("Edit User failed", err);
    },
  });

  const handleSubmit = () => {
    if (!originalRow || !userId) return;

    mutation.mutate(
      buildUserPayload(originalRow, editForm, userId)
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ===== CONTENT ===== */}
      <div className="flex-1 mx-10 mt-3">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-xl font-extrabold text-black">
            User Management
          </h2>

          <div className="flex items-center w-[16%] h-8 rounded-xl bg-[#C3BFBF] px-2">
            <img src={searchIcon} className="w-6 h-6" alt="search" />
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
            columns={userManagement}
            rows={rows}
            includeActionColumn
            actionConfig={{ edit: true }}
            onEditClick={handleEditClick}
          />
        </div>
      </div>

      <Footer />

      {/* ===== EDIT MODAL ===== */}
      {editOpen && editForm && (
        <EditModalShell
          open={editOpen}
          title="Edit User"
          leftTitle="Edit User"
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalRenderer
            fields={userFields}
            values={editForm}
            // extraOptions={{
            //   roles: roleOptions,
            // }}
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

export default UserManagement;
