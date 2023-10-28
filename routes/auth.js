// const express = require("express");
// const router = express.Router();
// const User = require('../models/userModel');
// const Folder = require("../models/folderModel")

// router.use(express.json());

// router.post('/', async (req, res) => {
//     const dupe = await User.findOne({username: req.body.username});
//     if (!dupe){
//         const newFolder = new Folder({
//             name: "root",
//             children: []
//         })
//         const root = await newFolder.save()

//         const newUser = new User({
//             username: req.body.username,
//             password: req.body.password,
//             root: root._id
//         });
//         const result = await newUser.save();
        
//         res.send({user: result, root: root});
//     }else{
//         res.status(400).send("username already exists");
//     }

// });

// router.post('/get-token/', async (req, res) => {
//     const user = await User.findOne({username: req.body.username});
//     if (!user){
//         res.status(404).send("user doesn't exist");
//     }else{
//         if (req.body.password === user.password){
//             const token = user.username;
//             res.send({
//                 username: user.username,
//                 accessToken: token
//             });
//         }else{
//             res.status(400).send("wrong password");
//         };
//     };
// })

// module.exports = router