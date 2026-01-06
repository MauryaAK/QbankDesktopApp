// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";

// import questionBnkIcon from "../../assets/questionBnkIcon.svg";
// import searchIcon from "../../assets/searchIcon.svg";

// import { getDoDontRule, addEditDoDontRule } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { dosDontFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildDosDontPayload } from "../../utils/permissions/buildPayloads";
// import { dosDontMaster } from "../../utils/tableColumns";

// const DosDontsMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const doDontQuery: any = useQuery({
//     queryKey: ["doDontRule", userId],
//     queryFn: getDoDontRule,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(doDontQuery.data?.doDonts ?? []);
//   }, [doDontQuery.data?.doDonts]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       rule: row.rule,
//       isActive: row.isActive,
//     });
//     setEditOpen(true);
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditDoDontRule,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["doDontRule"] });
//       setEditOpen(false);
//     },
//   });

//   const handleSubmit = () => {
//     if (!originalRow || !userId) return;

//     mutation.mutate(
//       buildDosDontPayload(originalRow, editForm, userId)
//     );
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="mx-20">
//         <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//           <div className="flex gap-6 items-center">
//             <button
//               onClick={() => console.log("Question Bank clicked")}
//               className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//             >
//               <img
//                 src={questionBnkIcon}
//                 alt="Question Bank"
//                 className="w-12 h-12"
//               />
//               <span className="text-md font-extrabold text-black">
//                 Dos and Don'ts Master
//               </span>
//             </button>


//           </div>

//           {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
//           <div
//             className="
//                   flex items-center
//                   w-[17%] h-8
//                   rounded-xl
//                   bg-[#C3BFBF]
//                   border border-red-200
//                   shadow-sm
//                   px-2
//                   mt-6
//                   mr-0
//                 "
//           >
//             <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
//               <img
//                 src={searchIcon}
//                 alt="Search"
//                 className="w-8 h-8 mr-16"
//               />
//             </div>

//             <input

//               placeholder="Search"
//               className="
//                     flex-1
//                     bg-transparent
//                     px-4
//                     text-sm
//                     placeholder-gray-600
//                     focus:outline-none
//                     focus:ring-0
//                   "
//               onChange={(e) =>
//                 tableRef.current?.setSearch(
//                   e.target.value
//                 )
//               }
//             />
//           </div>
//         </div>

//         <div className="flex overflow-hidden mt-7 h-[450px]">
//           <DataTable
//             ref={tableRef}
//             columns={dosDontMaster}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true }}
//             onEditClick={handleEditClick}
//           />
//         </div>
//       </div>

//       <Footer
//         buttons={[
//           { label: "Add New", onClick: () => { } },
//         ]}
//       />

//       {editOpen && editForm && (
//         <EditModalShell
//           open={editOpen}
//           title="Edit Dos and Don'ts"
//           leftTitle="Edit Dos and Don'ts"
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={dosDontFields}
//             values={editForm}
//             onChange={(name, value) =>
//               setEditForm((prev: any) => ({
//                 ...prev,
//                 [name]: value,
//               }))
//             }
//           />
//         </EditModalShell>
//       )}
//     </div>
//   );
// };

// export default DosDontsMaster;












// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";

// import questionBnkIcon from "../../assets/questionBnkIcon.svg";
// import searchIcon from "../../assets/searchIcon.svg";

// import { getDoDontRule, addEditDoDontRule } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { dosDontFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildDosDontPayload } from "../../utils/permissions/buildPayloads";
// import { dosDontMaster } from "../../utils/tableColumns";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_DOS_DONT_FORM = {
//   rule: "",
//   isActive: true,
// };

// const DosDontsMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const doDontQuery: any = useQuery({
//     queryKey: ["doDontRule", userId],
//     queryFn: getDoDontRule,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(doDontQuery.data?.doDonts ?? []);
//   }, [doDontQuery.data?.doDonts]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       rule: row.rule,
//       isActive: row.isActive,
//     });
//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     setOriginalRow(null);                // 🔥 ADD MODE
//     setEditForm(EMPTY_DOS_DONT_FORM);    // blank fields
//     setEditOpen(true);
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditDoDontRule,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["doDontRule"] });
//       setEditOpen(false);
//     },
//   });

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = () => {
//     if (!userId) return;

//     mutation.mutate(
//       buildDosDontPayload(
//         originalRow,   // null → ADD | object → EDIT
//         editForm,
//         userId
//       )
//     );
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="mx-20">
//         <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//           <div className="flex gap-6 items-center">
//             <button
//               onClick={() => console.log("Question Bank clicked")}
//               className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//             >
//               <img
//                 src={questionBnkIcon}
//                 alt="Question Bank"
//                 className="w-12 h-12"
//               />
//               <span className="text-md font-extrabold text-black">
//                 Dos and Don'ts Master
//               </span>
//             </button>
//           </div>

//           {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
//           <div
//             className="
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
//           >
//             <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
//               <img
//                 src={searchIcon}
//                 alt="Search"
//                 className="w-8 h-8 mr-16"
//               />
//             </div>

//             <input
//               placeholder="Search"
//               className="
//                 flex-1
//                 bg-transparent
//                 px-4
//                 text-sm
//                 placeholder-gray-600
//                 focus:outline-none
//                 focus:ring-0
//               "
//               onChange={(e) =>
//                 tableRef.current?.setSearch(e.target.value)
//               }
//             />
//           </div>
//         </div>

//         <div className="flex overflow-hidden mt-7 h-[450px]">
//           <DataTable
//             ref={tableRef}
//             columns={dosDontMaster}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true }}
//             onEditClick={handleEditClick}
//           />
//         </div>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <Footer
//         buttons={[
//           { label: "Add New", onClick: handleAddNew },
//         ]}
//       />

//       {/* ===== ADD / EDIT MODAL ===== */}
//       {editOpen && editForm && (
//         <EditModalShell
//           open={editOpen}
//           title={originalRow ? "Edit Dos and Don'ts" : "Add Dos and Don'ts"}
//           leftTitle={originalRow ? "Edit Dos and Don'ts" : "Add Dos and Don'ts"}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={dosDontFields}
//             values={editForm}
//             onChange={(name, value) =>
//               setEditForm((prev: any) => ({
//                 ...prev,
//                 [name]: value,
//               }))
//             }
//           />
//         </EditModalShell>
//       )}
//     </div>
//   );
// };

// export default DosDontsMaster;


import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { getDoDontRule, addEditDoDontRule } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { dosDontFields } from "../../components/common/EditModal/fieldRenderers";
import { buildDosDontPayload } from "../../utils/permissions/buildPayloads";
import { dosDontMaster } from "../../utils/tableColumns";

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_DOS_DONT_FORM = {
  mode: "add",          // 🔥 IMPORTANT (for disable logic)
  rule: "",
  isActive: true,
};

const DosDontsMaster = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ================= STATE ================= */

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
      mode: "edit",           // 🔥 EDIT MODE
      rule: row.rule,
      isActive: row.isActive,
    });

    setEditOpen(true);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {
    setOriginalRow(null);               // 🔥 ADD MODE
    setEditForm(EMPTY_DOS_DONT_FORM);
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

  /* ================= SUBMIT (ADD + EDIT) ================= */

  const handleSubmit = (values: any) => {
    if (!userId) return;

    mutation.mutate(
      buildDosDontPayload(
        originalRow,   // null → ADD | object → EDIT
        values,
        userId,
        editForm.mode !== "edit"
      )
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <div className="mx-20">
        <div className="flex items-center justify-between shrink-0 mt-[1%] ">
          <div className="flex gap-6 items-center">
            <button
              onClick={() => console.log("Dos & Don'ts Master")}
              className="flex items-center gap-2 focus:outline-none hover:opacity-80"
            >
              <img
                src={questionBnkIcon}
                alt="Dos & Don'ts Master"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                Dos and Don&apos;ts Master
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
                tableRef.current?.setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex overflow-hidden mt-7 h-[450px]">
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

      {/* ===== FOOTER ===== */}
      <Footer
        buttons={[
          { label: "Add New", onClick: handleAddNew },
        ]}
      />

      {/* ===== ADD / EDIT MODAL (FORMIK) ===== */}
      {editOpen && editForm && (
        <FormikEditModal
          open={editOpen}
          title={
            originalRow
              ? "Edit Dos and Don'ts"
              : "Add Dos and Don'ts"
          }
          leftTitle={
            originalRow
              ? "Edit Dos and Don'ts"
              : "Add Dos and Don'ts"
          }
          fields={dosDontFields}
          initialValues={editForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default DosDontsMaster;
