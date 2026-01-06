// import { useRef, useState, useMemo } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import { roleManagement } from "../../utils/tableColumns";
// import searchIcon from "../../assets/searchIcon.svg";

// import { addEditRoleMaster, getRoleMaster } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import { EditModalShell, EditModalRenderer } from "../../components/common/EditModal";
// import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
// import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

// import { roleFields } from "../../components/common/EditModal/fieldRenderers";
// import { usePermissionEditor } from "../../hooks/usePermissionEditor";
// import { buildPermissionPayload } from "../../utils/permissions/buildPayloads";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";
// import { attachSelectOptions } from "../../utils/applyFieldOptions";

// const RoleManagement = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   const permission = usePermissionEditor();

//   const roleQuery: any = useQuery({
//     queryKey: ["roleMaster", userId],
//     queryFn: getRoleMaster,
//     enabled: !!userId,
//   });

//   const rows = useMemo(
//     () => withRowId(roleQuery.data?.roleMasters ?? []),
//     [roleQuery.data?.roleMasters]
//   );

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       role: row.role,
//       reportTo: row.sno,
//       isActive: row.isActive,
//     });
//     permission.init(row.rolePermission);
//     setEditOpen(true);
//   };

//   const handleInitPermissions = (n, v) => {
//     const val = rows.find(e => e.sno == v)
//     permission.init(val.rolePermission);
//   }

//   const fieldsWithOptions = useMemo(() => {
//     return attachSelectOptions(roleFields, [
//       {
//         field: "reportTo",
//         data: rows,
//         labelKey: "role",
//         valueKey: "sno",
//       },
//     ]);
//   }, [rows]);

//   console.log("fieldsWithOptions==", fieldsWithOptions);

//   const mutation = useMutation({
//     mutationFn: addEditRoleMaster,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["roleMaster"] });
//       setEditOpen(false);
//     },
//   });

//   const handleSubmit = () => {
//     if (!originalRow || !userId) return;
//     mutation.mutate(
//       buildPermissionPayload(
//         originalRow,
//         editForm,
//         permission.state,
//         userId
//       )
//     );
//   };

//   return (
// <div className="h-screen flex flex-col">
//   <div className="mx-20 mt-5">
//     <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//       <div className="flex gap-6 items-center">
//         <button
//           onClick={() => console.log("Question Bank clicked")}
//           className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//         >
//           <img
//             src={questionBnkIcon}
//             alt="Question Bank"
//             className="w-12 h-12"
//           />
//           <span className="text-md font-extrabold text-black">
//             Role Management
//           </span>
//         </button>


//       </div>

//       {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
//       <div
//         className="
//               flex items-center
//               w-[17%] h-8
//               rounded-xl
//               bg-[#C3BFBF]
//               border border-red-200
//               shadow-sm
//               px-2
//               mt-6
//               mr-0
//             "
//       >
//         <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
//           <img
//             src={searchIcon}
//             alt="Search"
//             className="w-8 h-8 mr-16"
//           />
//         </div>

//         <input

//           placeholder="Search"
//           className="
//                 flex-1
//                 bg-transparent
//                 px-4
//                 text-sm
//                 placeholder-gray-600
//                 focus:outline-none
//                 focus:ring-0
//               "
//           onChange={(e) =>
//             tableRef.current?.setSearch(
//               e.target.value
//             )
//           }
//         />
//       </div>
//     </div>

//     <div className="flex overflow-hidden mt-5 h-[450px]">
//       <DataTable
//         ref={tableRef}
//         columns={roleManagement}
//         rows={rows}
//         includeActionColumn
//         actionConfig={{ edit: true }}
//         onEditClick={handleEditClick}
//       />
//     </div>
//   </div>

//   <Footer
//     buttons={[
//       { label: "Add New", onClick: () => { setEditOpen(true) } },
//     ]}
//   />

//   {editOpen && editForm && (
//     <EditModalShell
//       open={editOpen}
//       title="Edit Role"
//       leftTitle="Edit Role"
//       onClose={() => setEditOpen(false)}
//       onSubmit={handleSubmit}
//     >
//       <EditModalRenderer
//         fields={fieldsWithOptions}
//         values={editForm}
//         onChange={(n, v) => {
//           console.log("====>", n);
//           handleInitPermissions(n, v)
//           setEditForm((p: any) => ({ ...p, [n]: v }))
//         }
//         }
//       />

//       <EditModalFieldWrapper label="Permission" required>
//         <ExpandableOptionGroup
//           groups={permission.groups}
//           value={permission.value}
//           expanded={permission.expanded}
//           onToggleGroup={permission.toggleGroup}
//           onChange={permission.toggleOption}
//         />
//       </EditModalFieldWrapper>
//     </EditModalShell>
//   )}
// </div>
//   );
// };

// export default RoleManagement;









import { useRef, useState, useMemo, useCallback } from "react";
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
import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import { attachSelectOptions } from "../../utils/applyFieldOptions";
import { buildEmptyPermissions } from "../../utils/permissions/emptyPermissions";
import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import PermissionEffectListener from "../../components/common/EditModal/PermissionEffectListener";

const RoleManagement = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);
  const [isEdit, setIsEdit] = useState(false)
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);


  const permission = usePermissionEditor();

  const roleQuery: any = useQuery({
    queryKey: ["roleMaster", userId],
    queryFn: getRoleMaster,
    enabled: !!userId,
  });

  console.log("editForm", permission.state);

  const rows = useMemo(
    () => withRowId(roleQuery.data?.roleMasters ?? []),
    [roleQuery.data?.roleMasters]
  );

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    setIsEdit(true)
    setOriginalRow(row);
    setEditForm({
      mode: "edit",
      role: row.role,
      reportTo: row.sno,
      isActive: row.isActive,
    });
    permission.init(row.rolePermission);
    setEditOpen(true);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = useCallback(() => {
    setIsEdit(false)
    setOriginalRow(null);
    setEditForm({
      mode: "add",
      role: "",
      reportTo: "",
      isActive: true,
    });
    permission.reset(); // ✅ NO permissions initially
    setEditOpen(true);
  }, [rows])

  /* ================= REPORT TO CHANGE ================= */

  const handleFieldChange = (name: string, value: any) => {


    setEditForm((prev: any) => ({ ...prev, [name]: value }));
    if (name === "reportTo") {

      const parentRole = rows.find((r) => r.sno === value);
      if (parentRole) {
        console.log("=====++", parentRole);
        setOriginalRow(parentRole);
        if (!isEdit) {
          const emptyPermissions = buildEmptyPermissions(
            parentRole.rolePermission
          );
          permission.init(emptyPermissions);
        } else {
          // EDIT MODE → use existing permissions
          permission.init(parentRole.rolePermission);
        }
      } else {
        permission.reset();
        setOriginalRow(null);
      }
    }
  };


  const fieldsWithOptions = useMemo(() => {
    return attachSelectOptions(roleFields, [
      {
        field: "reportTo",
        data: rows,
        labelKey: "reportTo",
        valueKey: "sno",
      },
    ]);
  }, [rows]);

  const mutation = useMutation({
    mutationFn: addEditRoleMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roleMaster"] });
      setEditOpen(false);
    },
  });

  const handleSubmit = () => {
    console.log("originalRow==>", originalRow);

    if (!userId) return;
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
    // <div className="h-screen flex flex-col">
    //   <div className="mx-20 mt-5">

    //     {/* HEADER + SEARCH (UNCHANGED) */}
    //     {/* ... SAME CODE AS YOURS ... */}

    //     <div className="flex overflow-hidden mt-5 h-[450px]">
    //       <DataTable
    //         ref={tableRef}
    //         columns={roleManagement}
    //         rows={rows}
    //         includeActionColumn
    //         actionConfig={{ edit: true }}
    //         onEditClick={handleEditClick}
    //       />
    //     </div>
    //   </div>

    //   <Footer
    //     buttons={[
    //       { label: "Add New", onClick: handleAddNew },
    //     ]}
    //   />

    // {editOpen && editForm && (
    //   <EditModalShell
    //     open={editOpen}
    //     title={originalRow ? "Edit Role" : "Add Role"}
    //     leftTitle={originalRow ? "Edit Role" : "Add Role"}
    //     onClose={() => setEditOpen(false)}
    //     onSubmit={handleSubmit}
    //   >
    //     <EditModalRenderer
    //       fields={fieldsWithOptions}
    //       values={editForm}
    //       onChange={handleFieldChange}
    //     />

    //     {/* ✅ SHOW ONLY WHEN PERMISSIONS EXIST */}
    //     {permission.groups.length > 0 && (
    //       <EditModalFieldWrapper label="Permission" required>
    //         <ExpandableOptionGroup
    //           groups={permission.groups}
    //           value={permission.value}
    //           expanded={permission.expanded}
    //           onToggleGroup={permission.toggleGroup}
    //           onChange={permission.toggleOption}
    //         />
    //       </EditModalFieldWrapper>
    //     )}
    //   </EditModalShell>
    // )}
    // </div>
    <div className="h-screen flex flex-col">
      <div className="mx-20 mt-5 mt-5">
        <div className="flex items-center justify-between shrink-0 mt-[1%] ">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => console.log("Question Bank clicked")}
              className="flex items-center gap-2 focus:outline-none hover:opacity-80"
            >
              <img
                src={questionBnkIcon}
                alt="Question Bank"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                Role Management
              </span>
            </button>


          </div>

          {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
          <div
            className="
                  flex items-center
                  w-[17%] h-8
                  rounded-xl
                  bg-[#C3BFBF]
                  border border-red-200
                  shadow-sm
                  px-2
                  mt-6
                  mr-0
                "
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <img
                src={searchIcon}
                alt="Search"
                className="w-8 h-8 mr-16"
              />
            </div>

            <input

              placeholder="Search"
              className="
                    flex-1
                    bg-transparent
                    px-4
                    text-sm
                    placeholder-gray-600
                    focus:outline-none
                    focus:ring-0
                  "
              onChange={(e) =>
                tableRef.current?.setSearch(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="flex overflow-hidden mt-5 h-[450px]">
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

      <Footer
        buttons={[
          { label: "Add New", onClick: handleAddNew },
        ]}
      />

      {editOpen && editForm && (
        <FormikEditModal
          open={editOpen}
          title={isEdit ? "Edit Role" : "Add Role"}
          leftTitle={isEdit ? "Edit Role" : "Add Role"}
          fields={fieldsWithOptions}
          initialValues={editForm}
          onClose={() => setEditOpen(false)}
          onSubmit={(values) =>
            mutation.mutate(
              buildPermissionPayload(
                originalRow,
                values,
                permission.state,
                userId,
                !isEdit
              )
            )
          }
        >
          <PermissionEffectListener
            rows={rows}
            isEdit={isEdit}
            permission={permission}
            setOriginalRow={setOriginalRow}
          />

          {permission.groups.length > 0 && (
            <EditModalFieldWrapper label="Permission" required>
              <ExpandableOptionGroup
                groups={permission.groups}
                value={permission.value}
                expanded={permission.expanded}
                onToggleGroup={permission.toggleGroup}
                onChange={permission.toggleOption}
              />
            </EditModalFieldWrapper>
          )}
        </FormikEditModal>
      )}

    </div>
  );
};

export default RoleManagement;
