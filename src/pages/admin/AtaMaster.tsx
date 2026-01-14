// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { getAtaType, addEditAtaType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
// import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

// import { ataFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAtaPayload } from "../../utils/permissions/buildPayloads";
// import { normalizeAircraftTypes } from "../../utils/normalizeAircraftTypes";
// import { ataMaster } from "../../utils/tableColumns";

// const AtaMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   const [groups, setGroups] = useState<any[]>([]);
//   const [aircraftState, setAircraftState] = useState<
//     Record<string, Set<string>>
//   >({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   /* ================= API ================= */

//   const ataQuery: any = useQuery({
//     queryKey: ["ataMaster", userId],
//     queryFn: getAtaType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(ataQuery.data?.ataMasters ?? []);
//   }, [ataQuery.data?.ataMasters]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     const normalized = normalizeAircraftTypes(
//       ataQuery.data?.ataMasters ?? [],
//       row.aircraftType
//     );

//     setOriginalRow(row);
//     setEditForm({
//       ataCode: row.ataCode,
//       ataDescription: row.ataDescription,
//       isActive: row.isActive,
//     });

//     setGroups(normalized.groups);
//     setAircraftState({
//       aircraftType: normalized.selected.aircraftType,
//     });
//     setExpanded({});
//     setEditOpen(true);
//   };

//   /* ================= CHECKBOX ================= */

//   const handleAircraftChange = (
//     groupKey: string,
//     itemKey: string,
//     checked: boolean
//   ) => {
//     setAircraftState((prev) => {
//       const next = new Set(prev[groupKey] ?? []);
//       checked ? next.add(itemKey) : next.delete(itemKey);
//       return { ...prev, [groupKey]: next };
//     });
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAtaType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ataMaster"] });
//       setEditOpen(false);
//     },
//   });

//   const handleSubmit = () => {
//     if (!originalRow || !userId) return;
//     mutation.mutate(
//       buildAtaPayload(
//         originalRow,
//         editForm,
//         aircraftState,
//         userId
//       )
//     );
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="mx-20 mt-5">
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
//                 Aircraft Type Master
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

//         <div className="flex overflow-hidden mt-5 h-[450px]">
//           <DataTable
//             ref={tableRef}
//             columns={ataMaster}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true }}
//             onEditClick={handleEditClick}
//           />
//         </div>
//       </div>

//       <Footer
//         buttons={[
//           { label: "Download Excel", onClick: () => { } },
//           { label: "Bulk ATA", onClick: () => { } },
//           { label: "Add New", onClick: () => { } },
//         ]}
//       />

//       {editOpen && editForm && (
//         <EditModalShell
//           open={editOpen}
//           title="Edit ATA"
//           leftTitle="Edit ATA"
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={ataFields}
//             values={editForm}
//             onChange={(n, v) =>
//               setEditForm((p: any) => ({ ...p, [n]: v }))
//             }
//           />

//           <EditModalFieldWrapper label="Aircraft Type" required>
//             <ExpandableOptionGroup
//               groups={groups}
//               value={{
//                 aircraftType: Array.from(
//                   aircraftState.aircraftType ?? []
//                 ),
//               }}
//               expanded={expanded}
//               onToggleGroup={() => { }}
//               onChange={handleAircraftChange}
//             />
//           </EditModalFieldWrapper>
//         </EditModalShell>
//       )}
//     </div>
//   );
// };

// export default AtaMaster;



// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { getAtaType, addEditAtaType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
// import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

// import { ataFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAtaPayload } from "../../utils/permissions/buildPayloads";
// import { normalizeAircraftTypes } from "../../utils/normalizeAircraftTypes";
// import { ataMaster } from "../../utils/tableColumns";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_ATA_FORM = {
//   ataCode: "",
//   ataDescription: "",
//   isActive: true,
// };

// const AtaMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   const [groups, setGroups] = useState<any[]>([]);
//   const [aircraftState, setAircraftState] = useState<
//     Record<string, Set<string>>
//   >({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   /* ================= API ================= */

//   const ataQuery: any = useQuery({
//     queryKey: ["ataMaster", userId],
//     queryFn: getAtaType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(ataQuery.data?.ataMasters ?? []);
//   }, [ataQuery.data?.ataMasters]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     const normalized = normalizeAircraftTypes(
//       ataQuery.data?.ataMasters ?? [],
//       row.aircraftType
//     );

//     setOriginalRow(row);
//     setEditForm({
//       ataCode: row.ataCode,
//       ataDescription: row.ataDescription,
//       isActive: row.isActive,
//     });

//     setGroups(normalized.groups);
//     setAircraftState({
//       aircraftType: normalized.selected.aircraftType,
//     });
//     setExpanded({});
//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     const normalized = normalizeAircraftTypes(
//       ataQuery.data?.ataMasters ?? [],
//       []
//     );

//     setOriginalRow(null);                // 🔥 ADD MODE
//     setEditForm(EMPTY_ATA_FORM);         // blank fields
//     setGroups(normalized.groups);        // all aircraft groups
//     setAircraftState({
//       aircraftType: new Set(),           // none selected
//     });
//     setExpanded({});
//     setEditOpen(true);
//   };

//   /* ================= CHECKBOX ================= */

//   const handleAircraftChange = (
//     groupKey: string,
//     itemKey: string,
//     checked: boolean
//   ) => {
//     setAircraftState((prev) => {
//       const next = new Set(prev[groupKey] ?? []);
//       checked ? next.add(itemKey) : next.delete(itemKey);
//       return { ...prev, [groupKey]: next };
//     });
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAtaType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ataMaster"] });
//       setEditOpen(false);
//     },
//   });

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = () => {
//     if (!userId) return;

//     mutation.mutate(
//       buildAtaPayload(
//         originalRow,     // null → ADD | object → EDIT
//         editForm,
//         aircraftState,
//         userId
//       )
//     );
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="mx-20 mt-5">
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
//                 Aircraft Type Master
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

//         <div className="flex overflow-hidden mt-5 h-[450px]">
//           <DataTable
//             ref={tableRef}
//             columns={ataMaster}
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
//           { label: "Download Excel", onClick: () => { } },
//           { label: "Bulk ATA", onClick: () => { } },
//           { label: "Add New", onClick: handleAddNew },
//         ]}
//       />

//       {/* ===== ADD / EDIT MODAL ===== */}
//       {editOpen && editForm && (
//         <EditModalShell
//           open={editOpen}
//           title={originalRow ? "Edit ATA" : "Add ATA"}
//           leftTitle={originalRow ? "Edit ATA" : "Add ATA"}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={ataFields}
//             values={editForm}
//             onChange={(n, v) =>
//               setEditForm((p: any) => ({ ...p, [n]: v }))
//             }
//           />

//           <EditModalFieldWrapper label="Aircraft Type" required>
//             <ExpandableOptionGroup
//               groups={groups}
//               value={{
//                 aircraftType: Array.from(
//                   aircraftState.aircraftType ?? []
//                 ),
//               }}
//               expanded={expanded}
//               onToggleGroup={() => { }}
//               onChange={handleAircraftChange}
//             />
//           </EditModalFieldWrapper>
//         </EditModalShell>
//       )}
//     </div>
//   );
// };

// // export default AtaMaster;
// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { getAtaType, addEditAtaType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
// import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
// import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

// import { ataFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAtaPayload } from "../../utils/permissions/buildPayloads";
// import { normalizeAircraftTypes } from "../../utils/normalizeAircraftTypes";
// import { ataMaster } from "../../utils/tableColumns";
// import { exportExcel } from "../../utils/exporters/exportExcel";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_ATA_FORM = {
//   mode: "add",               // 🔥 IMPORTANT
//   ataCode: "",
//   ataDescription: "",
//   isActive: true,
// };

// const AtaMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   const [groups, setGroups] = useState<any[]>([]);
//   const [aircraftState, setAircraftState] = useState<
//     Record<string, Set<string>>
//   >({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   /* ================= API ================= */

//   const ataQuery: any = useQuery({
//     queryKey: ["ataMaster", userId],
//     queryFn: getAtaType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(ataQuery.data?.ataMasters ?? []);
//   }, [ataQuery.data?.ataMasters]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     const normalized = normalizeAircraftTypes(
//       ataQuery.data?.ataMasters ?? [],
//       row.aircraftType
//     );

//     setOriginalRow(row);

//     setEditForm({
//       mode: "edit",                 // 🔥 EDIT MODE
//       ataCode: row.ataCode,
//       ataDescription: row.ataDescription,
//       isActive: row.isActive,
//     });

//     setGroups(normalized.groups);
//     setAircraftState({
//       aircraftType: normalized.selected.aircraftType,
//     });
//     setExpanded({});
//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     const normalized = normalizeAircraftTypes(
//       ataQuery.data?.ataMasters ?? [],
//       []
//     );

//     setOriginalRow(null);                // 🔥 ADD MODE
//     setEditForm(EMPTY_ATA_FORM);
//     setGroups(normalized.groups);
//     setAircraftState({
//       aircraftType: new Set(),
//     });
//     setExpanded({});
//     setEditOpen(true);
//   };

//   /* ================= CHECKBOX ================= */

//   const handleAircraftChange = (
//     groupKey: string,
//     itemKey: string,
//     checked: boolean
//   ) => {
//     setAircraftState((prev) => {
//       const next = new Set(prev[groupKey] ?? []);
//       checked ? next.add(itemKey) : next.delete(itemKey);
//       return { ...prev, [groupKey]: next };
//     });
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAtaType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ataMaster"] });
//       setEditOpen(false);
//     },
//   });

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = (values: any) => {
//     if (!userId) return;
//     mutation.mutate(
//       buildAtaPayload(
//         originalRow,        // null → ADD | object → EDIT
//         values,
//         aircraftState,
//         userId,
//         editForm.mode !== "edit"
//       )
//     );
//   };

//   /* ================= RENDER ================= */

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="mx-20 mt-5">
//         <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//           <div className="flex gap-6 items-center">
//             <button
//               onClick={() => console.log("ATA Master")}
//               className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//             >
//               <img
//                 src={questionBnkIcon}
//                 alt="ATA Master"
//                 className="w-12 h-12"
//               />
//               <span className="text-md font-extrabold text-black">
//                 ATA Master
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

//         <div className="flex overflow-hidden mt-5 h-[450px]">
//           <DataTable
//             ref={tableRef}
//             columns={ataMaster}
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
//           {
//             label: "Download Excel", onClick: async () => {
//               await exportExcel(
//                 ataMaster,
//                 rows,
//                 "ATA_Master",
//                 "testUser"
//               );
//             }
//           },
//           { label: "Bulk ATA", onClick: () => { } },
//           { label: "Add New", onClick: handleAddNew },
//         ]}
//       />

//       {/* ===== ADD / EDIT MODAL (FORMIK) ===== */}
//       {editOpen && editForm && (
//         <FormikEditModal
//           open={editOpen}
//           title={originalRow ? "Edit ATA" : "Add ATA"}
//           leftTitle={originalRow ? "Edit ATA" : "Add ATA"}
//           fields={ataFields}
//           initialValues={editForm}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalFieldWrapper label="Aircraft Type" required>
//             <ExpandableOptionGroup
//               groups={groups}
//               value={{
//                 aircraftType: Array.from(
//                   aircraftState.aircraftType ?? []
//                 ),
//               }}
//               expanded={expanded}
//               onToggleGroup={() => { }}
//               onChange={handleAircraftChange}
//             />
//           </EditModalFieldWrapper>
//         </FormikEditModal>
//       )}
//     </div>
//   );
// };

// export default AtaMaster;











import { useMemo, useRef, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
  getAtaType,
  addEditAtaType,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import EditModalFieldWrapper from "../../components/common/EditModal/EditModalFieldWrapper";
import ExpandableOptionGroup from "../../components/common/EditModal/ExpandableOptionGroup";

import { ataFields } from "../../components/common/EditModal/fieldRenderers";
import { buildAtaPayload } from "../../utils/permissions/buildPayloads";
import { normalizeAircraftTypes } from "../../utils/normalizeAircraftTypes";
import { ataMaster } from "../../utils/tableColumns";
import { exportExcel } from "../../utils/exporters/exportExcel";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { useAlert } from "../../hooks/useAlert";

/* ================= TYPES ================= */

type AtaFormState = {
  mode: "add" | "edit";
  ataCode: string;
  ataDescription: string;
  isActive: boolean;
} | null;

type AircraftState = Record<string, Set<string>>;

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_ATA_FORM: AtaFormState = {
  mode: "add",
  ataCode: "",
  ataDescription: "",
  isActive: true,
};

/* ================= COMPONENT ================= */

const AtaMaster = () => {
  /* ===== REFS ===== */
  const tableRef = useRef<DataTableRef>(null);
  const { alert, showAlert, hideAlert } = useAlert();
  /* ===== GLOBAL STATE ===== */
  const userId = useAppSelector((s) => s.auth.user?.id);
  const queryClient = useQueryClient();

  /* ===== LOCAL STATE ===== */
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<AtaFormState>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  const [groups, setGroups] = useState<any[]>([]);
  const [aircraftState, setAircraftState] =
    useState<AircraftState>({});
  const [expanded, setExpanded] =
    useState<Record<string, boolean>>({});

  /* ================= API ================= */

  const ataQuery: any = useQuery({
    queryKey: ["ataMaster", userId],
    queryFn: getAtaType,
    enabled: !!userId,
  });

  /* ================= ROWS ================= */

  const rows = useMemo(
    () =>
      withRowId(
        ataQuery.data?.ataMasters ?? []
      ),
    [ataQuery.data?.ataMasters]
  );

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    const normalized = normalizeAircraftTypes(
      ataQuery.data?.ataMasters ?? [],
      row.aircraftType
    );

    setOriginalRow(row);

    setEditForm({
      mode: "edit",
      ataCode: row.ataCode,
      ataDescription: row.ataDescription,
      isActive: row.isActive,
    });

    setGroups(normalized.groups);
    setAircraftState({
      aircraftType:
        normalized.selected.aircraftType,
    });
    setExpanded({});
    setEditOpen(true);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {
    const normalized = normalizeAircraftTypes(
      ataQuery.data?.ataMasters ?? [],
      []
    );

    setOriginalRow(null);
    setEditForm(EMPTY_ATA_FORM);

    setGroups(normalized.groups);
    setAircraftState({
      aircraftType: new Set(),
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
    onSuccess: (result:any) => {
       if (result?.isError) {
        showAlert({
          title: "Error",
          message: <div className="font-bold">{result?.errorMessage}</div>,
          variant: "error",
          showActionButtons: false,
          onClose: hideAlert,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["ataMaster"],
      });
      setEditOpen(false);
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (values: any) => {
    if (!userId || !editForm) return;

    mutation.mutate(
      buildAtaPayload(
        originalRow, // null → ADD | object → EDIT
        values,
        aircraftState,
        userId,
        editForm.mode !== "edit"
      )
    );
  };

  /* ================= LOADING ================= */

  const isPageLoading =
    ataQuery.isLoading || mutation.isPending;

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isPageLoading} fullscreen />
      <AlertModal {...alert} />
      <div className="mx-20 mt-5">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between shrink-0 mt-[1%]">
          <div className="flex gap-6 items-center">
            <button className="flex items-center gap-2 focus:outline-none hover:opacity-80">
              <img
                src={questionBnkIcon}
                alt="ATA Master"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                ATA Master
              </span>
            </button>
          </div>

          {/* ===== SEARCH ===== */}
          <div className="flex items-center w-[17%] h-8 rounded-xl bg-[#C3BFBF] border border-red-200 shadow-sm px-2 mt-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <img
                src={searchIcon}
                alt="Search"
                className="w-8 h-8 mr-16"
              />
            </div>

            <input
              placeholder="Search"
              className="flex-1 bg-transparent px-4 text-sm placeholder-gray-600 focus:outline-none"
              onChange={(e) =>
                tableRef.current?.setSearch(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="flex overflow-hidden mt-5 h-[450px]">
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

      {/* ===== FOOTER ===== */}
      <Footer
        buttons={[
          {
            label: "Download Excel",
            onClick: async () => {
              await exportExcel(
                ataMaster,
                rows,
                "ATA_Master",
                "testUser"
              );
            },
          },
          { label: "Bulk ATA", onClick: () => { } },
          { label: "Add New", onClick: handleAddNew },
        ]}
      />

      {/* ===== ADD / EDIT MODAL ===== */}
      {editOpen && editForm && (
        <FormikEditModal
        type={originalRow}
          open={editOpen}
          title={originalRow ? "Edit ATA" : "Add ATA"}
          leftTitle={
            originalRow ? "Edit ATA" : "Add ATA"
          }
          fields={ataFields}
          initialValues={editForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        >
          <EditModalFieldWrapper
            label="Aircraft Type"
            required
          >
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
        </FormikEditModal>
      )}
    </div>
  );
};

export default AtaMaster;
