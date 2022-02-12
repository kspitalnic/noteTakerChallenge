const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
    read(){
        return readFile('db/db.json', 'utf8');
    }
    write(note){
        return writeFile('db/db.json', JSON.stringify(note, null, 2));
    }

    getNotes(){
        return this.read().then((notes) => {
            let parseNotes 
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parseNotes = [];
            }
            return parseNotes; 
        })
    }

    addNote(note){
        const{title, text} = note;
        const newNote = {title, text, id:uuidv4()}
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    // deleteNote(note){
    //     return this.addNote()
    //     .then((notes, id) => notes.filter({id} === id)
    //     .then((remainingNotes) => this.write(remainingNotes))
    //     )

    // }
}



// function createNewNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, '../db/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );
//     return note;
// }

// function validateNote(note) {
//     if (!note.title || typeof note.title !== 'string') {
//         return false;
//     }
//     if (!note.content || typeof note.content !== 'string') {
//         return false;
//     }
//     return true;
// }

module.exports = new Notes();