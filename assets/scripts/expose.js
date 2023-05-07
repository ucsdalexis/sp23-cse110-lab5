// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  changeThings();
  playSound();
  updateVolume();

}

function changeThings() {
  const voiceSelect = document.getElementById('horn-select');
  voiceSelect.addEventListener('change', function() {
    const selectedHorn = voiceSelect.value;
    const hornImage = document.querySelector('img');
    const hornSound = document.querySelector('audio');
    // code to run when the event is triggered
    if (selectedHorn == 'air-horn') {
      hornImage.setAttribute('src', './assets/images/air-horn.svg');
      hornSound.setAttribute('src', './assets/audio/air-horn.mp3');
    } else if (selectedHorn == 'car-horn') {
      hornImage.setAttribute('src', './assets/images/car-horn.svg');
      hornSound.setAttribute('src', './assets/audio/car-horn.mp3');
    } else if (selectedHorn == 'party-horn') {
      hornImage.setAttribute('src', './assets/images/party-horn.svg');
      hornSound.setAttribute('src', './assets/audio/party-horn.mp3');
    }
  })
}

function playSound() {
  const playButton = document.querySelector('button');
  const audio = document.querySelector('audio');
  playButton.addEventListener('click', function() {
    audio.play();
    makeConfetti();
  });
}

function makeConfetti() {
  const voiceSelect = document.getElementById('horn-select');
  const selectedHorn = voiceSelect.value;
  
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const canvas2 = document.querySelector('canvas');
  canvas2.style.position = 'absolute';
  canvas2.style.top = canvas.height/2; // move the canvas up by 50 pixels
  const jsConfetti = new JSConfetti({ canvas });

  if (selectedHorn == 'party-horn') {
    jsConfetti.addConfetti({
      confettiColors: [
        '#F94560', '#FB6176', '#FC7C8B', '#FD98A1', '#FEB3B6',
      ],
    });
    setTimeout(function() {
      canvas2.remove();
    }, 2600);
  }
  
}

function updateVolume() {
  const audio = document.querySelector('audio');
  const volumeIcon = document.querySelector('#volume-controls img');
  const volumeRange = document.getElementById('volume');
  volumeRange.addEventListener('input', function() {
    const volumeValue = volumeRange.value;

    if (volumeValue == 0) {
      volumeIcon.src = "./assets/icons/volume-level-0.svg";
      volumeIcon.setAttribute("alt", "Volume level 0");
    } else if (volumeValue < 33) {
      volumeIcon.src = "./assets/icons/volume-level-1.svg";
      volumeIcon.setAttribute("alt", "Volume level 1");
    } else if (volumeValue < 67) {
      volumeIcon.src = "./assets/icons/volume-level-2.svg";
      volumeIcon.setAttribute("alt", "Volume level 2");
    } else {
      volumeIcon.src = "./assets/icons/volume-level-3.svg";
      volumeIcon.setAttribute("alt", "Volume level 3");
    }
    audio.volume = volumeValue/100;
  })
}