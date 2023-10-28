const app = require('express')();
require('dotenv').config();
// const auth = require('./routes/auth');
const folder = require('./routes/folder');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Running MongoDB..."))
    .catch(err => console.log("Couldnt load MongoDB...", err));

// app.use('/api/auth', auth);
app.use('/api/folder', folder);

app.get("/",(req, res) =>{
    res.send("get help");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`running on port ${port}`));