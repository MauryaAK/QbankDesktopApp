// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { aircraftMaster } from "../../utils/tableColumns";
// import { getAircraftType, addEditAircraftType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { aircraftTypeFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAircraftTypePayload } from "../../utils/permissions/buildPayloads";

// const AircraftTypeMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const aircraftQuery: any = useQuery({
//     queryKey: ["aircraftType", userId],
//     queryFn: getAircraftType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(aircraftQuery.data?.aircraftTypes ?? []);
//   }, [aircraftQuery.data?.aircraftTypes]);

//   /* ================= EDIT CLICK ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);

//     setEditForm({
//       aircraftType: row.aircraftType,
//       isActive: row.isActive,
//     });

//     setEditOpen(true);
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAircraftType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["aircraftType"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("Aircraft Type update failed", err);
//     },
//   });

//   const handleSubmit = () => {
//     if (!originalRow || !userId) return;

//     mutation.mutate(
//       buildAircraftTypePayload(originalRow, editForm, userId)
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
//             columns={aircraftMaster}
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

//       {/* ===== EDIT MODAL ===== */}
//       {editOpen && editForm && (
//         <EditModalShell
//           open={editOpen}
//           title="Edit Aircraft Type"
//           leftTitle="Edit Aircraft Type"
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={aircraftTypeFields}
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

// export default AircraftTypeMaster;









// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { aircraftMaster } from "../../utils/tableColumns";
// import { getAircraftType, addEditAircraftType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { aircraftTypeFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAircraftTypePayload } from "../../utils/permissions/buildPayloads";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_AIRCRAFT_TYPE_FORM = {
//   aircraftType: "",
//   isActive: true,
// };

// const AircraftTypeMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const aircraftQuery: any = useQuery({
//     queryKey: ["aircraftType", userId],
//     queryFn: getAircraftType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(aircraftQuery.data?.aircraftTypes ?? []);
//   }, [aircraftQuery.data?.aircraftTypes]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);

//     setEditForm({
//       aircraftType: row.aircraftType,
//       isActive: row.isActive,
//     });

//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     setOriginalRow(null);                       // 🔥 ADD MODE
//     setEditForm(EMPTY_AIRCRAFT_TYPE_FORM);      // blank form
//     setEditOpen(true);
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAircraftType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["aircraftType"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("Aircraft Type update failed", err);
//     },
//   });

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = () => {
//     if (!userId) return;

//     mutation.mutate(
//       buildAircraftTypePayload(
//         originalRow,   // null → ADD | object → EDIT
//         editForm,
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
//             columns={aircraftMaster}
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
//           title={originalRow ? "Edit Aircraft Type" : "Add Aircraft Type"}
//           leftTitle={originalRow ? "Edit Aircraft Type" : "Add Aircraft Type"}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={aircraftTypeFields}
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

// export default AircraftTypeMaster;



// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import { aircraftMaster } from "../../utils/tableColumns";
// import { getAircraftType, addEditAircraftType } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
// import { aircraftTypeFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildAircraftTypePayload } from "../../utils/permissions/buildPayloads";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_AIRCRAFT_TYPE_FORM = {
//   mode: "add",          // 🔥 IMPORTANT for disable logic
//   aircraftType: "",
//   isActive: true,
// };

// const AircraftTypeMaster = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const aircraftQuery: any = useQuery({
//     queryKey: ["aircraftType", userId],
//     queryFn: getAircraftType,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(aircraftQuery.data?.aircraftTypes ?? []);
//   }, [aircraftQuery.data?.aircraftTypes]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);

//     setEditForm({
//       mode: "edit",               // 🔥 EDIT MODE
//       aircraftType: row.aircraftType,
//       isActive: row.isActive,
//     });

//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     setOriginalRow(null);                       // 🔥 ADD MODE
//     setEditForm(EMPTY_AIRCRAFT_TYPE_FORM);
//     setEditOpen(true);
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditAircraftType,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["aircraftType"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("Aircraft Type update failed", err);
//     },
//   });

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = (values: any) => {
//     if (!userId) return;

//     mutation.mutate(
//       buildAircraftTypePayload(
//         originalRow, // null → ADD | object → EDIT
//         values,
//         userId,
//         editForm.mode!=="edit"
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
//               onClick={() => console.log("Aircraft Type Master")}
//               className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//             >
//               <img
//                 src={questionBnkIcon}
//                 alt="Aircraft Type Master"
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
//             columns={aircraftMaster}
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

//       {/* ===== ADD / EDIT MODAL (FORMIK) ===== */}
//       {editOpen && editForm && (
//         <FormikEditModal
//           open={editOpen}
//           title={
//             originalRow
//               ? "Edit Aircraft Type"
//               : "Add Aircraft Type"
//           }
//           leftTitle={
//             originalRow
//               ? "Edit Aircraft Type"
//               : "Add Aircraft Type"
//           }
//           fields={aircraftTypeFields}
//           initialValues={editForm}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default AircraftTypeMaster;







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

import { aircraftMaster } from "../../utils/tableColumns";
import {
  getAircraftType,
  addEditAircraftType,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { aircraftTypeFields } from "../../components/common/EditModal/fieldRenderers";
import { buildAircraftTypePayload } from "../../utils/permissions/buildPayloads";
import { useAlert } from "../../hooks/useAlert";
import AlertModal from "../../components/common/AlertModal/AlertModal";

/* ================= TYPES ================= */

type AircraftTypeFormState = {
  mode: "add" | "edit";
  aircraftType: string;
  isActive: boolean;
} | null;

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_AIRCRAFT_TYPE_FORM: AircraftTypeFormState = {
  mode: "add",
  aircraftType: "",
  isActive: true,
};

/* ================= COMPONENT ================= */

const AircraftTypeMaster = () => {
  /* ===== REFS ===== */
  const tableRef = useRef<DataTableRef>(null);
  const { alert, showAlert, hideAlert } = useAlert();
  /* ===== GLOBAL STATE ===== */
  const userId = useAppSelector((s) => s.auth.user?.id);
  const queryClient = useQueryClient();

  /* ===== LOCAL STATE ===== */
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editForm, setEditForm] =
    useState<AircraftTypeFormState>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);

  /* ================= API ================= */

  const aircraftQuery: any = useQuery({
    queryKey: ["aircraftType", userId],
    queryFn: getAircraftType,
    enabled: !!userId,
  });

  /* ================= ROWS ================= */

  const rows = useMemo(
    () =>
      withRowId(
        aircraftQuery.data?.aircraftTypes ?? []
      ),
    [aircraftQuery.data?.aircraftTypes]
  );

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    setOriginalRow(row);

    setEditForm({
      mode: "edit",
      aircraftType: row.aircraftType,
      isActive: row.isActive,
    });

    setEditOpen(true);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {
    setOriginalRow(null);
    setEditForm(EMPTY_AIRCRAFT_TYPE_FORM);
    setEditOpen(true);
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditAircraftType,
    onSuccess: (result: any) => {
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
        queryKey: ["aircraftType"],
      });
      setEditOpen(false);
    },
    onError: (err) => {
      console.error(
        "Aircraft Type update failed",
        err
      );
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (values: any) => {
    if (!userId || !editForm) return;

    mutation.mutate(
      buildAircraftTypePayload(
        originalRow, // null → ADD | object → EDIT
        values,
        userId,
        editForm.mode !== "edit"
      )
    );
  };

  /* ================= LOADING ================= */

  const isPageLoading =
    aircraftQuery.isLoading || mutation.isPending;

  /* ================= RENDER ================= */

  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isPageLoading} fullscreen />
      <AlertModal {...alert} />
      <div className="mx-20 mt-5">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between shrink-0 mt-[1%]">
          <div className="flex gap-6 items-center">
            <button
              className="flex items-center gap-2 focus:outline-none hover:opacity-80"
            >
              <img
                src={questionBnkIcon}
                alt="Aircraft Type Master"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                Aircraft Type Master
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
            columns={aircraftMaster}
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

      {/* ===== ADD / EDIT MODAL ===== */}
      {editOpen && editForm && (
        <FormikEditModal
          type={originalRow}
          open={editOpen}
          title={
            originalRow
              ? "Edit Aircraft Type"
              : "Add Aircraft Type"
          }
          leftTitle={
            originalRow
              ? "Edit Aircraft Type"
              : "Add Aircraft Type"
          }
          fields={aircraftTypeFields}
          initialValues={editForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AircraftTypeMaster;
