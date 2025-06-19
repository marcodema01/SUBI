// fetch("http://localhost:3001/insert-characters", { method: "POST" })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("Risposta inserimento:", data);
//     // Dopo l'inserimento, puoi leggere i dati aggiornati
//     return fetch("http://localhost:3001/characters");
//   })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("Dati ricevuti dal backend:", data);
//     // ...gestisci i dati...
//   })
//   .catch((err) => {
//     console.error("Errore dal backend:", err);
//   });

const audios = [
  new Audio("audio/1_what-a-wonderful-day.mp3"),
  new Audio("audio/2_thats-right.mp3"),
  new Audio("audio/3_milky-way.mp3"),
  new Audio("audio/4_galaxy.mp3"),
  new Audio("audio/5_aliens.mp3"),
  new Audio("audio/6_aliens2.mp3"),
  new Audio("audio/7_planet.mp3"),
  new Audio("audio/8_comet.mp3"),
  new Audio("audio/9_fox.mp3"),
  new Audio("audio/10_eyes-again.mp3"),
];

audios.forEach((audio, index) => {
  audio.addEventListener("error", (e) => {
    console.error(`Errore caricamento audio ${index + 1}:`, e);
  });

  audio.addEventListener("canplaythrough", () => {
    console.log(`Audio ${index + 1} caricato e pronto`);
  });
});

document.getElementById("btn1").addEventListener("click", () => {
  aggiornaDato(1, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(1);
      console.log("Storia 1 avviata");
    } else {
      stopAudio(1);
      console.log("Storia 1 fermata");
    }
  });
});

document.getElementById("btn2").addEventListener("click", () => {
  aggiornaDato(2, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(2);
      console.log("Storia 2 avviata");
    } else {
      stopAudio(2);
      console.log("Storia 2 fermata");
    }
  });
});

document.getElementById("btn3").addEventListener("click", () => {
  aggiornaDato(3, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(3);
      console.log("Storia 3 avviata");
    } else {
      stopAudio(3);
      console.log("Storia 3 fermata");
    }
  });
});

document.getElementById("btn4").addEventListener("click", () => {
  aggiornaDato(4, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(4);
      console.log("Storia 4 avviata");
    } else {
      stopAudio(4);
      console.log("Storia 4 fermata");
    }
  });
});

document.getElementById("btn5").addEventListener("click", () => {
  aggiornaDato(5, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(5);
      console.log("Storia 5 avviata");
    } else {
      stopAudio(5);
      console.log("Storia 5 fermata");
    }
  });
});

document.getElementById("btn6").addEventListener("click", () => {
  aggiornaDato(6, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(6);
      console.log("Storia 6 avviata");
    } else {
      stopAudio(6);
      console.log("Storia 6 fermata");
    }
  });
});

document.getElementById("btn7").addEventListener("click", () => {
  aggiornaDato(7, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(7);
      console.log("Storia 7 avviata");
    } else {
      stopAudio(7);
      console.log("Storia 7 fermata");
    }
  });
});

document.getElementById("btn8").addEventListener("click", () => {
  aggiornaDato(8, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(8);
      console.log("Storia 8 avviata");
    } else {
      stopAudio(8);
      console.log("Storia 8 fermata");
    }
  });
});

document.getElementById("btn9").addEventListener("click", () => {
  aggiornaDato(9, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(9);
      console.log("Storia 9 avviata");
    } else {
      stopAudio(9);
      console.log("Storia 9 fermata");
    }
  });
});

document.getElementById("btn10").addEventListener("click", () => {
  aggiornaDato(10, (nuovoValore) => {
    if (nuovoValore === true) {
      playAudio(10);
      console.log("Storia 10 avviata");
    } else {
      stopAudio(10);
      console.log("Storia 10 fermata");
    }
  });
});

function aggiornaDato(id, callback) {
  fetch("https://subi-ajng.onrender.com/update-character", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((record) => {
      console.log("Risposta update:", record);
      if (callback) {
        console.log(`Valore aggiornato per id ${id}:`, record.value);
        callback(record.value);
      }
    })
    .catch((err) => {
      console.error("Errore dal backend:", err);
    });
}

function playAudio(index) {
  const audio = audios[index - 1]; // gli array partono da 0
  if (!audio) {
    console.error(`Audio con indice ${index} non trovato!`);
    return;
  }
  audio.pause();
  audio.currentTime = 0;
  audio
    .play()
    .then(() => {
      console.log(`Audio ${index} avviato con successo`);
    })
    .catch((error) => {
      console.error(`Errore durante la riproduzione audio ${index}:`, error);
      alert("Clicca qui per avviare l'audio (richiesto dai browser moderni)");
    });
}

function stopAudio(index) {
  const audio = audios[index - 1];
  if (!audio) {
    console.error(`Audio con indice ${index} non trovato!`);
    return;
  }
  audio.pause();
  audio.currentTime = 0;
  console.log(`Audio ${index} fermato`);
}
