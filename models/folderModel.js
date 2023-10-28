const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    name: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "folders"}]
});

const Model = mongoose.model('Folder', folderSchema);
module.exports = Model