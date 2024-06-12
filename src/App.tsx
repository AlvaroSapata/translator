import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useStore } from "./hooks/useStore";


function App() {

  const { fromLanguage, setFromLanguage } = useStore();

  return (
    <div className="App">
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          setFromLanguage("es");
        }}
      >
        Cambiar a español | {fromLanguage}
      </button>
    </div>
  );
}

export default App;
