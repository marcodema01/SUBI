require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// Funzione di inizializzazione
async function checkAndCreateRows() {
  const ids = [1, 2, 3]; // <-- usa numeri!
  for (const id of ids) {
    const { data, error } = await supabase
      .from("SUBI")
      .select("id")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      // Errore diverso da "row not found"
      console.error(
        `Errore durante il controllo della riga ${id}:`,
        error.message
      );
      continue;
    }

    if (!data) {
      // Riga non trovata, la creo con value: false
      const { error: insertError } = await supabase
        .from("SUBI")
        .insert([{ id, value: false }]);
      if (insertError) {
        console.error(
          `Errore durante l'inserimento della riga ${id}:`,
          insertError.message
        );
      } else {
        console.log(`Riga ${id} creata con value: false`);
      }
    }
  }
}

// Avvia il controllo all'avvio del server
checkAndCreateRows();

app.post("/insert-character", async (req, res) => {
  const { id, value } = req.body;
  console.log("Richiesta POST ricevuta su /insert-character", req.body);
  const { error } = await supabase.from("SUBI").insert([{ id, value }]);
  if (error) {
    console.error("Errore inserimento:", error.message);
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

app.get("/characters", async (req, res) => {
  const { data, error } = await supabase.from("SUBI").select("id", "value");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.post("/update-character", async (req, res) => {
  const { id } = req.body;
  // Prendi il valore attuale
  const { data, error: selectError } = await supabase
    .from("SUBI")
    .select("value")
    .eq("id", id)
    .single();

  if (selectError) {
    console.error("Errore select:", selectError.message);
    return res.status(500).json({ error: selectError.message });
  }

  // Inverti il valore booleano
  const nuovoValore = !data.value;

  // Aggiorna il valore
  const { error: updateError } = await supabase
    .from("SUBI")
    .update({ value: nuovoValore })
    .eq("id", id);

  if (updateError) {
    console.error("Errore update:", updateError.message);
    return res.status(500).json({ error: updateError.message });
  }

  res.json({ success: true, id, nuovoValore });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend in ascolto su http://localhost:${PORT}`);
});
