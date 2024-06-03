const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// get all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Server Error" });
  }
});

// add notes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Server Error" });
    }
  }
);

// update note
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    try {
    const {title,description,tag} = req.body;
    
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    const note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")};
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not authorized")};
    await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});

  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Server Error" });
  }
  })

module.exports = router;