import React, { useEffect, useState } from 'react';
import './Text_to_Speech.css';

function Text_to_speech() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
      if (voices.length > 0) {
        setSelectedVoice(voices[0].name);
      }
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(text);
    const selected = voices.find((voice) => voice.name === selectedVoice);
    speech.voice = selected;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="tts_container">
      <h1>Text To Speech <span>Converter</span></h1>
      <textarea 
        placeholder="Write Anything Here....." 
        value={text} 
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="row">
        <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>{voice.name}</option>
          ))}
        </select>
        <button onClick={handleSpeak}>Speak</button>
      </div>
    </div>
  );
}

export default Text_to_speech;
