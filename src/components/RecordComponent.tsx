import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import toast from "react-hot-toast";
import { cn } from "../utils/helpers";
import {
  addRecording,
  startRecording,
  stopRecording,
} from "../redux/record/record.slice";
import { v4 as uuid } from "uuid";

interface RecordComponentProps {
  verseId: string;
}

const RecordComponent: React.FC<RecordComponentProps> = ({ verseId }) => {
  const recorderControls = useAudioRecorder({});
  const dispatch = useAppDispatch();

  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    if (recorderControls.recordingTime > 0) {
      setRecordingTime(recorderControls.recordingTime);
    }
  }, [recorderControls.recordingTime]);

  useEffect(() => {
    if (recorderControls.isRecording) {
      dispatch(startRecording());
    } else {
      dispatch(stopRecording());
    }
  }, [recorderControls.isRecording, dispatch]);

  const handleRecordComplete = (blob: Blob) => {
    if (recordingTime < 1 || recordingTime > 15) {
      toast.error("التسجيل الصوتي بين ثانية وعشرة ثواني");
    } else {
      // toast.success("تم تسجيل الصوت بنجاح");
      dispatch(
        addRecording({
          id: uuid(),
          file: blob,
          reading_state: "",
          verseId,
        })
      );
    }
    setRecordingTime(0);
  };

  return (
    <span
      className={cn(
        "flex items-center justify-center min-w-16 min-h-16 space-x-2 cursor-pointer bg-primary p-2 rounded-full overflow-hidden duration-100",
        recorderControls.isRecording && "rounded-2xl"
      )}
    >
      <AudioRecorder
        recorderControls={recorderControls}
        classes={{
          AudioRecorderClass: "",
          AudioRecorderStartSaveClass: "inline-bloc",
        }}
        onRecordingComplete={handleRecordComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
        onNotAllowedOrFound={(ex) => {
          toast.error("يرجى السماح للميكروفون بالبدء في التسجيل");
          console.log("not allowed", ex);
        }}
        mediaRecorderOptions={{
          mimeType: "audio/webp",
        }}
      />
    </span>
  );
};
export default RecordComponent;
