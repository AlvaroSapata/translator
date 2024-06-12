import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./hooks/constants";

// Define the type of Language fron our constants file
export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

// Define the type of State
export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}
// Define the type of Action
export type Action =
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

  export enum SectionType {
    From = "from",
    To = "to",
  }