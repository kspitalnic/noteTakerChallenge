const { deleteNote } = require('../db/notes');
const notes = require('../db/notes');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    console.log('inside get');
    notes.getNotes().then((notes) => {
        return res.json(notes);
    }).catch((err) => res.status(400).json(err))
});

router.post('/notes', (req, res) => {
    console.log('inside post');
    notes.addNote(req.body).then((note) => {
        return res.json(note);
    }).catch((err) => res.status(400).json(err))
})

// router.delete('/notes/:id', (req, res) => {

//     deleteNote(id)
// })



module.exports = router;
