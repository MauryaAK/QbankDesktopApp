import storage from "redux-persist/lib/storage"; // localStorage

export const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated", "token", "user"], // ONLY persist auth data
};
