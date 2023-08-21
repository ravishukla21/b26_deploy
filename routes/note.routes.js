const express = require("express");
const { NoteModel } = require("../models/note.model");
const { auth } = require("../middleware/auth.middleware");
const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  //logic
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.json({ msg: "New note has been added", note: req.body });
  } catch (err) {
    res.json({ error: err.message });
  }
});

noteRouter.get("/", async (req, res) => {
  //logic
  //relationship node connection and user connection for particular type of login
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.json(notes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  //logic=> update
  const { noteID } = req.params;
  //userID in the user id in the note document
  const userIDinUserDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;

    if (userIDinUserDoc === userIDinNoteDoc) {
      //update
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} has been updated` });
    } else {
      res.json({ msg: "not authorized" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  //logic
  //logic=> update
  const { noteID } = req.params;
  //userID in the user id in the note document
  const userIDinUserDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: noteID });
    const userIDinNoteDoc = note.userID;

    if (userIDinUserDoc === userIDinNoteDoc) {
      //update
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} has been deleted` });
    } else {
      res.json({ msg: "not authorized" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

//implement logout using blacklisting

module.exports = { noteRouter };
