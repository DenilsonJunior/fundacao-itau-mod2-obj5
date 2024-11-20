events.on("ready", function () {
  const audioPlayers = document.querySelectorAll(".audio-player");

  audioPlayers.forEach((audioPlayer) => {
    const audioUrl = audioPlayer.dataset.url;
    const audioX = new Audio(audioUrl);
    audioPlayer.audio = audioX;
    const { audio } = audioPlayer;

    const btnPlayToggle = audioPlayer.querySelector(".btn-play");
    const slider = audioPlayer.querySelector("input[type='range']");

    function handleError() {
      const errors = {
        1: "Processo abortado pelo usuário",
        2: "Ocorreu um erro no download",
        3: "Erro na execução do áudio",
        4: "Formato de áudio não suportado",
      };

      const errorMessage = `Erro: ${errors[audio.error.code]}`;

      audioPlayer.classList.add("error");
      audioPlayer.classList.remove("loading");
      console.error(errorMessage);
    }

    function formatTimeToDisplay(seconds) {
      const milliseconds = seconds * 1000;
      return new Date(milliseconds).toISOString().substr(14, 5);
    }

    function pauseAllOthers(currentAudio) {
      audioPlayers.forEach((audioPlayer) => {
        if (audioPlayer.audio !== currentAudio) {
          audioPlayer.audio.pause();
        }
      });
    }

    function handlePlayButton() {
      bridge.audioPause("podcast");
      pauseAllOthers(audio);

      audio.paused ? audio.play() : audio.pause();
    }

    function handleSlider(e) {
      const { duration } = audio;
      const percent = e.target.value;
      const currentTimeInSeconds = ((percent * duration) / 100).toFixed(2);
      audio.currentTime = currentTimeInSeconds;
    }

    function updateCurrentTimeDisplay(time) {
      audioPlayer.style.setProperty("--player-current-time", `'${time}'`);
    }

    function updateCurrentPercent() {
      const { currentTime, duration } = audio;

      console.log("updateCurrentPercent", currentTime, duration);

      const percentPlayed = (currentTime * 100) / duration;
      slider.value = percentPlayed;
      audioPlayer.style.setProperty(
        "--player-percent-played",
        `${percentPlayed}%`
      );
    }

    function showTimeDuration() {
      const { duration } = audio;
      const durationDisplay = formatTimeToDisplay(duration);
      // updateCurrentTimeDisplay(durationDisplay);

      audioPlayer.style.setProperty(
        "--player-current-date-time",
        `'${durationDisplay}'`
      );
    }

    function start() {
      btnPlayToggle.onclick = handlePlayButton;
      slider.oninput = handleSlider;

      let abort;
      audio.onerror = () => {
        abort = true;
        handleError();
      };
      if (abort) return;

      audio.onloadstart = () => {
        //setMessageDate();
        audioPlayer.classList.add("loading");
      };

      audio.onplay = () => audioPlayer.classList.add("playing");
      audio.onpause = () => audioPlayer.classList.remove("playing");
      audio.onloadeddata = () => audioPlayer.classList.remove("loading");
      audio.ondurationchange = showTimeDuration;
      audio.onended = () => (audio.currentTime = 0);
      audio.ontimeupdate = () => {
        const { currentTime } = audio;
        const currentTimeDisplay = formatTimeToDisplay(currentTime);

        updateCurrentTimeDisplay(currentTimeDisplay);
        updateCurrentPercent();
        if (currentTime === 0) {
          showTimeDuration();
        }
      };
    }

    start();
  });
});
