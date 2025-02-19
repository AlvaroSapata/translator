import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";

/**
 * Definimos una `interface` para los props del componente.
 * - `type` es obligatorio y debe ser un valor de `SectionType`.
 * - `loading` es opcional (`?`) y puede ser un booleano.
 * - `onChange` es una función que recibe un `string` y no devuelve nada (`void`).
 * - `value` es un `string` obligatorio.
 */
interface Props {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

/**
 * Definimos un objeto con estilos comunes.
 * TypeScript infiere el tipo como `{ border: string; height: string; color: string }`
 */
const commonStyles = { border: "10px", height: "200px", color: "#ffffff" };

/**
 * `getPlaceholder` recibe un objeto con `type` y `loading`.
 * - Se usa `loading?: boolean` para indicar que `loading` es opcional.
 * - TypeScript validará que `type` sea un `SectionType`.
 */
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

/**
 * Componente funcional `TextArea` con tipado explícito de `Props`.
 */
export const TextArea = ({ type, loading, value, onChange }: Props) => {
  /**
   * Se define `styles`, aplicando una condición de TypeScript.
   * - Si `type` es `From`, usa `commonStyles`.
   * - Si `type` es `To`, añade `backgroundColor` usando el operador de propagación (`...`).
   */
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#303134" };

  /**
   * `handleChange` está tipado con `React.ChangeEvent<HTMLTextAreaElement>`.
   * Esto permite que TypeScript infiera correctamente el tipo de `event.target.value`.
   */
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      /** `autoFocus` es un booleano que depende del tipo */
      autoFocus={type === SectionType.From}
      /** Se especifica que el componente será un `<textarea>` */
      as="textarea"
      /** `disabled` solo se aplica si `type` es `To` */
      disabled={type === SectionType.To}
      /** Se usa `getPlaceholder` para obtener el texto del placeholder */
      placeholder={getPlaceholder({ type, loading })}
      /** Aplicamos los estilos previamente definidos */
      style={styles}
      /** Controlamos el valor del textarea con `value` */
      value={value}
      /** `onChange` usa la función manejadora tipada */
      onChange={handleChange}
    />
  );
};
