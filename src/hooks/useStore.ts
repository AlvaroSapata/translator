import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../../constants'
import { type FromLanguage, type Language, type Action, type State } from '../types'

/**
 * 1. Definir el estado inicial con `State` tipado.
 * Esto asegura que `initialState` cumpla con la estructura definida en el tipo `State`.
 */
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

/**
 * 2. Crear un reducer tipado con `State` y `Action`.
 * TypeScript verifica que `state` tenga la forma correcta y que `action.type` sea válido.
 */
function reducer(state: State, action: Action): State {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    /**
     * Evitamos modificar el estado en los componentes y centralizamos la lógica aquí.
     * Esto mantiene la lógica de estado separada de la interfaz de usuario.
     */
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  if (type === 'CLEAR_TEXT') {
    return {
      ...state,
      fromText: '',
      result: '',
      loading: false
    }
  }

  return state
}

/**
 * 3. Hook personalizado `useStore` que encapsula `useReducer`.
 * - Devuelve el estado junto con funciones de actualización.
 * - Garantiza que `dispatch` maneje únicamente acciones definidas en `Action`.
 */
export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  /**
   * Funciones `dispatch` que envían acciones con tipos específicos.
   * TypeScript garantiza que los `payload` sean del tipo correcto.
   */
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  const clearText = () => {
    dispatch({ type: 'CLEAR_TEXT' })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    clearText
  }
}
