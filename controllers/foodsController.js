const connection = require("../connection")

// READ - (INDEX)
function index(req, res) {
  const sql = "SELECT * FROM `pizzas`"
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results)
    }
  })

}

// READ - (SHOW)
function show(req, res) {

  const id = parseInt(req.params.id);
  const selectSql = "SELECT * FROM `pizzas` WHERE `id` = ?";

  connection.query(selectSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    const item = results.length > 0 ? results[0] : null;
    if (!item) {
      return res.status(404).json({ error: "L'elemento non esiste" });
    }

    res.json({ success: true, item });
  });

}

// CREATE - (STORE)
function store(req, res) {
  let flagID = 0;
  objectsFoods.forEach((element) => {
    if (flagID < element.id) {
      flagID = element.id;
    }
  });

  // Creiamo un nuovo elemento da inserire nell'array del db.js
  const newAliment = {
    id: ++flagID,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
    available: req.body.available,
  };
  objectsFoods.push(newAliment);
  res.status(201).json(newAliment);
  console.log({
    testo: "Il nuovo alimento inserito è il seguente:",
    oggetto: newAliment,
  });
} // Creazione di un nuovo alimento.

// UPDATE - (UPDATE)
function update(req, res) {
  const parametro = parseInt(req.params.id);
  let filtredArray = objectsFoods.find((element) => element.id === parametro);
  const id = parseInt(req.params.id);

  if (filtredArray) {
    const { title, content, image, tags } = req.body;
    const modifiedObject = { id, title, content, image, tags };
    for (const key in filtredArray) {
      filtredArray[key] = modifiedObject[key];
    }
    res.json(filtredArray);
  } else {
    res.status(404).json({
      length: 0,
      error: "Nessun elemento trovato",
    });
  }
}

// PATCH - (MODIFY)
function modify(req, res) {
  res.send(`Aggiornamento parziale alimento`);
} // Aggiornamento parziale di un alimento

// DELETE - (DESTROY)
function destroy(req, res) {

  const id = parseInt(req.params.id);

  const selectSql = "SELECT * FROM `pizzas` WHERE `id` = ?";
  connection.query(selectSql, [id], (selectErr, selectResults) => {
    if (selectErr) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (!selectResults[0]) {
      return res.status(404).json({ error: "Element not found" });
    }
    const deletedItem = selectResults[0];

    const deleteSql = "DELETE FROM `pizzas` WHERE `id` = ?";
    connection.query(deleteSql, [id], (deleteErr, results) => {
      if (deleteErr) {
        return res.status(500).json({ error: "Database query failed" });
      } else {
        console.log(results)
        return res.json({ message: "Element deleted", deletedItem });
      }

    });
  });
} // Eliminazione di un alimento

module.exports = { index, show, store, update, modify, destroy };
