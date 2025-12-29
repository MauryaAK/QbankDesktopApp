// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { ActionButton } from "../components/common/Buttons";
// import loginBg from "../assets/loginBg.png";
// import { useFingerprint } from "../hooks/useDeviceFingerprint";
// import { useQuery } from "@tanstack/react-query";
// import { getUserDetails } from "../api/ApiCollection";

// const Login = () => {
//   const navigate = useNavigate();
//   const fingerPrint = useFingerprint();


//   const [loginId, setLoginId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);




//   const payload = React.useMemo(() => {
//     if (!fingerPrint?.fingerprint) return null;
//     return {
//       loginId: loginId,
//       password: password,
//       deviceFingerprint: fingerPrint.fingerprint,
//       isOverride: false,
//     };
//   }, [fingerPrint?.fingerprint, password, loginId]);

//   const login = useQuery({
//     queryKey: ["totalusers", payload],
//     queryFn: getUserDetails,
//     enabled: !!payload, // now this is meaningful
//   });

//   const [errors, setErrors] = useState<{
//     loginId?: string;
//     password?: string;
//   }>({});

//   const [touched, setTouched] = useState({
//     loginId: false,
//     password: false,
//   });

//   const deviceInfo = {
//     userAgent: navigator.userAgent,
//     platform: navigator.platform,
//     language: navigator.language,
//     cores: navigator.hardwareConcurrency,
//     memory: (navigator as any).deviceMemory,
//   };
//   const validate = () => {
//     const newErrors: typeof errors = {};

//     if (!loginId.trim()) {
//       newErrors.loginId = "Login ID is required";
//     } else if (loginId.trim().length < 3) {
//       newErrors.loginId = "Login ID must be at least 3 characters";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = () => {
//     setTouched({ loginId: true, password: true });
//     if (!validate()) return;

//     navigate("/dashboard");
//   };

//   const clearError = (field: "loginId" | "password") => {
//     setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   return (
//     <div className="min-h-screen bg-[#F3EADA] flex items-center justify-center px-6">
//       <div
//         className="
//           relative
//           w-full
//           max-w-[1400px]
//           min-h-[720px]
//           overflow-hidden
//           flex
//         "
//         style={{
//           backgroundImage: `url(${loginBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="flex-1 hidden lg:flex mt-52 ml-28 px-24">
//           <h1 className="text-3xl font-semibold text-black leading-tight">
//             Welcome to Q.Bank <br />
//             Designer Application
//           </h1>
//         </div>

//         <div className="w-full lg:w-[350px] flex mt-32 justify-center mr-48 bg-transparent">
//           <div className="w-full max-w-md p-8">
//             <h2 className="text-2xl font-semibold text-black mb-6">
//               Login
//             </h2>

//             <div className="flex flex-col gap-5">
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Login ID
//                 </label>
//                 <input
//                   type="text"
//                   value={loginId}
//                   onChange={(e) => setLoginId(e.target.value)}
//                   onFocus={() => clearError("loginId")}
//                   onBlur={() =>
//                     setTouched((p) => ({ ...p, loginId: true }))
//                   }
//                   placeholder="Enter your Login ID here"
//                   className="
//                     h-11
//                     px-4
//                     rounded-lg
//                     bg-[#FFF6E5]
//                     text-sm
//                     focus:outline-none
//                     focus:ring-2
//                     focus:ring-red-400/40
//                   "
//                 />
//                 {touched.loginId && errors.loginId && (
//                   <span className="text-xs text-red-600">
//                     {errors.loginId}
//                   </span>
//                 )}
//               </div>

//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => clearError("password")}
//                   onBlur={() =>
//                     setTouched((p) => ({ ...p, password: true }))
//                   }
//                   placeholder="Enter your Password here"
//                   className="
//                     h-11
//                     px-4
//                     rounded-lg
//                     bg-[#FFF6E5]
//                     text-sm
//                     focus:outline-none
//                     focus:ring-2
//                     focus:ring-red-400/40
//                   "
//                 />
//                 {touched.password && errors.password && (
//                   <span className="text-xs text-red-600">
//                     {errors.password}
//                   </span>
//                 )}
//               </div>

//               <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={showPassword}
//                   onChange={() => setShowPassword((p) => !p)}
//                 />
//                 Show Password
//               </label>

//               <ActionButton
//                 label="Login"
//                 variant="primary"
//                 className="w-full mt-2"
//                 onClick={handleLogin}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 absolute bottom-0  hidden lg:flex">
//           <h1 className="text-sm font-semibold text-black leading-tight">
//             Version 1.0.0 (DEV)-03-12-2024<br />
//             {deviceInfo.platform}
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;















import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ActionButton } from "../components/common/Buttons";
import loginBg from "../assets/loginBg.png";
import { getUserDetails } from "../api/ApiCollection";
import AlertModal from "../components/common/AlertModal/AlertModal";
import { useAlert } from "../hooks/useAlert";
import { LoginResultCode, verifyLoginResult } from "../services/auth";
import { createLoginResultHandlers } from "../services/auth/loginResult.handlers";
import { useDeviceFingerprint } from "../hooks/useDeviceFingerprint";
import { useAppDispatch } from "../hooks/reduxHooks";

/* ================= TYPES ================= */

interface LoginPayload {
  loginId: string;
  password: string;
  deviceFingerprint: string;
  isOverride: boolean;
}

interface FormErrors {
  loginId?: string;
  password?: string;
}

/* ================= COMPONENT ================= */

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deviceInfo } = useDeviceFingerprint();
  const { alert, showAlert, hideAlert } = useAlert();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    loginId: false,
    password: false,
  });

  /* ================= DEVICE INFO ================= */


  /* ================= PAYLOAD ================= */

  const payload: LoginPayload | null = useMemo(() => {
    if (!deviceInfo?.fingerprint) return null;

    return {
      loginId,
      password,
      deviceFingerprint: deviceInfo.fingerprint,
      isOverride: false,
    };
  }, [loginId, password, deviceInfo?.fingerprint]);

  /* ================= VALIDATION ================= */

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginId.trim()) {
      newErrors.loginId = "Login ID is required";
    } else if (loginId.trim().length < 2) {
      newErrors.loginId = "Login ID must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= LOGIN MUTATION ================= */

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => getUserDetails(data),
    onSuccess: (apiRes) => {
      const result = verifyLoginResult(apiRes);
      const handlers = createLoginResultHandlers(
        dispatch,
        navigate,
        showAlert,
        hideAlert,
        apiRes
      );
      handlers[result.code]?.(result);
    },
    onError: (e) => {
      console.log("error", e);

    },
  });

  /* ================= HANDLERS ================= */

  const handleLogin = () => {
    setTouched({ loginId: true, password: true });
    if (!validate()) return;
    if (!payload) return;
    loginMutation.mutate(payload);
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F3EADA] flex items-center justify-center px-6">
      <AlertModal {...alert} onClose={hideAlert} />
      <div
        className="
          relative
          w-full
          max-w-[1400px]
          min-h-[720px]
          overflow-hidden
          flex
        "
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1 hidden lg:flex mt-52 ml-28 px-24">
          <h1 className="text-3xl font-semibold text-black leading-tight">
            Welcome to Q.Bank <br />
            Designer Application
          </h1>
        </div>

        <div className="w-full lg:w-[350px] flex mt-32 justify-center mr-48 bg-transparent">
          <div className="w-full max-w-md p-8">
            <h2 className="text-2xl font-semibold text-black mb-6">
              Login
            </h2>

            <div className="flex flex-col gap-5">
              {/* ===== LOGIN ID ===== */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Login ID
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  onFocus={() => clearError("loginId")}
                  onBlur={() =>
                    setTouched((p) => ({ ...p, loginId: true }))
                  }
                  placeholder="Enter your Login ID here"
                  className="
                    h-11
                    px-4
                    rounded-lg
                    bg-[#FFF6E5]
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-400/40
                  "
                />
                {touched.loginId && errors.loginId && (
                  <span className="text-xs text-red-600">
                    {errors.loginId}
                  </span>
                )}
              </div>

              {/* ===== PASSWORD ===== */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => clearError("password")}
                  onBlur={() =>
                    setTouched((p) => ({ ...p, password: true }))
                  }
                  placeholder="Enter your Password here"
                  className="
                    h-11
                    px-4
                    rounded-lg
                    bg-[#FFF6E5]
                    text-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-400/40
                  "
                />
                {touched.password && errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* ===== SHOW PASSWORD ===== */}
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((p) => !p)}
                />
                Show Password
              </label>

              {/* ===== LOGIN BUTTON ===== */}
              <ActionButton
                label={loginMutation.isPending ? "Logging in..." : "Login"}
                variant="primary"
                className="w-full mt-2"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 absolute bottom-0 hidden lg:flex">
          <h1 className="text-sm font-semibold text-black leading-tight">
            Version 1.0.0 (DEV)-03-12-2024
            <br />
            {deviceInfo?.deviceName || ""}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
