const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001; 
const app = express () 

//parse incoming string or array data 
app.use(express.urlencoded({extetnded:true}));
//parse incoming JSON data
app.use(express.json());

app.listen(PORT,() => {
    console.log.apply(`API server now on port ${PORT}!`)
}); 

const { notes } = require('./data/programs');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.title === query.name);
    }
    if (query.content) {
      filteredResults = filteredResults.filter(notes => notes.content === query.program);
    }
    return filteredResults;
  }



  app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, notes);
    }
    res.json(results);
  });