import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

/**
 * Definición de un tipo compuesto `Props` utilizando una unión de tipos (`|`).
 * En TypeScript, esto permite que `Props` adopte una de dos posibles estructuras.
 */
type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

/**
 * Definición de un componente funcional en TypeScript con tipado explícito de `Props`.
 * Esto ayuda a que TypeScript valide los valores de `props` y prevenga errores en tiempo de compilación.
 */
export const LanguageSelector = ({ onChange, type, value }: Props) => {
  
  /**
   * `handleChange` es una función de evento tipada usando `React.ChangeEvent<HTMLSelectElement>`.
   * Esto permite que TypeScript infiera correctamente el tipo del `event.target`.
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Se utiliza `as Language` para hacer una aserción de tipo (type assertion).
    // Esto le dice a TypeScript que tratamos el valor del `<select>` como un `Language`.
    onChange(event.target.value as Language) 
  }

  return (
    <Form.Select 
      aria-label='Selecciona el idioma' 
      onChange={handleChange} 
      value={value} 
      className='custom-select'
    >
      {/* 
        Operador de igualdad estricta (`===`) para verificar si `type` es `SectionType.From`.
        TypeScript ayuda a detectar si `type` no es una opción válida en `SectionType`.
      */}
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
