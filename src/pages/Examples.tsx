import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import StorageService from "../utils/StorageService";
import { TOKEN_KEY, VerseStyle } from "../utils/data";

interface Example {
  verseId: number;
  text_uthmani: string;
  hokm: string;
  verse_key: number;
}

export default function HomePage() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const [selectedHokm, setSelectedHokm] = useState("");

  const ahkam = [
    "الإدغام الناقص",
    "الإدغام الكامل",
    "الإخفاء الحقيقي",
    "الإظهار الحلقي",
    "الإقلاب",
  ];

  useEffect(() => {
    fetch(
      `https://irtaqi-api-gngp.onrender.com/api/v1/verse?hokm=${selectedHokm}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + StorageService.get(TOKEN_KEY),
        },
      }
    )
      .then((response) => response.json())
      .then((data: Example[]) => {
        console.log(data);
        setExamples(data);
      })
      .catch((error) => {
        console.error("Error fetching examples:", error);
      })
      .finally(() => setIsLoading(false));
  }, [selectedHokm]);

  const handleDelete = (exampleId: number): void => {
    setDeleting(true);
    fetch(`https://irtaqi-api-gngp.onrender.com/api/v1/verse/${exampleId}`, {
      headers: {
        Authorization: "Bearer " + StorageService.get(TOKEN_KEY),
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          toast.success("تم حذف المثال بنجاح");
          setExamples((prevExamples) =>
            prevExamples.filter((example) => example.verseId !== exampleId)
          );
        } else {
          toast.error("خطأ أثناء الحذف 1");
          return response.json();
        }
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        toast.error("خطأ أثناء الحذف ");
      })
      .finally(() => setDeleting(false));
  };

  const handleCreateExample = () => {
    // Redirect to the create example page
    navigate("create", { state: { ahkam } });
  };

  return (
    <div className="mb-8">
      <NavBar />
      <div className="min-h-screen">
        <div className="container flex flex-col min-h-[80vh] text-center">
          <button
            onClick={handleCreateExample}
            className="bg-blue-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:border-blue-300 mt-5"
          >
            إنشاء مثال
          </button>
          <select
            id="hokm"
            defaultValue={""}
            onChange={(e) => setSelectedHokm(e.target.value)}
            className="mt-1 text-right p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
          >
            <option value="">جميع الأحكام</option>

            {ahkam.map((hokm) => (
              <option key={hokm} value={hokm} className="text-lg">
                {hokm}
              </option>
            ))}
          </select>
          {!isLoading ? (
            <div className="my-8">
              {examples.length > 0 ? (
                examples.map((example) => (
                  <div
                    key={example.verseId}
                    className="mb-4 p-4 border border-gray-300 rounded-md"
                  >
                    <div className="w-full flex justify-center">
                      <p style={VerseStyle}>{example.text_uthmani}</p>
                    </div>
                    <p className="text-gray-500 mb-2">{example.hokm}</p>
                    <p className="text-gray-600">[ {example.verse_key} ]</p>
                    <button
                      disabled={deleting}
                      onClick={() => handleDelete(example.verseId)}
                      className="bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-red-300 mt-2"
                    >
                      حذف
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 font-bold text-lg mt-5">
                  لم يتم إدراج أي أمثلة إلى الأن
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 font-bold text-lg mt-5">
              تحميل الأمثلة
            </p>
          )}
          <button
            onClick={handleCreateExample}
            className="bg-blue-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:border-blue-300 mt-5"
          >
            إنشاء مثال
          </button>
        </div>
      </div>
    </div>
  );
}
