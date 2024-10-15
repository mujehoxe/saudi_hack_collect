import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.config";
import { ILoginFormInput } from "../../utils/types";

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: ILoginFormInput, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axiosInstance.post(`/auth/login`, user);
      return data;
    } catch (error) {
      console.log(error, "thunk");
      return rejectWithValue(error);
    }
  }
);
