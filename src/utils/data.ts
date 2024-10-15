import { ILoginInput, ISideBarItem, IVerse } from "./types";

export const TOKEN_KEY = "token";
// export const BASE_URL = "http://localhost:5000/";
// export const BASE_URL = "http://192.168.232.181:5000/";
export const BASE_URL = "https://irtqai-api.onrender.com/api/v1/";

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email address",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const date = new Date();
const IN_DAYS = 5;
const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
date.setTime(date.getTime() + EXPIRES_IN_DAYS);
export const TOKEN_EXPIRE_IN = date;

export const ADMIN_SIDEBAR_LINKS: ISideBarItem[] = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    image: "/assets/applicants_icon.svg",
  },
];

export const DUMMY_DATA: IVerse[] = [
  {
    hokm: "Idgham Naqis",
    nbrMoves: null,
    text_uthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    verseId: "547bc11f-e76c-4634-b2ff-96a3a58277b2",
    verse_key: "1:1",
  },
  {
    hokm: "Idgham Naqis",
    nbrMoves: null,
    text_uthmani: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنمِ",
    verseId: "547bc11f-e76c-4634-b2ff-96a3a58277b2",
    verse_key: "1:1",
  },
  {
    hokm: "Idgham Naqis",
    nbrMoves: null,
    text_uthmani: "بِسْمِ ٱللَّهِ ٱلرَّحِيمِ",
    verseId: "547bc11f-e76c-4634-b2ff-96a3a58277b2",
    verse_key: "1:1",
  },
];

export const VerseStyle: React.CSSProperties = {
  fontFamily: "Quran_font",
  fontSize: "30px",
  maxWidth: "500px",
  lineHeight: 1.9,
  textAlign: "center",
};

export const TILAWA_ORDER = ["التحقيق", "الترتيل", "التدوير", "الحدر"];
