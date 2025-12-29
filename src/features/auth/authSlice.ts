import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LoginApiResponse, User } from "./authTypes";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  tokenExpiry: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginApiResponse>) => {
      const payload = action.payload;

      state.isAuthenticated = true;
      state.user = {
        id: payload.userId,
        name: payload.userName,
        role: payload.roleName,
        permissions: payload.userPermission,
        updatePassword: payload.updatePassword,
      };
      state.token = payload.token;
      state.tokenExpiry = payload.tokenExpiry;
    },

    // Local logout (auth slice only)
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
    },

    // 🔥 GLOBAL RESET TRIGGER
    resetAuth: () => initialState,
  },
});

export const { loginSuccess, logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;
