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

// route for base page root
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// Set up route for notes
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// Set up notes API route
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

// Set up POST
app.post("/api/notes", (req, res) => {
    // Set newNote as request body
    const newNote = req.body;
    
    // Read the db.json file and parse it
    // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    let notesArray = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

    // Push new note to notes array
    notesArray.push(newNote);
    
    // Give each note a unique id based on the index
    // https://stackoverflow.com/questions/62926005/add-an-incrementing-id-property-to-each-object-in-array-after-it-has-been-submit
    notesArray.forEach((note, index) => {
        note.id = index + 1;
    });   

    // Overwrite db.json file with fs write and json.stringify
    // To clean up the json file: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    // Make the space argument 4 so it tabs properly
    fs.writeFile("./db/db.json", JSON.stringify(notesArray, null, 4), (err) => {
        if (err) throw err;
    });

    console.log("Note saved");
    res.json(notesArray);
});

// Add delete functionality here
// https://www.geeksforgeeks.org/express-js-app-delete-function/
app.delete("/api/notes/:id", (req, res) => {
    // This is like the params from Unit 11 Activity 14
    const chosen = parseInt(req.params.id);
    // parse the db.json file
    let notesArray = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    // now filter the array and exclude the chosen id
    // https://stackoverflow.com/questions/14400609/remove-json-entry-by-value/14400705
    let newArray = notesArray.filter((note) => {
        console.log(note);
        console.log(note.id);
        console.log(chosen);
        return note.id !== chosen;
    });
    // stringify the new array without the deleted id
    fs.writeFile("./db/db.json", JSON.stringify(newArray, null, 4), (err) => {
        if (err) throw err;
    });
    // now console log note was deleted
    console.log(`Note id ${chosen} deleted`);
    console.log(newArray);
    res.json(newArray);
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")))

// Start server to begin listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
