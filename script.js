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

const audioStoria1 = new Audio("audio/storia1.mp3");

// Gestione errori per l'audio
audioStoria1.addEventListener("error", (e) => {
  console.error("Errore caricamento audio:", e);
});

audioStoria1.addEventListener("canplaythrough", () => {
  console.log("Audio caricato e pronto");
});

document.getElementById("btn1").addEventListener("click", () => {
  aggiornaDato(1, (nuovoValore) => {
    if (nuovoValore === true) {
      playStoria1();
      console.log("Storia 1 avviata");
    } else {
      stopStoria1();
      console.log("Storia 1 fermata");
    }
  });
});

document.getElementById("btn2").addEventListener("click", () => {
  aggiornaDato(2);
});

document.getElementById("btn3").addEventListener("click", () => {
  aggiornaDato(3);
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

function playStoria1() {
  audioStoria1.pause();
  audioStoria1.currentTime = 0;
  audioStoria1
    .play()
    .then(() => {
      console.log("Audio avviato con successo");
    })
    .catch((error) => {
      console.error("Errore durante la riproduzione:", error);
      alert("Clicca qui per avviare l'audio (richiesto dai browser moderni)");
    });
}

function stopStoria1() {
  audioStoria1.pause();
  audioStoria1.currentTime = 0;
  console.log("Audio fermato");
}
