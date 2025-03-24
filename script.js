const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
});

const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const recordings = [
    'recordings/recording1.mp3',
    'recordings/recording2.mp3',
    'recordings/recording3.mp3',
];
let currentRecordingIndex = parseInt(localStorage.getItem('recordingIndex')) || 0;
let intervalId;
let pausedTime = 0;

function playNextRecording() {
    audioPlayer.src = recordings[currentRecordingIndex];
    audioPlayer.currentTime = pausedTime;
    audioPlayer.play();
    currentRecordingIndex = (currentRecordingIndex + 1) % recordings.length;
    localStorage.setItem('recordingIndex', currentRecordingIndex);
    pausedTime = 0;
}

playButton.addEventListener('click', () => {
    if (!intervalId) {
        if (audioPlayer.src) {
            audioPlayer.currentTime = pausedTime;
            audioPlayer.play();
        } else {
            playNextRecording();
        }
        intervalId = setInterval(playNextRecording, 39000);
        playButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        pausedTime = audioPlayer.currentTime;
        clearInterval(intervalId);
        intervalId = null;
        playButton.textContent = 'Play';
    }
});

audioPlayer.addEventListener('ended', () => {
    playNextRecording();
});