import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

// Definimos los commonStyles, que seran los aplicados cuando el texto sea FROM
const commonStyles = { border: "10px", height: "200px", color: "#ffffff" };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#303134" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
