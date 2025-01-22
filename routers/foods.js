// STEP 1 PRIMA ROTTA
// - Importiamo nuovamente il modulo express sul nuovo file js.
const express = require("express");
// - Utilizziamo il metodo express per gestire le rotte in modo modulare.
const foodsRouter = express.Router(); // Oggetto express per creare un instanza routing.
// - Importiamo le funzioni di controllo dal file foodControllers:
const {
  index,
  show,
  store,
  update,
  modify,
  destroy,
} = require("../controllers/foodsController.js");

// STEP 2
// - Creiamo le richieste http con i vari metodi (GET,POST,PUT,PATCH,DELETE)

// READ - (INDEX)
foodsRouter.get("/", index); // Richiesta get generica

// READ - (SHOW)
foodsRouter.get("/:id", show); // Richiesta get specifica

// CREATE - (STORE)
foodsRouter.post("/", store); // Creazione di un nuovo alimento

// UPDATE - (UPDATE)
foodsRouter.put("/:id", update); // Aggiornamento completo di un alimento

// PATCH - (MODIFY)
foodsRouter.patch("/:id", modify); // Aggiornamento parziale di un alimento

// DELETE - (DESTROY)
foodsRouter.delete("/:id", destroy); // Eliminazione di un alimento

// Esportazione del modulo di routing
module.exports = foodsRouter;
