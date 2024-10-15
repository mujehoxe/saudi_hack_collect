import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRecord, IVerse } from "../../utils/types";
import toast from "react-hot-toast";
import { fetchVerses, submitVerseRecord } from "./record.thunk";
import { RootState } from "../store";

interface versesState {
  loading: boolean;
  verses: IVerse[];
  currentVerseIdx?: number;
  currentVerse?: IVerse;
  currentVerseRecords: IRecord[];
  error: unknown;
  isRecording: boolean;
  isSubmitting: boolean;
}

const initialState: versesState = {
  loading: false, // ** Pending
  verses: [], // ** Success => fulfilled
  currentVerseIdx: undefined,
  currentVerse: undefined,
  currentVerseRecords: [],
  error: undefined, // ** Error => rejected
  isRecording: false,
  isSubmitting: false,
};

const versesSlice = createSlice({
  name: "verses",
  initialState,
  reducers: {
    goNextVerse: (state) => {
      if (state.isRecording) return;
      if (
        state.currentVerseIdx != undefined &&
        state.currentVerseIdx < state.verses.length - 1
      ) {
        state.currentVerseIdx += 1;
        state.currentVerse = state.verses[state.currentVerseIdx];
        state.currentVerseRecords = [];
      }
    },
    startRecording: (state) => {
      state.isRecording = true;
    },
    stopRecording: (state) => {
      state.isRecording = false;
    },
    addRecording: (state, action: PayloadAction<IRecord>) => {
      state.currentVerseRecords = [
        action.payload,
        ...state.currentVerseRecords,
      ];
    },
    updateRecordingParams: (state, action: PayloadAction<IRecord>) => {
      state.currentVerseRecords = state.currentVerseRecords.map((record) => {
        if (record.id === action.payload.id) {
          return action.payload;
        } else {
          return record;
        }
      });
    },
    deleteRecording: (state, action: PayloadAction<IRecord>) => {
      state.currentVerseRecords = state.currentVerseRecords.filter(
        (record) => record.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    // fetchverses
    builder
      .addCase(fetchVerses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchVerses.fulfilled,
        (state, action: PayloadAction<IVerse[]>) => {
          state.loading = false;
          state.verses = [...state.verses, ...action.payload];
          if (state.currentVerseIdx == undefined) {
            state.currentVerseIdx = 0;
            state.currentVerse = state.verses[state.currentVerseIdx];
          }
          state.error = null;
        }
      )
      .addCase(fetchVerses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("خطأ اثناء تحميل المثال");
      });

    // submitVerseRecord
    builder
      .addCase(submitVerseRecord.pending, (state) => {
        state.isSubmitting = true;
        toast.loading("يتم رفع التسجيلات الصوتية");
      })
      .addCase(submitVerseRecord.fulfilled, (state) => {
        state.isSubmitting = false;
        state.currentVerseRecords = [];
        toast.success("تم رفع التسجيلات بنجاح");
      })
      .addCase(submitVerseRecord.rejected, (state, action) => {
        state.isSubmitting = false;
        toast.error(" خطأ أثناء رفع التسجيلات " + action.payload);
      });
  },
});

export const {
  goNextVerse,
  startRecording,
  stopRecording,
  addRecording,
  updateRecordingParams,
  deleteRecording,
} = versesSlice.actions;

export default versesSlice.reducer;
export const selectCurrentVerse = (state: RootState) =>
  state.record.currentVerse;
