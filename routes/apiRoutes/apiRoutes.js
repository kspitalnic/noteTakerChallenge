const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.post('/notes', (req, res) => {
    console.log(req.body);
    //set id based on what the next index of the array will be 
    req.body.id = notes.length.toString()

    if (!validateNote(req.body)) {
        res.status(400).send('The note does not have the required minimum content');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(req.body);
    }
});



router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


module.exports = router;
