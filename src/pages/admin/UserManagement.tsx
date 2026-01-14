// import { useRef, useState, useMemo } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import { userManagement } from "../../utils/tableColumns";
// import searchIcon from "../../assets/searchIcon.svg";

// import {
//   addEditUserMaster,
//   getUserMaster,
//   updatePassword,
// } from "../../api/ApiCollection";

// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { userFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildUserPayload } from "../../utils/permissions/buildPayloads";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// const UserManagement = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const userQuery: any = useQuery({
//     queryKey: ["userMaster", userId],
//     queryFn: getUserMaster,
//     enabled: !!userId,
//   });



//   const rows = useMemo(() => {
//     return withRowId(userQuery.data?.userDetails ?? []);
//   }, [userQuery.data?.userDetails]);

//   /* ================= EDIT CLICK ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       userName: row.userName,
//       name: row.name,
//       emailId: row.emailId,
//       contactNumber: row.contactNumber,
//       roleName: row.roleName,
//       isActive: row.isActive,
//     });

//     setEditOpen(true);
//   };
//   const handleUpdatePassword = async (row) => {
//     await updatePassword({
//       sno: row.sno,
//       currentPassword: null,
//       newPassword: "123",
//       userId: userId
//     })
//   }

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditUserMaster,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userMaster"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("Edit User failed", err);
//     },
//   });

//   const handleSubmit = () => {
//     if (!originalRow || !userId) return;

//     mutation.mutate(
//       buildUserPayload(originalRow, editForm, userId)
//     );
//   };

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
//                 User Management
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
//             columns={userManagement}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true, refresh: true }}
//             onEditClick={handleEditClick}
//             onRefreshClick={handleUpdatePassword}
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
//           title="Edit User"
//           leftTitle="Edit User"
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={userFields}
//             values={editForm}
//             // extraOptions={{
//             //   roles: roleOptions,
//             // }}
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

// export default UserManagement;





// import { useRef, useState, useMemo } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import { userManagement } from "../../utils/tableColumns";
// import searchIcon from "../../assets/searchIcon.svg";

// import {
//   addEditUserMaster,
//   getUserMaster,
//   updatePassword,
// } from "../../api/ApiCollection";

// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import {
//   EditModalShell,
//   EditModalRenderer,
// } from "../../components/common/EditModal";

// import { userFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildUserPayload } from "../../utils/permissions/buildPayloads";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";
// import { attachSelectOptions } from "../../utils/applyFieldOptions";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_USER_FORM = {
//   userName: "",
//   name: "",
//   emailId: "",
//   contactNumber: "",
//   roleName: "",
//   isActive: true,
// };

// const UserManagement = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);

//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const userQuery: any = useQuery({
//     queryKey: ["userMaster", userId],
//     queryFn: getUserMaster,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(userQuery.data?.userDetails ?? []);
//   }, [userQuery.data?.userDetails]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       userName: row.userName,
//       name: row.name,
//       emailId: row.emailId,
//       contactNumber: row.contactNumber,
//       roleName: row.roleName,
//       isActive: row.isActive,
//     });
//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     setOriginalRow(null);               // 🔥 ADD MODE
//     setEditForm(EMPTY_USER_FORM);       // blank fields
//     setEditOpen(true);
//   };

//   const handleUpdatePassword = async (row: any) => {
//     await updatePassword({
//       sno: row.sno,
//       currentPassword: null,
//       newPassword: "123",
//       userId: userId,
//     });
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditUserMaster,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userMaster"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("User save failed", err);
//     },
//   });

//   const fieldsWithOptions = useMemo(() => {
//     return attachSelectOptions(userFields, [
//       {
//         field: "roleName",
//         data: rows,
//         labelKey: "roleName",
//         valueKey: "roleName",
//       },
//     ]);
//   }, [rows]);

//   console.log("fieldsWithOptions==>", userFields);


//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = () => {
//     if (!userId) return;

//     const payload = buildUserPayload(
//       originalRow, // null → ADD | object → EDIT
//       editForm,
//       userId
//     );

//     mutation.mutate(payload);
//   };

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
//                 User Management
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
//             columns={userManagement}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true, refresh: true }}
//             onEditClick={handleEditClick}
//             onRefreshClick={handleUpdatePassword}
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
//           title={originalRow ? "Edit User" : "Add User"}
//           leftTitle={originalRow ? "Edit User" : "Add User"}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         >
//           <EditModalRenderer
//             fields={fieldsWithOptions}
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

// export default UserManagement;


// import { useRef, useState, useMemo } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import DataTable, { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";
// import { userManagement } from "../../utils/tableColumns";
// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import {
//   addEditUserMaster,
//   getUserMaster,
//   updatePassword,
// } from "../../api/ApiCollection";

// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
// import { userFields } from "../../components/common/EditModal/fieldRenderers";
// import { buildUserPayload } from "../../utils/permissions/buildPayloads";
// import { attachSelectOptions } from "../../utils/applyFieldOptions";
// import { AlertConfig } from "../../components/common/AlertModal/alert.types";
// import AlertModal from "../../components/common/AlertModal/AlertModal";

// /* ================= EMPTY FORM (ADD MODE) ================= */

// const EMPTY_USER_FORM = {
//   mode: "add",          // 🔥 IMPORTANT (for disable logic)
//   userName: "",
//   name: "",
//   emailId: "",
//   contactNumber: "",
//   roleName: "",
//   isActive: true,
// };

// const UserManagement = () => {
//   const queryClient = useQueryClient();
//   const tableRef = useRef<DataTableRef>(null);
//   const userId = useAppSelector((s) => s.auth.user?.id);
//   const [alert, setAlert] = useState<AlertConfig>({
//     open: false,
//     title: "",
//     message: "",
//     variant: "warning",
//     showActionButtons: true,
//   });
//   const hideAlert = () =>
//     setAlert((prev) => ({ ...prev, open: false }));
//   /* ================= STATE ================= */

//   const [editOpen, setEditOpen] = useState(false);
//   const [editForm, setEditForm] = useState<any>(null);
//   const [originalRow, setOriginalRow] = useState<any>(null);

//   /* ================= API ================= */

//   const userQuery: any = useQuery({
//     queryKey: ["userMaster", userId],
//     queryFn: getUserMaster,
//     enabled: !!userId,
//   });

//   const rows = useMemo(() => {
//     return withRowId(userQuery.data?.userDetails ?? []);
//   }, [userQuery.data?.userDetails]);

//   /* ================= EDIT ================= */

//   const handleEditClick = (row: any) => {
//     setOriginalRow(row);
//     setEditForm({
//       mode: "edit",              // 🔥 EDIT MODE
//       userName: row.userName,
//       name: row.name,
//       emailId: row.emailId,
//       contactNumber: row.contactNumber,
//       roleName: row.roleName,
//       isActive: row.isActive,
//     });
//     setEditOpen(true);
//   };

//   /* ================= ADD NEW ================= */

//   const handleAddNew = () => {
//     setOriginalRow(null);          // 🔥 ADD MODE
//     setEditForm(EMPTY_USER_FORM);
//     setEditOpen(true);
//   };

//   /* ================= UPDATE PASSWORD ================= */

//   const handleUpdatePassword = (row: any) => {


//     setAlert({
//       open: true,
//       title: "Confirm Action",
//       message: (
//         <>
//           Are you sure you want to{" "}
//           <strong className="text-red-600 font-bold uppercase">
//             Reset
//           </strong>{" "}
//           Password?
//         </>
//       ),

//       variant: "warning",
//       showActionButtons: true,

//       onConfirm: async () => {
//         await updatePassword({
//           sno: row.sno,
//           currentPassword: null,
//           newPassword: "123",
//           userId: userId,
//         });
//       },

//       onCancel: () => {

//       },

//       onClose: hideAlert,
//     });
//   };

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: addEditUserMaster,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userMaster"] });
//       setEditOpen(false);
//     },
//     onError: (err) => {
//       console.error("User save failed", err);
//     },
//   });

//   /* ================= SELECT OPTIONS ================= */

//   const fieldsWithOptions = useMemo(() => {
//     return attachSelectOptions(userFields, [
//       {
//         field: "roleName",
//         data: rows,
//         labelKey: "roleName",
//         valueKey: "roleName",
//       },
//     ]);
//   }, [rows]);

//   /* ================= SUBMIT (ADD + EDIT) ================= */

//   const handleSubmit = (values: any) => {
//     if (!userId) return;

//     const payload = buildUserPayload(
//       originalRow, // null → ADD | object → EDIT
//       values,
//       userId,
//       editForm.mode !== "edit"

//     );

//     mutation.mutate(payload);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <AlertModal {...alert} />
//       <div className="mx-20 mt-5">
//         <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//           <div className="flex gap-6 items-center">
//             <button
//               onClick={() => console.log("User Management")}
//               className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//             >
//               <img
//                 src={questionBnkIcon}
//                 alt="User Management"
//                 className="w-12 h-12"
//               />
//               <span className="text-md font-extrabold text-black">
//                 User Management
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
//             columns={userManagement}
//             rows={rows}
//             includeActionColumn
//             actionConfig={{ edit: true, refresh: true }}
//             onEditClick={handleEditClick}
//             onRefreshClick={handleUpdatePassword}
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
//           title={originalRow ? "Edit User" : "Add User"}
//           leftTitle={originalRow ? "Edit User" : "Add User"}
//           fields={fieldsWithOptions}
//           initialValues={editForm}
//           onClose={() => setEditOpen(false)}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;





import { useRef, useState, useMemo } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";

import { userManagement } from "../../utils/tableColumns";
import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
  addEditUserMaster,
  getUserMaster,
  updatePassword,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { userFields } from "../../components/common/EditModal/fieldRenderers";
import { buildUserPayload } from "../../utils/permissions/buildPayloads";
import { attachSelectOptions } from "../../utils/applyFieldOptions";

import AlertModal from "../../components/common/AlertModal/AlertModal";
import { AlertConfig } from "../../components/common/AlertModal/alert.types";
import { useAlert } from "../../hooks/useAlert";

/* ================= TYPES ================= */

type UserFormState = {
  mode: "add" | "edit";
  userName: string;
  name: string;
  emailId: string;
  contactNumber: string;
  roleName: string;
  isActive: boolean;
} | null;

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_USER_FORM: UserFormState = {
  mode: "add",
  userName: "",
  name: "",
  emailId: "",
  contactNumber: "",
  roleName: "",
  isActive: true,
};

/* ================= COMPONENT ================= */

const UserManagement = () => {
  /* ===== REFS ===== */
  const tableRef = useRef<DataTableRef>(null);

  /* ===== GLOBAL STATE ===== */
  const userId = useAppSelector((s) => s.auth.user?.id);
  const queryClient = useQueryClient();
  const { alert, showAlert, hideAlert } = useAlert();
  /* ===== LOCAL STATE ===== */
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<UserFormState>(null);
  const [originalRow, setOriginalRow] = useState<any>(null);


  /* ================= API ================= */

  const userQuery: any = useQuery({
    queryKey: ["userMaster", userId],
    queryFn: getUserMaster,
    enabled: !!userId,
  });

  /* ================= ROWS ================= */

  const rows = useMemo(
    () => withRowId(userQuery.data?.userDetails ?? []),
    [userQuery.data?.userDetails]
  );

  /* ================= EDIT ================= */

  const handleEditClick = (row: any) => {
    setOriginalRow(row);
    setEditForm({
      mode: "edit",
      userName: row.userName,
      name: row.name,
      emailId: row.emailId,
      contactNumber: row.contactNumber,
      roleName: row.roleName,
      isActive: row.isActive,
    });
    setEditOpen(true);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {
    setOriginalRow(null);
    setEditForm(EMPTY_USER_FORM);
    setEditOpen(true);
  };

  /* ================= UPDATE PASSWORD ================= */

  const handleUpdatePassword = (row: any) => {
    showAlert({
      title: "Confirm Action",
      message: <>
        Are you sure you want to{" "}
        <strong className="text-red-600 font-bold uppercase">
          Reset
        </strong>{" "}
        Password?
      </>,
      onConfirm: async () => {
        await updatePassword({
          sno: row.sno,
          currentPassword: null,
          newPassword: "123",
          userId: userId,
        });
      },
      variant: "warning",
      showActionButtons: true,
      onClose: hideAlert,
    });
  };

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: addEditUserMaster,
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
        queryKey: ["userMaster"],
      });
      setEditOpen(false);
    },
    onError: (err) => {
      console.error("User save failed", err);
    },
  });

  /* ================= SELECT OPTIONS ================= */

  const fieldsWithOptions = useMemo(() => {
    return attachSelectOptions(userFields, [
      {
        field: "roleName",
        data: rows,
        labelKey: "roleName",
        valueKey: "roleName",
      },
    ]);
  }, [rows]);

  /* ================= SUBMIT ================= */

  const handleSubmit = (values: any) => {
    if (!userId || !editForm) return;

    const payload = buildUserPayload(
      originalRow, // null → ADD | object → EDIT
      values,
      userId,
      editForm.mode !== "edit"
    );

    mutation.mutate(payload);
  };

  /* ================= LOADING ================= */

  const isPageLoading =
    userQuery.isLoading || mutation.isPending;

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
                alt="User Management"
                className="w-12 h-12"
              />
              <span className="text-md font-extrabold text-black">
                User Management
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
                tableRef.current?.setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="flex overflow-hidden mt-5 h-[450px]">
          <DataTable
            ref={tableRef}
            columns={userManagement}
            rows={rows}
            includeActionColumn
            actionConfig={{ edit: true, refresh: true }}
            onEditClick={handleEditClick}
            onRefreshClick={handleUpdatePassword}
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
          title={originalRow ? "Edit User" : "Add User"}
          leftTitle={originalRow ? "Edit User" : "Add User"}
          fields={fieldsWithOptions}
          initialValues={editForm}
          onClose={() => setEditOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UserManagement;
