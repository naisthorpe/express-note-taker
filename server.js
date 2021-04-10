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
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

// Set up POST
app.post("/api/notes", (req, res) => {
    // Set newNote as request body
    const newNote = req.body;
    
    // Read the db.json file via JSON.parse
    // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    let notesArray = JSON.parse(fs.readFileSync("./db/db.json", newNote));

    // Push new note to notes array
    notesArray.push(newNote);    

    // Overwrite db.json file with fs write and json.stringify
    JSON.stringify(notesArray, "utf-8", (err) => {
        if (err) throw err;
        console.log("data written to file");
    });

    res.json(notesArray);

    
});

// route for wildcard root
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Start server to begin listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
