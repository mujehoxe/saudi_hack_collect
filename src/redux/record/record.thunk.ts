import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios.config";
import { TOKEN_KEY } from "../../utils/data";
import StorageService from "../../utils/StorageService";
import { IRecord } from "../../utils/types";

export const fetchVerses = createAsyncThunk(
  "record/fetchVerses",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axiosInstance.get(`/verse/randoms`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitVerseRecord = createAsyncThunk(
  "record/submitVerseRecord",
  async (payload: IRecord[], thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      for (const record of payload) {
        const formData = new FormData();
        if (record.file) {
          formData.append("file", record.file, "audio.webm");
          formData.append("verseId", record.verseId);
          formData.append("validity", record.reading_state ?? "");
          formData.append("TOrder", record.TOrder ?? "مجهول");
        }

        fetch("https://irtaqi-api-gngp.onrender.com/api/v1/verse-audio", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + StorageService.get(TOKEN_KEY),
          },
        })
          .then((res: Response) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
          })
          .catch((err) => {
            throw new Error("Network response was not ok");
          });

        // const data = await response.json();
        // return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
