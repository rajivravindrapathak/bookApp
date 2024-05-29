const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema ({
    // id:{type: Number, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true},
    userId: {type: String, required: true},
    publicationDate: { type: Date, required: true }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
})

const NoteModel = mongoose.model("notes", noteSchema)

module.exports = { NoteModel }           