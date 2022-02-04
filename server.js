const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express()

//parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});

const { notes } = require('./data/notes');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.content) {
        filteredResults = filteredResults.filter(note => note.content === query.content);
    }
    return filteredResults;
}

function findByTitle(title, notesArray) {
    const result = notesArray.filter(note => note.title === title)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.content || typeof note.content !== 'string') {
      return false;
    }
    return true;
  }


app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, notes);
    }
    res.json(results);
});

app.get('/api/notes/:title', (req, res) => {
    const result = findByTitle(req.params.title, notes);
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    //set id based on what the next index of the array will be 
    req.body.id = notes.length.toString()

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not propperly formatted');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(req.body);
    }
});