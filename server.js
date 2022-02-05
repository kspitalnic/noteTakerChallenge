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
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});

const { notes } = require('./db/db');


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
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


app.post('/api/notes', (req, res) => {
    console.log(req.body);
    //set id based on what the next index of the array will be 
    req.body.id = notes.length.toString()

    if (!validateNote(req.body)) {
        res.status(400).send('The note does not have the required minimul content');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(req.body);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

