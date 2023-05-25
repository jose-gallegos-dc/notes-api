const express = require('express');
const { createNote, getNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController');
const validateNoteRequest = require('../requests/noteRequest');
const authentication = require('../middlewares/authentication');
const noteRouter = express.Router();

noteRouter.post('/note', authentication, validateNoteRequest, createNote);
noteRouter.get('/notes', authentication, getNotes);
noteRouter.get('/note/:noteId', authentication, getNote);
noteRouter.put('/note/:noteId', authentication, validateNoteRequest, updateNote);
noteRouter.delete('/note/:noteId', authentication, deleteNote);

module.exports = noteRouter;