import { createSlice } from "@reduxjs/toolkit";
import StorageService from "../../utils/StorageService";
import { toast } from "react-hot-toast";
import { TOKEN_KEY } from "../../utils/data";
import { userLogin } from "./auth.thunk";

interface UserState {
  loading: boolean;
  token: unknown;
  error: unknown;
}

const initialState: UserState = {
  loading: false, // ** Pending
  token: null, // ** Success => fulfilled
  error: null, // ** Error => rejected
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      StorageService.remove(TOKEN_KEY);
      toast.success("Logging out");

      setTimeout(() => {
        document.location.href = "/admin/";
      }, 2000);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.error = null;
      StorageService.set(TOKEN_KEY, action.payload.token);
      toast.success("Logged in successfully");

      setTimeout(() => {
        document.location.href = "/admin/dashboard";
      }, 2000);
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
      console.log(action.payload);
      toast.error("Make sure you have the correct Email or Password");
    });
  },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
