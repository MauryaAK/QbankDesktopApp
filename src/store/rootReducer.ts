// import { combineReducers, AnyAction } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import authReducer from "../features/auth/authSlice";
// import { authPersistConfig } from "./persistConfig";

// const appReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
// });

// // 🔥 Root reset (clears ALL redux state)
// const rootReducer = (
//   state: ReturnType<typeof appReducer> | undefined,
//   action: AnyAction
// ) => {
//   if (action.type === "auth/resetAuth") {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

// export type RootState = ReturnType<typeof appReducer>;
// export default rootReducer;
import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "APP/RESET") {
    state = undefined; // 🔥 clean re-init
  }

  return appReducer(state, action);
};
export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
