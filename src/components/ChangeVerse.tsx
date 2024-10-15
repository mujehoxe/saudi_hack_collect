import { useSelector } from "react-redux";
import { goNextVerse } from "../redux/record/record.slice";
import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchVerses } from "../redux/record/record.thunk";

const ChangeVerse = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.record);

  // fetch when reach the end of the verses
  useEffect(() => {
    if (state.currentVerseIdx === state.verses.length - 2) {
      dispatch(fetchVerses());
    }
  }, [state.currentVerseIdx, state.verses.length, dispatch]);

  return (
    <div className="flex space-x-5 text-gray-500 text-lg">
      <button
        className="border-2 border-primary rounded-xl px-3 py-1 disabled:text-gray-400 disabled:border-gray-300"
        disabled={state.currentVerseIdx === state.verses.length - 1}
        onClick={() => {
          dispatch(goNextVerse());
        }}
      >
        المثال التالي
      </button>
    </div>
  );
};
export default ChangeVerse;
