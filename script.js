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

document.getElementById("btn1").addEventListener("click", () => {
  aggiornaDato("1", (nuovoValore) => {
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
  aggiornaDato("2");
});
document.getElementById("btn3").addEventListener("click", () => {
  aggiornaDato("3");
});

function aggiornaDato(id, callback) {
  // fetch("http://localhost:3001/update-character", {
  fetch("https://subi-ajng.onrender.com/update-character", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Risposta update:", data);
      // return fetch("http://localhost:3001/characters");
      return fetch("https://subi-ajng.onrender.com/characters");
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Dati ricevuti dal backend:", data);
      // ...gestisci i dati...
      const record = data.find((el) => el.id === "1");
      if (callback && record) callback(record.value);
    })
    .catch((err) => {
      console.error("Errore dal backend:", err);
    });
}

function playStoria1() {
  audioStoria1.pause();
  audioStoria1.currentTime = 0;
  audioStoria1.play();
}

function stopStoria1() {
  audioStoria1.pause();
  audioStoria1.currentTime = 0; // Resetta l'audio all'inizio
}
