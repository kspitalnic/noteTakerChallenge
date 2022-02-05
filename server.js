const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express()
const router = require('express').Router();

//parse incoming string or array data 
router.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
router.use(express.json());
router.use(express.static('public'));

router.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});





