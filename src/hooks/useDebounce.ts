import { useEffect, useState } from 'react'

/**
 * Hook personalizado `useDebounce` para retrasar la actualización de un valor.
 * 
 * @param value - El valor que queremos "debouncear". Su tipo es genérico (`T`), lo que permite reutilizar el hook con cualquier tipo de dato.
 * @param delay - Tiempo en milisegundos antes de actualizar el valor. Es opcional y por defecto es 500ms.
 * @returns El valor debounced después del retraso especificado.
 */
export function useDebounce<T>(value: T, delay = 500) {
  /** 
   * `useState` se inicializa con el valor original. 
   * TypeScript infiere automáticamente que `debouncedValue` es del mismo tipo que `value` (`T`).
   */
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    /**
     * Se establece un temporizador para actualizar el valor después del `delay` especificado.
     */
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    /**
     * Función de limpieza (`cleanup function`):
     * - Cuando `value` o `delay` cambian, este efecto se ejecuta nuevamente.
     * - Se limpia el temporizador anterior con `clearTimeout(timer)` para evitar actualizaciones innecesarias.
     */
    return () => { clearTimeout(timer) }
  }, [value, delay]) // Dependencias: el efecto se ejecuta cuando `value` o `delay` cambian.

  return debouncedValue
}
