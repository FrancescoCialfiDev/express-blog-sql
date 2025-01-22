"use strict"; // Usiamo use strict poichè lavoriamo con file commonJS, quindi non impostato come valore di default.
console.clear(); // Effettuiamo un clear della console da eventuali errori e righe di codice iniziali

// STEP 1 ----Creiamo-progetto-Node----:
// - Inizializziamo un progetto node con il comando npm init -y ( shortcut per evitare la prassi di configurazione del progetto ):
// - Utilizziamo un alias script nel file package.json e applichiamo il controllo --watch per il live refresh della console.
// - Installiamo il modulo express tramite la console con il comando npm install express.
// - Creo un file .gitignore per omettere l'esportazione del contenuto dei moduli express.

///////////////////////////////////////////////

// STEP 2 ----Creazione-del-server-con-express----:

// - Creiamo una costante e importiamo il modulo express.
const express = require("express");
// - Creiamo applicazione server con oggetto express.
const app = express();
// - Creiamo una costante e la inizializziamo al valore della porta 3000 oppure in alternativa alla porta definita in .env
const PORT = 5500;
// - Creiamo una costante e importiamo cors, una libreria che permette al server di gestire richieste provenienti da origini diverse (Cross-Origin Resource Sharing).
const cors = require("cors");

// - Utilizziamo la libreria cors importata.
app.use(cors());
// - Garantiamo l'utilizzo degli assets nella cartella public
app.use(express.static("public")); // Servire file dalla cartella "public".

///////////////////////////////////////////////

// STEP 3 ----Utilizzo-Dei-MiddleWare----:

// Utilizziamo il middleware per permettere il parsing dei file json inviati.
app.use(express.json());

// Altri tipi di middleware...

///////////////////////////////////////////////

// STEP 4 ----Import-File-Routing----:

const routingFoods = require("./routers/foods.js");
app.use("/foods", routingFoods); // Usiamo il metodo use per indicare l'utilizzo del modulo del file di routing.

// Middleware per le rotte non registrate
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint non trovato" });
});
const error = require("./middlewares/checkError.js");
app.use("*", error);

// Mettiamo in ascolto la nostra variabile app che contiene il server, sulla porta 3000.
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
