const noteModel = require('../models/note');

const createNote = async (req, res) => {
   try {
      const { title, description } = req.body;

      const note = new noteModel({
         title: title,
         description: description,
         userId: req.userId
      });

      await note.save();

      return res.status(201).json({ note: note });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
};

const getNotes = async (req, res) => {
   try {
      const notes = await noteModel.find({ userId: req.userId });

      return res.status(200).json(notes);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
};

const getNote = async (req, res) => {
   try {
      const id = req.params.noteId;

      const note = await findNoteByIdAndUser(id, req.userId);

      return res.status(200).json(note);

      // const note = await noteModel.findOne({ _id: id, userId: req.userId });

      // note ? res.status(200).json(note) : noteNotFound(res);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
};

const updateNote = async (req, res) => {
   try {
      const id = req.params.noteId;
      const { title, description } = req.body;

      const note = await findNoteByIdAndUser(id, req.userId);

      note.title = title;
      note.description = description;
      await note.save();

      return res.status(200).json({ note: note });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
};


const deleteNote = async (req, res) => {
   try {
      const id = req.params.noteId;

      const note = await findNoteByIdAndUser(id, req.userId);

      await noteModel.deleteOne({ _id: id, userId: req.userId })

      return res.status(202).json({ note: note });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
};

const findNoteByIdAndUser = async (id, userId) => {
   const note = await noteModel.findOne({ _id: id, userId: userId });
   if (!note) {
      throw new Error('Note not found.');
   }
   return note;
};


module.exports = { createNote, getNotes, getNote, updateNote, deleteNote }