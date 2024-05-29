const { Router } = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {NoteModel} = require("../models/Note.model") 
// const { authentication } = require("../middlewares/authentication")

const notesController = Router()

// note api for getting data 
notesController.get("/getuser-notes", async (req, res) => {
    debugger;  
    const getnote = await NoteModel.find({ userId : req.body.userId })
    try {
        // const getnote = await NoteModel.find()
        return res.status(200).send({ msg: 'notes get successfully', data: getnote })  
        
    } catch (error) {  
        res.status(404).send({ msg: 'error', error})
    }
})

// note api for posting data
notesController.post("/user-notes", async (req, res) => {
    const {
        // id,
        title, 
        author, 
        isbn,
        publicationDate,
        userId   
    } = req.body;
   
    try {   
        const newNote = new NoteModel({
            // id,
            title,
            author,
            isbn,
            publicationDate,
            userId
        })
        const newNoteData = await newNote.save()
        res.status(200).send({ msg: "newNote created", newNoteData, status: "success" })
        
    } catch(error) {
        res.status(400).send({ msg: "something went wrong", error, status: "error" })
    }
})


// note api for updating/editing single data from userinterface and database also 
notesController.put('/update-user-notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedNotes = await NoteModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if(!updatedNotes) {
        return res.status(404).json({ status: 'error', msg: 'Notes not found' });
      }
  
      return res.status(200).json({ status: 'success', msg: 'Notes data updated successfully', data: updatedNotes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
  });

  // note api for deleting specific data 
  notesController.delete('/delete-notes-data/:id', async (req, res) => {    
    try {
      const { id } = req.params;
  
      const deletedNotes = await NoteModel.findByIdAndRemove(id);
  
      if (!deletedNotes) {
        return res.status(404).json({ status: 'error', msg: 'Notes not found' });
      }
  
      return res.status(200).json({ status: 'success', msg: 'Notes deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', msg: 'Internal server error' });
    }
  });

module.exports = { notesController }