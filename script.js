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

document.getElementById("btn1").addEventListener("click", () => {
  aggiornaDato("1");
});
document.getElementById("btn2").addEventListener("click", () => {
  aggiornaDato("2");
});
document.getElementById("btn3").addEventListener("click", () => {
  aggiornaDato("3");
});

function aggiornaDato(id) {
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
    })
    .catch((err) => {
      console.error("Errore dal backend:", err);
    });
}

function storia1() {
  const audio = new Audio("audio/storia1.mp3");
  audio.play();
}
