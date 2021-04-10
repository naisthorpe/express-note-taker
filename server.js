// Set up required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const notesArray = require("./db/db");

// Set up the express app
const app = express();
const PORT = 3000;

// Set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("db"));

// Set up route for notes
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Set up notes API route
app.get("/api/notes", (req, res) => res.json(notesArray));

// Set up POST
app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    // Push new note object to array in db.json file
    notesArray.push(newNote);
});

// route for wildcard root
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Start server to begin listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
