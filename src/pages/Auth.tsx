import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StorageService from "../utils/StorageService";
import { TOKEN_KEY } from "../utils/data";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: "auth-code",
    scope: "email",
  });

  function onSuccess(data: CredentialResponse) {
    const payload = decodeJwt(data.credential ?? "");
    sendEmailToBackend(payload.email, (result) => {
      const res = JSON.parse(result);
      if (res.redirect !== undefined) {
        navigate(res.redirect, { state: { email: payload.email } });
      } else if (res.token !== undefined) {
        StorageService.set(TOKEN_KEY, res.token.accessToken);
        StorageService.set("user", JSON.stringify(res.user));
        document.location.href = "/";
      }
    });
  }

  function decodeJwt(credential: string) {
    const base64Url = credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function sendEmailToBackend(email: string, cb: (result: string) => void) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const promise = fetch(
      "https://irtaqi-api-gngp.onrender.com/api/v1api/v1/auth",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          email,
        }),
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .then((result) => cb(result))
      .catch((error) => {
        console.log("error", error);
      });

    toast.promise(promise, {
      loading: "تحميل",
      success: "تم تسجيل الدخول بنجاج",
      error: "خطأ اثناء تسجيل الدخول",
    });
  }

  return (
    <div className="min-h-screen text-right flex items-center justify-center">
      <div className="text-center flex flex-col gap-4 items-center">
        <p className="text-xl">مرحبا بك إلى منصتنا لجمع بيانات أحكام التلاوة</p>
        <h2 className="text-3xl font-bold mb-4">
          Google تسجيل الدخول بإستعمال
        </h2>
        <div onClick={login}>
          <GoogleLogin onSuccess={onSuccess} onError={console.log} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
