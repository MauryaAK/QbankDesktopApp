// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   ScrollRestoration,
// } from 'react-router-dom';
// import ToasterProvider from './components/ToasterProvider';
// import Login from './pages/Login';
// import RoleManagement from './pages/admin/RoleManagement';
// import UserManagement from './pages/admin/UserManagement';
// import AircraftTypeMaster from './pages/admin/AircraftTypeMaster';
// import AtaMaster from './pages/admin/AtaMaster';
// import DosDontsMaster from './pages/admin/DosDontsMaster';
// import MachineMaster from './pages/admin/MachineMaster';
// import AddQuestion from './pages/questionBank/AddQuestion';
// import CheckQuestion from './pages/questionBank/CheckQuestion';
// import VerifyQuestion from './pages/questionBank/VerifyQuestion';
// import RegisterCandidate from './pages/examPaper/RegisterCandidate';
// import AtaGroups from './pages/examPaper/AtaGroups';
// import ValidatePaper from './pages/examPaper/ValidatePaper';
// import GeneratePaper from './pages/examPaper/GeneratePaper';
// import ExamStatus from './pages/examStatus/ExamStatus';
// import AtaPerformance from './pages/reports/AtaPerformance';
// import QuestionPerformance from './pages/reports/QuestionPerformance';
// import QuestionCandidate from './pages/reports/QuestionCandidate';
// import ActivityLog from './components/transaction/ActivityLog';
// import ResultReport from './pages/reports/ResultReport';
// import QuestionModified from './pages/reports/QuestionModified';
// import QuestionIdList from './pages/reports/QuestionIdList';
// import ValidationReport from './pages/reports/ValidationReport';
// import { BTNNavBar } from './components/common/Nav';
// import Dashboard from './pages/dashboard/Dashboard';
// import Error from './pages/Error';
// import { useMutation } from '@tanstack/react-query';
// import { checkDeviceRegister } from './api/ApiCollection';
// import AlertModal from './components/common/AlertModal/AlertModal';
// import { useAlert } from './hooks/useAlert';
// import { useEffect, useMemo, useRef } from 'react';
// import { invoke } from "@tauri-apps/api/core";
// import { useDeviceFingerprint } from './hooks/useDeviceFingerprint';


// interface Payload {
//   deviceFingerprint: string;
//   deviceName: string;
//   deviceMode: string;
// }

// function App() {



//   const { deviceInfo } = useDeviceFingerprint();
//   const hasCheckedRef = useRef(false);
//   const { alert, showAlert, hideAlert } = useAlert();

//   const payload: Payload | null = useMemo(() => {
//     if (!deviceInfo?.fingerprint) return null;

//     return {
//       deviceFingerprint: deviceInfo?.fingerprint,
//       deviceName: deviceInfo?.deviceName,
//       deviceMode: "Admin",
//     };
//   }, [deviceInfo?.fingerprint]);

//   const checkDeviceMutation = useMutation({
//     mutationFn: (data: Payload) => checkDeviceRegister(data),
//     onSuccess: (data: any) => {
//       if (data) {
//         showAlert({
//           title: "Machine Activation Required",
//           message: data.errorMessage,
//           variant: "error",
//           onClose: hideAlert,
//         });
//       }
//     },
//     onError: (err) => {
//       console.log("error==>", err);


//     },
//   });

//   const aa = async () => {

//     const deviceInfo = await invoke("get_device_info");
//     console.log("deviceInfo===>", deviceInfo);

//   }

//   useEffect(() => {
//     aa()
//     if (!payload) return;
//     if (hasCheckedRef.current) return;

//     hasCheckedRef.current = true;
//     checkDeviceMutation.mutate(payload);
//   }, [payload]);

//   const Layout = () => {
//     return (
//       <div>

//         <ToasterProvider />
//         <ScrollRestoration />
//         <div className='h-screen'>
//           <BTNNavBar />
//           <Outlet />

//         </div>
//       </div>

//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/login",
//       element: <Layout />,
//       errorElement: <Error />,
//       children: [
//         { path: "dashboard", element: <Dashboard /> },

//         /* ===== ADMIN ===== */
//         { path: "admin/role-management", element: <RoleManagement /> },
//         { path: "admin/user-management", element: <UserManagement /> },
//         { path: "admin/aircraft-type-master", element: <AircraftTypeMaster /> },
//         { path: "admin/ata-master", element: <AtaMaster /> },
//         { path: "admin/dos-donts-master", element: <DosDontsMaster /> },
//         { path: "admin/machine-master", element: <MachineMaster /> },

//         /* ===== QUESTION BANK ===== */
//         { path: "question-bank/add", element: <AddQuestion /> },
//         { path: "question-bank/check", element: <CheckQuestion /> },
//         { path: "question-bank/verify", element: <VerifyQuestion /> },

//         /* ===== EXAM PAPER ===== */
//         { path: "exam-paper/ata-groups", element: <AtaGroups /> },
//         { path: "exam-paper/register-candidate", element: <RegisterCandidate /> },
//         { path: "exam-paper/validate", element: <ValidatePaper /> },
//         { path: "exam-paper/generate", element: <GeneratePaper /> },

//         /* ===== EXAM STATUS ===== */
//         { path: "exam-status", element: <ExamStatus /> },

//         /* ===== REPORTS ===== */
//         { path: "report/ata-performance", element: <AtaPerformance /> },
//         { path: "report/question-performance", element: <QuestionPerformance /> },
//         { path: "report/question-candidate", element: <QuestionCandidate /> },
//         { path: "report/activity-log", element: <ActivityLog /> },
//         { path: "report/result", element: <ResultReport /> },
//         { path: "report/question-modified", element: <QuestionModified /> },
//         { path: "report/question-id-list", element: <QuestionIdList /> },
//         { path: "report/validation", element: <ValidationReport /> },
//       ],
//     },
//     { path: "/login", element: <Login /> },
//   ]);


//   return (
//     <>
//       <AlertModal {...alert} onClose={hideAlert} />
//       <RouterProvider router={router} />
//     </>
//   )


// }

// export default App;














import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import ToasterProvider from "./components/ToasterProvider";
import Login from "./pages/Login";
import RoleManagement from "./pages/admin/RoleManagement";
import UserManagement from "./pages/admin/UserManagement";
import AircraftTypeMaster from "./pages/admin/AircraftTypeMaster";
import AtaMaster from "./pages/admin/AtaMaster";
import DosDontsMaster from "./pages/admin/DosDontsMaster";
import MachineMaster from "./pages/admin/MachineMaster";
import AddQuestion from "./pages/questionBank/AddQuestion";
import CheckQuestion from "./pages/questionBank/CheckQuestion";
import VerifyQuestion from "./pages/questionBank/VerifyQuestion";
import RegisterCandidate from "./pages/examPaper/RegisterCandidate";
import AtaGroups from "./pages/examPaper/AtaGroups";
import ValidatePaper from "./pages/examPaper/ValidatePaper";
import GeneratePaper from "./pages/examPaper/GeneratePaper";
import ExamStatus from "./pages/examStatus/ExamStatus";
import AtaPerformance from "./pages/reports/AtaPerformance";
import QuestionPerformance from "./pages/reports/QuestionPerformance";
import QuestionCandidate from "./pages/reports/QuestionCandidate";
import ActivityLog from "./components/transaction/ActivityLog";
import ResultReport from "./pages/reports/ResultReport";
import QuestionModified from "./pages/reports/QuestionModified";
import QuestionIdList from "./pages/reports/QuestionIdList";
import ValidationReport from "./pages/reports/ValidationReport";
import { BTNNavBar } from "./components/common/Nav";
import Dashboard from "./pages/dashboard/Dashboard";
import Error from "./pages/Error";
import { useMutation } from "@tanstack/react-query";
import { checkDeviceRegister } from "./api/ApiCollection";
import AlertModal from "./components/common/AlertModal/AlertModal";
import { useAlert } from "./hooks/useAlert";
import { useEffect, useMemo, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useDeviceFingerprint } from "./hooks/useDeviceFingerprint";
import ProtectedRoute from "./routes";
import { useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import { exitApp } from "./utils/tauri";

interface Payload {
  deviceFingerprint: string;
  deviceName: string;
  deviceMode: string;
}

function App() {
  const { deviceInfo } = useDeviceFingerprint();
  console.log(deviceInfo);

  const hasCheckedRef = useRef(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const payload: Payload | null = useMemo(() => {
    if (!deviceInfo?.fingerprint) return null;

    return {
      deviceFingerprint: deviceInfo.fingerprint,
      deviceName: deviceInfo.deviceName,
      deviceMode: "Admin",
    };
  }, [deviceInfo?.fingerprint]);

  const checkDeviceMutation = useMutation({
    mutationFn: (data: Payload) => checkDeviceRegister(data),
    onSuccess: (data: any) => {
      if (data) {
        if (data.errorMessage !== "Device Fingerprint Already Exists.") {
          showAlert({
            title: "Machine Activation Required",
            message: data.errorMessage,
            variant: "error",
            onClose: () => {
              hideAlert();
              exitApp();
            },
          });
        }
      }
    },
    onError: (err) => {
      console.log("error==>", err);
    },
  });

  useEffect(() => {
    invoke("get_device_info").then((d) =>
      console.log("deviceInfo===>", d)
    );

    if (!payload) return;
    if (hasCheckedRef.current) return;

    hasCheckedRef.current = true;
    checkDeviceMutation.mutate(payload);
  }, [payload]);

  /* ===== APP LAYOUT ===== */
  const Layout = () => (
    <div>
      <ToasterProvider />
      <ScrollRestoration />
      <div className="h-screen ">
        <BTNNavBar />
        <Outlet />
      </div>
    </div>
  );

  /* ===== ROUTER ===== */
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/app/dashboard" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },

    {
      path: "/login",
      element: isAuthenticated ? (
        <Navigate to="/app/dashboard" replace />
      ) : (
        <Login />
      ),
      errorElement: <Error />,
    },

    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        { path: "dashboard", element: <Dashboard /> },

        /* ===== ADMIN ===== */
        { path: "admin/role-management", element: <RoleManagement /> },
        { path: "admin/user-management", element: <UserManagement /> },
        { path: "admin/aircraft-type-master", element: <AircraftTypeMaster /> },
        { path: "admin/ata-master", element: <AtaMaster /> },
        { path: "admin/dos-donts-master", element: <DosDontsMaster /> },
        { path: "admin/machine-master", element: <MachineMaster /> },

        /* ===== QUESTION BANK ===== */
        { path: "question-bank/add", element: <AddQuestion /> },
        { path: "question-bank/check", element: <CheckQuestion /> },
        { path: "question-bank/verify", element: <VerifyQuestion /> },

        /* ===== EXAM PAPER ===== */
        { path: "exam-paper/ata-groups", element: <AtaGroups /> },
        { path: "exam-paper/register-candidate", element: <RegisterCandidate /> },
        { path: "exam-paper/validate", element: <ValidatePaper /> },
        { path: "exam-paper/generate", element: <GeneratePaper /> },

        /* ===== EXAM STATUS ===== */
        { path: "exam-status", element: <ExamStatus /> },

        /* ===== REPORTS ===== */
        { path: "report/ata-performance", element: <AtaPerformance /> },
        { path: "report/question-performance", element: <QuestionPerformance /> },
        { path: "report/question-candidate", element: <QuestionCandidate /> },
        { path: "report/activity-log", element: <ActivityLog /> },
        { path: "report/result", element: <ResultReport /> },
        { path: "report/question-modified", element: <QuestionModified /> },
        { path: "report/question-id-list", element: <QuestionIdList /> },
        { path: "report/validation", element: <ValidationReport /> },
      ],
    },
  ]);

  return (
    <>
      <AlertModal {...alert} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
