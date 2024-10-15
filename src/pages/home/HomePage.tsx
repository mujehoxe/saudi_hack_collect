import NavBar from "../../components/NavBar";
import { VerseStyle } from "../../utils/data";
import RecordComponent from "../../components/RecordComponent";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchVerses } from "../../redux/record/record.thunk";
import { selectCurrentVerse } from "../../redux/record/record.slice";
import { useSelector } from "react-redux";
import ChangeVerse from "../../components/ChangeVerse";
import { LoaderIcon } from "react-hot-toast";
import DisplayRecordings from "../../components/DisplayRecordings";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentVerse = useSelector(selectCurrentVerse);
  const recordings = useSelector(
    (root: RootState) => root.record.currentVerseRecords
  );

  useEffect(() => {
    const handlfetchVerses = async () => {
      dispatch(fetchVerses());
    };

    handlfetchVerses();
  }, [dispatch]);

  return (
    <div dir="rtl" className="text-right text-base font-medium">
      <NavBar />
      <div className="flex flex-col justify-center md:min-h-[80vh] text-center">
        {currentVerse ? (
          <div className="flex flex-col items-center">
            <div className="md:min-h-[30vh] flex flex-col gap-4 justify-start">
              <p className="text-2xl" style={{ fontFamily: "Quran_font" }}>
                رواية حفص عن عاصم
              </p>
              <p>الحكم: {currentVerse?.hokm}</p>
              <p style={VerseStyle}>{currentVerse?.text_uthmani}</p>
              <p className="text-gray-500 font-bold text-lg mt-5 ">
                [{currentVerse?.verse_key}]
              </p>
            </div>
            <div className="flex flex-col w-full text-lg items-center justify-center mt-10 space-y-5">
              <RecordComponent verseId={currentVerse.verseId} />
              <p>لا تقل مدة التسجيل عن ثانية ولا تزيد عن 15 ثانية</p>
              {recordings.length === 0 ? (
                <ChangeVerse />
              ) : (
                <DisplayRecordings recordings={recordings} />
              )}
            </div>
          </div>
        ) : (
          <div className="w-fit flex justify-center items-center space-x-3 mx-auto">
            <LoaderIcon style={{ width: 20, height: 20, borderWidth: 3 }} />
            <p className="text-gray-500 font-bold text-lg md:text-2xl">
              تحميل الأمثلة
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
