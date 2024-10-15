export interface ILoginFormInput {
  email: string;
  password: string;
}

export interface ILoginInput {
  name: keyof ILoginFormInput;
  placeholder: string;
  type: string;
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface IUser {
  _id: string;
  email: string;
}

export interface ISideBarItem {
  title: string;
  link: string;
  image: string;
}

export interface IVerse {
  hokm: string;
  nbrMoves: unknown;
  text_uthmani: string;
  verseId: string;
  verse_key: string;
}

export interface IRecord {
  id: string;
  file: Blob;
  verseId: string;
  TOrder?: string;
  reading_state: string;
}
