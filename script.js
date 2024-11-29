const tracks = [
    {
      name: "Let me down slowly",
      artist: "Alec Benjamin",
      cover: "/assets/covers/alec.jpg",
      source: "/assets/tracks/Let me down slowly.mp3",
    },
    {
      name: "Let me love you",
      artist: "DJ Snake/Justin Beiber",
      cover: "/assets/covers/dj.jpg",
      source: "/assets/tracks/Let me love you.mp3",
    },
    {
      name: "Perfect",
      artist: "Ed Sheeran",
      cover: "/assets/covers/ed.jpg",
      source: "/assets/tracks/Perfect.mp3",
    },
  ];
  
  let currentTrack = 0;
  let isPlaying = false;
  
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const trackCover = document.getElementById("track-cover");
  const currentTimeEl = document.getElementById("current-time");
  const totalDurationEl = document.getElementById("total-duration");
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.getElementById("progress");
  
  // Load a track based on its index
  function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist;
    trackCover.src = track.cover;
    audio.src = track.source;
  
    // Reset the progress bar and time display
    progress.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    totalDurationEl.textContent = "0:00";
  }
  
  // Toggle play/pause for the current track
  function playPauseTrack() {
    if (isPlaying) {
      audio.pause();
      playBtn.classList.add("fa-play");
      playBtn.classList.remove("fa-pause");
    } else {
      audio.play();
      playBtn.classList.add("fa-pause");
      playBtn.classList.remove("fa-play");
    }
    isPlaying = !isPlaying;
  }
  
  // Update the progress bar and time display
  function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
  
    if (!isNaN(duration)) {
      progress.style.width = (currentTime / duration) * 100 + "%";
      currentTimeEl.textContent = formatTime(currentTime);
      totalDurationEl.textContent = formatTime(duration);
    }
  }
  
  // Format time (e.g., 1:30)
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  // Seek to a specific part of the track
  function seekTrack(e) {
    const width = progressBar.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
  }
  
  // Play the previous track
  function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    isPlaying = true;
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
  
  // Play the next track
  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    isPlaying = true;
    playBtn.classList.add("fa-pause");
    playBtn.classList.remove("fa-play");
  }
  
  // Event listeners
  playBtn.addEventListener("click", playPauseTrack);
  prevBtn.addEventListener("click", prevTrack);
  nextBtn.addEventListener("click", nextTrack);
  audio.addEventListener("timeupdate", updateProgress);
  progressBar.addEventListener("click", seekTrack);
  
  // Load the initial track
  loadTrack(currentTrack);
  