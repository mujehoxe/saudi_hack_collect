import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import StorageService from "../utils/StorageService";
import { TOKEN_KEY, VerseStyle } from "../utils/data";

export default function CreateExample() {
  const [submitting, setSubmitting] = useState(false);
  const [currentVerse, setCurrentVerse] = useState("");
  const [currentExample, setCurrentExample] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [verseNumber, setVerseNumber] = useState("");

  const { state } = useLocation();
  const { ahkam } = state;

  const form: HTMLFormElement | null = document.getElementById(
    "form"
  ) as HTMLFormElement;

  useEffect(() => {
    onGetVerse();
  }, [chapterNumber, verseNumber]);

  useEffect(() => {}, [currentExample]);

  // @ts-expect-error no typing needed
  async function handleSubmit(e) {
    setSubmitting(true);
    e.preventDefault();

    const formData = {
      text_uthmani: e.target.elements.phrase.value,
      hokm: e.target.elements.hokm.value,
      verse_key:
        parseInt(e.target.elements.chapter.value) +
        ":" +
        parseInt(e.target.elements.verse.value),
    };

    try {
      const response = await fetch(
        "https://irtqai-api.onrender.com/api/v1/verse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + StorageService.get(TOKEN_KEY),
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        form?.reset();
        setCurrentExample("");
        setCurrentVerse("");
        toast.success("تم تسجيل المثال بنجاح");
      } else {
        toast.success("خطأ اثناء رفع البيانات");
      }
    } catch (error) {
      toast.success("خطأ أثناء الإرسال");
    }
    setSubmitting(false);
  }

  async function onGetVerse() {
    if (chapterNumber === "" || verseNumber === "") return;
    const url = `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${chapterNumber}:${verseNumber}`;

    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.ok) {
        const data = await response.json();
        if (data.verses[0]) setCurrentVerse(data.verses[0].text_uthmani);
      } else {
        toast.error("لم يتم العثور على الآية");

        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      toast.error("خطأ اثناء محاولة إيجاد الآية");
    }
  }

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/examples");
  };

  return (
    <div className="mb-4">
      <NavBar />
      <div className="flex justify-center">
        <button
          onClick={handleBack}
          className="bg-gray-400 w-56 mb-8 text-white font-semibold mt-2 py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          الرجوع
        </button>
      </div>
      <div className="min-h-screen font-medium text-right container flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold mb-6">إنشاء مثال</h1>
        <form
          id="form"
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-y-4"
        >
          {/* Chapter */}
          <div>
            <label
              htmlFor="chapter"
              className="block text-lg font-medium text-gray-700"
            >
              السورة
            </label>
            <input
              onBlur={(e) => setChapterNumber(e.target.value)}
              name="chapter"
              id="chapter"
              type="number"
              min={1}
              max={114}
              step={1}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            />
          </div>
          {/* Verse */}
          <div>
            <label
              htmlFor="verse"
              className="block text-lg font-medium text-gray-700"
            >
              آية
            </label>
            <input
              onBlur={(e) => setVerseNumber(e.target.value)}
              name="verse"
              id="verse"
              type="number"
              min={1}
              max={300}
              step={1}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            />
          </div>
          {/* Preview */}
          <div className={currentVerse === "" ? "opacity-0" : "opacity-100"}>
            <label className="block text-lg font-medium text-gray-700">
              معاينة الآية
            </label>
            <p style={VerseStyle}>{currentVerse}</p>
          </div>
          <div>
            <label
              htmlFor="phrase"
              className="block text-lg font-medium text-gray-700"
            >
              جملة المثال
            </label>
            <input
              name="phrase"
              id="phrase"
              type="text"
              onChange={(e) => setCurrentExample(e.target.value)}
              required={true}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            />
          </div>
          <div className={currentExample === "" ? "opacity-0" : "opacity-100"}>
            <label className="block text-lgfont-medium text-gray-700">
              معاينة المثال
            </label>
            <p className="text-right" style={VerseStyle}>
              {currentExample}
            </p>
          </div>
          <div>
            <label
              htmlFor="hokm"
              className="block text-lg font-medium text-gray-700"
            >
              الحكم
            </label>
            <select
              name="hokm"
              id="hokm"
              defaultValue={""}
              required={true}
              className="mt-1 text-right p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            >
              <option value="">الرجاء الإختيار</option>
              {
                // @ts-expect-error no typing needed
                ahkam.map((hokm) => (
                  <option key={hokm} value={hokm} className="text-lg">
                    {hokm}
                  </option>
                ))
              }
            </select>
          </div>

          <button
            disabled={submitting}
            type="submit"
            className="bg-blue-500 text-white font-semibold mt-2 py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
}
