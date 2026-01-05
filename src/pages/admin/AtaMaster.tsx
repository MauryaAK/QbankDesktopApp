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

//         <div className="flex overflow-hidden mt-7 h-[450px]">
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

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_ATA_FORM = {
  ataCode: "",
  ataDescription: "",
  isActive: true,
};

const AtaMaster = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef<DataTableRef>(null);
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ================= STATE ================= */

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

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {
    const normalized = normalizeAircraftTypes(
      ataQuery.data?.ataMasters ?? [],
      []
    );

    setOriginalRow(null);                // 🔥 ADD MODE
    setEditForm(EMPTY_ATA_FORM);         // blank fields
    setGroups(normalized.groups);        // all aircraft groups
    setAircraftState({
      aircraftType: new Set(),           // none selected
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

  /* ================= SUBMIT (ADD + EDIT) ================= */

  const handleSubmit = () => {
    if (!userId) return;

    mutation.mutate(
      buildAtaPayload(
        originalRow,     // null → ADD | object → EDIT
        editForm,
        aircraftState,
        userId
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
              onClick={() => console.log("Question Bank clicked")}
              className="flex items-center gap-2 focus:outline-none hover:opacity-80"
            >
              <img
                src={questionBnkIcon}
                alt="Question Bank"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                Aircraft Type Master
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
          { label: "Download Excel", onClick: () => { } },
          { label: "Bulk ATA", onClick: () => { } },
          { label: "Add New", onClick: handleAddNew },
        ]}
      />

      {/* ===== ADD / EDIT MODAL ===== */}
      {editOpen && editForm && (
        <EditModalShell
          open={editOpen}
          title={originalRow ? "Edit ATA" : "Add ATA"}
          leftTitle={originalRow ? "Edit ATA" : "Add ATA"}
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
