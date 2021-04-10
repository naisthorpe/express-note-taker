// Set up required packages
const express = require("express");
const path = require("path");
const fs = require("fs");

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
    // Set newNote as request body
    const newNote = req.body;
    
    // Read the db.json file via JSON.parse
    let notesArray = JSON.parse(fs.readFile("./db/db.json", "utf8"));
    notesArray.push(newNote);
    console.log(notesArray);

    // Push new note object to array into parsed db.json file

    // Overwrite db.json file with fs write and json.stringify
    
});

// route for wildcard root
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Start server to begin listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
