import React from "react";

const ORIGINAL_TEXT ="Hello This is Ranjana S";

const splitText = (text, from, to) => [
  text.slice(0, from),
  text.slice(from, to),
  text.slice(to)
];

const HighlightedText = ({ text, from, to }) => {
  const [start, highlight, finish] = splitText(text, from, to);
  return (
    <p>
      {start}
      <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
      {finish}
    </p>
  );
};

export default function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0
  });

  const handleClick = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }

    let utterance = new SpeechSynthesisUtterance(ORIGINAL_TEXT);
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });
    synth.speak(utterance);
  };

  return (
    <div className="App">
      <HighlightedText text={ORIGINAL_TEXT} {...highlightSection} />
      <button disabled={disabled} onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
