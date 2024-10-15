import { ChangeEvent } from "react";
import {
  deleteRecording,
  updateRecordingParams,
} from "../redux/record/record.slice";
import { useAppDispatch } from "../redux/store";
import { TILAWA_ORDER } from "../utils/data";
import { IRecord } from "../utils/types";

interface IProps {
  recording: IRecord;
}
const RecordingRow = ({ recording }: IProps) => {
  const dispatch = useAppDispatch();

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateRecordingParams({ ...recording, reading_state: e.target.value })
    );
  };

  const handleDeleteRecording = (recording: IRecord) => {
    dispatch(deleteRecording(recording));
  };

  return (
    <tr key={recording.id} className="even:bg-slate-300 odd:bg-slate-100">
      <td
        className="py-2 max-w-[300px]"
        style={{
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <audio className="ml-auto mx-2 " controls>
          <source src={URL.createObjectURL(recording.file)} type="audio/wav" />
          المتصفح الخاص بك لا يدعم عنصر الصوت.
        </audio>
      </td>

      <td>
        <select
          name="TOrder"
          id="TOrder"
          defaultValue={"مجهول"}
          required={true}
          className="py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => {
            dispatch(
              updateRecordingParams({ ...recording, TOrder: e.target.value })
            );
          }}
        >
          <option value="مجهول">مجهول</option>
          {TILAWA_ORDER.map((ordre) => (
            <option key={ordre} value={ordre} className="text-lg">
              {ordre}
            </option>
          ))}
        </select>
      </td>

      <td
        dir="rtl"
        className="flex flex-col justify-center my-auto h-20 align-middle"
      >
        <div>
          <input
            type="radio"
            id={"reading1" + recording.id}
            name={"reading" + recording.id}
            value="true_reading"
            className="me-2"
            required={true}
            onChange={handleRadioChange}
          />
          <label htmlFor={"reading1" + recording.id}>قراءة صحيحة</label>
        </div>
        <div>
          <input
            type="radio"
            id={"reading2" + recording.id}
            name={"reading" + recording.id}
            value="common_mistake"
            className="me-2"
            required={true}
            onChange={handleRadioChange}
          />
          <label htmlFor={"reading2" + recording.id}>خطا شائع</label>
        </div>
      </td>

      <td>
        <button
          type="button"
          className=" bg-red-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-green-500"
          onClick={() => handleDeleteRecording(recording)}
        >
          حذف
        </button>
      </td>
    </tr>
  );
};
export default RecordingRow;
