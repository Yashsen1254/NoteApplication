const express = require('express');
const router = express.Router();
const Notes = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

// get all notes
router.get('/fetchallnotes',fetchuser ,async (req, res) => {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
})

module.exports = router;