const express = require("express");

const app = express();

app.use(express.json());

const entries = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(entries);
});

app.get("/info", (req, res) => {
  res.send(`
        <p>Phonebook info has 2 people</p>
        ${new Date()}
        `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const entry = entries.find((entry) => entry.id == id);
  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404).send("NOT FOUND");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  entries = entries.filter((entry) => entry.id != id);
});

app.post("/api/persons", (req, res) => {
  const entry = req.body;
  const name = entry.name;
  if (!entry.name || !entry.number) {
    res.status(400).json("name or phone number not defined");
    return;
  }
  const name1 = entries.find((entry) => entry.name === name);
  if (name1) {
    console.error("Name must be unique");
  }
  const min = 1;
  const max = 10000;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  entry.id = id;
  entries.push(entry);
  res.json(entry);
});
const port = 3001;
app.listen(port);
