import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

/* ================= PERSIST CONFIG ================= */

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth
};

/* ================= WRAP ROOT REDUCER ================= */

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ================= STORE ================= */

export const store = configureStore({
  reducer: persistedReducer, // 🔥 THIS WAS MISSING
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
