import { Form } from "react-bootstrap";
import { SUPPORTED_LANGUAGES } from "../hooks/constants";
import { type FromLanguage, type Language } from "../types";

type Props =
  | {
      type: "from";
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: "to"; value: Language; onChange: (language: Language) => void };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select aria-label="Language selector" onChange={handleChange} value={value}>
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
