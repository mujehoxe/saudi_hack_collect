import { useSelector } from "react-redux";
import { IRecord } from "../utils/types";
import RecordingRow from "./RecordingRow";
import { RootState, useAppDispatch } from "../redux/store";
import { submitVerseRecord } from "../redux/record/record.thunk";
import toast from "react-hot-toast";

interface IProps {
  recordings: IRecord[];
}

const DisplayRecordings = ({ recordings }: IProps) => {
  const { isSubmitting } = useSelector((state: RootState) => state.record);
  const dispatch = useAppDispatch();

  const handleSubmitRecordings = () => {
    for (const record of recordings) {
      if (!record.reading_state) {
        toast.error("يجب عليك اختيار صحة القراءة لكل تسجيل");
        return;
      }
    }
    dispatch(submitVerseRecord(recordings));
  };

  if (recordings.length === 0) return null;

  return (
    <div className="max-w-screen-lg mx-auto px-4 mt-5 w-full min-w-[800px]">
      <h2 className="text-2xl font-bold mb-3">جدول التسجيلات</h2>
      <table className="text-right w-full border rounded overflow-hidden">
        <thead className="bg-gray-800 text-right text-white">
          <tr>
            {/* <th className="py-2 px-4">تسجيل رقم</th> */}
            <th className="py-2 px-4">التسجيل</th>
            <th className="py-2 px-4">مرتبة التلاوة</th>
            <th className="py-2 px-4">صحة القراءة</th>
            <th className="py-2 px-4"></th>
            {/* Add more headers based on your ISubmitRecord type */}
          </tr>
        </thead>
        <tbody>
          {recordings.map((recording) => (
            <RecordingRow key={recording.id} recording={recording} />
          ))}
        </tbody>
        <tfoot className="bg-gray-800 text-center text-white">
          <tr>
            <td colSpan={4}>يمكنك إرسال عدة تسجيلات</td>
          </tr>
        </tfoot>
      </table>
      <button
        disabled={isSubmitting}
        onClick={handleSubmitRecordings}
        type="submit"
        className="my-10 bg-primary text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-green-500"
      >
        إرسال التسجيلات
      </button>
    </div>
  );
};
export default DisplayRecordings;
