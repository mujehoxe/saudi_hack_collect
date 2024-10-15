import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import StorageService from "../utils/StorageService";
import { TOKEN_KEY } from "../utils/data";

export default function RegisterUser() {
  const { state } = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // @ts-expect-error no typing needed
  async function handleSubmit(e) {
    setSubmitting(true);
    e.preventDefault();

    const formData = {
      age: parseInt(e.target.elements.age.value),
      sex: e.target.elements.gender.value,
      email: state.email,
    };

    try {
      const response = await fetch(
        "https://irtqai-api.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.token) {
          StorageService.set(TOKEN_KEY, data.token.accessToken);
          StorageService.set("user", JSON.stringify(data.user));
          document.location.href = "/";
        }
      } else {
        toast.error("لم نتمكن من إرسال المعلومات");
        console.error("Error submitting form data");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
    setSubmitting(true);
  }

  return (
    <div className="w-full">
      <div
        dir="rtl"
        className="min-h-screen text-right container flex flex-col justify-center"
      >
        <p className="text-xl mb-6">
          مرحبا
          <br />
          <span className="font-semibold">{state.email}</span>
          <br />
          نود أن نعرب عن تقديرنا لمساهمتك في المشروع.
        </p>
        <h1 className="text-4xl font-semibold mb-6">
          نحتاج منك تقديم المعلومات التالية
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-y-4"
        >
          <div>
            <label
              htmlFor="age"
              className="block text-lg font-medium text-gray-700"
            >
              العمر
            </label>
            <input
              name="age"
              id="age"
              type="number"
              min={3}
              max={100}
              step={1}
              required={true}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="phrase"
              className="block text-lg font-medium text-gray-700"
            >
              الجنس
            </label>
            <select
              name="gender"
              id="gender"
              defaultValue={""}
              required={true}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 w-full"
            >
              <option value="">الرجاء الأختيار</option>
              <option className="text-base">ذكر</option>
              <option className="text-base">أنثى</option>
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
