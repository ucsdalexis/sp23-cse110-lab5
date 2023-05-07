// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  addVoices();
}

function addVoices() {
  const textToSpeak = document.querySelector('#text-to-speak');
  const voiceSelect = document.querySelector('#voice-select');
  const button = document.querySelector('button');
  const faceImage = document.querySelector('img');

  let voices = [];
  const synth = window.speechSynthesis;
  voices = synth.getVoices();
  populateVoiceList();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
  }

  button.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
    const selectedVoice = voiceSelect.selectedOptions[0].value;
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedVoice) {
        utterance.voice = voices[i];
        break;
      }
    }
    synth.speak(utterance);
    faceImage.src = 'assets/images/smiling-open.png';
    utterance.onend = () => {
      faceImage.src = 'assets/images/smiling.png';
    };
  });
}