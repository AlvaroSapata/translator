import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import "./App.css";
import {
  ArrowsIcon,
  ClipboardIcon,
  SpeakerIcon,
  DeleteIcon,
} from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from "../constants";
import { useStore } from "./hooks/useStore";
import { translate } from "./services/translate";
import { SectionType } from "./types.d";

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    clearText,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (debouncedFromText === "") return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return;
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row className="Row">
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />

            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs="auto" className="button-column">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <span className="icon-container">
              <ArrowsIcon />
            </span>
          </Button>

          {fromText && (
            <Button
              variant="link"
              onClick={clearText}
              className="delete-button"
            >
              <span className="icon-container">
                <DeleteIcon />
              </span>
            </Button>
          )}
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <span className="icon-container">
                    <ClipboardIcon />
                  </span>
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <span className="icon-container">
                    <SpeakerIcon />
                  </span>
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
