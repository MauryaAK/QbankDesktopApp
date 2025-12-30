import { useRef, useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { roleManagement } from "../../utils/tableColumns";
import searchIcon from "../../assets/searchIcon.svg";

import { addEditRoleMaster, getRoleMaster } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import { EditModalShell, EditModalRenderer } from "../../components/common/EditModal";
import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

import { roleFields } from "../../components/common/EditModal/fieldRenderers";
import { usePermissionEditor } from "../../hooks/usePermissionEditor";
import { buildPermissionPayload } from "../../utils/permissions/buildPayloads";

const RoleManagement = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  const permission = usePermissionEditor();

  const roleQuery: any = useQuery({
    queryKey: ["roleMaster", userId],
    queryFn: getRoleMaster,
    enabled: !!userId,
  });

  const rows = useMemo(
    () => withRowId(roleQuery.data?.roleMasters ?? []),
    [roleQuery.data?.roleMasters]
  );

  const handleEditClick = (row: any) => {
    setOriginalRow(row);
    setEditForm({
      role: row.role,
      reportTo: row.reportTo,
      isActive: row.isActive,
    });
    permission.init(row.rolePermission);
    setEditOpen(true);
  };

  const mutation = useMutation({
    mutationFn: addEditRoleMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleMaster"] });
      setEditOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!originalRow || !userId) return;
    mutation.mutate(
      buildPermissionPayload(
        originalRow,
        editForm,
        permission.state,
        userId
      )
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mx-10 mt-3">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-xl font-extrabold">Role Management</h2>

          <div className="flex items-center w-[16%] h-8 rounded-xl bg-[#C3BFBF] px-2">
            <img src={searchIcon} className="w-6 h-6" alt="" />
            <input
              placeholder="Search"
              className="flex-1 bg-transparent px-3 text-sm focus:outline-none"
              onChange={(e) => tableRef.current?.setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex overflow-hidden mt-7 h-[510px]">
          <DataTable
            ref={tableRef}
            columns={roleManagement}
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
          title="Edit Role"
          leftTitle="Edit Role"
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalRenderer
            fields={roleFields}
            values={editForm}
            onChange={(n, v) =>
              setEditForm((p: any) => ({ ...p, [n]: v }))
            }
          />

          <EditModalFieldWrapper label="Permission" required>
            <ExpandableOptionGroup
              groups={permission.groups}
              value={permission.value}
              expanded={permission.expanded}
              onToggleGroup={permission.toggleGroup}
              onChange={permission.toggleOption}
            />
          </EditModalFieldWrapper>
        </EditModalShell>
      )}
    </div>
  );
};

export default RoleManagement;
