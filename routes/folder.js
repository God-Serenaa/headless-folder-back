const express = require("express");
const router = express.Router();
// const User = require('../models/userModel');
const Folder = require('../models/folderModel');

router.use(express.json());

router.get('/root', async (req, res) => {
    const root = await Folder.findOne({name: "root"});
    if (!root){
        const newRoot = new Folder({
            name: "root",
            children: []
        })
        const result = await newRoot.save();
        
        res.send({
            name: result.name,
            id: result._id,
            parentId: null,
            children: result.children
        })
    }else{
        res.send({
            name: root.name,
            id: root._id,
            parentId: null,
            children: root.children
        })
    }
})

router.get('/:id', async (req, res) => {
    const root = await Folder.findById(req.params.id).exec();
    let children = [];

    const promises = root.children.map(async child => {
        children.push(await getChild(child, root._id));
    });
    await Promise.all(promises);
    
    res.send(children);
});

async function getChild(id, parentId){
    const root = await Folder.findById(id).exec();
    return {
        name: root.name,
        id: root._id,
        parentId: parentId,
        children: root.children
    }
};

router.post('/:id', async (req, res) => {
    const newFolder = new Folder({
        name: req.body.name,
        children: []
    });
    const result = await newFolder.save();

    const parent = await Folder.findById(req.params.id);
    parent.children.push(result._id);
    const parentresult = await parent.save();

    res.send({
        name: result.name,
        id: result._id,
        parentId: parentresult._id,
        children: []
    });
});

router.delete('/:parent/:id', async (req, res) => {
    const result = await Folder.findById(req.params.id).exec();
    if (!result){
        res.send("folder doesn't exist");
    }
    await deleteChildren(result.children);
    await Folder.findByIdAndDelete(result._id);

    const parent = await Folder.findOneAndUpdate(
        {'_id': req.params.parent},
        {$pull: {children: req.params.id}}
    );

    res.send("successfully deleted");
});

async function deleteChildren(childrenList){
    const promises = childrenList.map(async id => {
        const fold = await Folder.findById(id);
        await deleteChildren(fold.children);
        await Folder.findByIdAndDelete(fold._id);
    })

    await Promise.all(promises);
}

module.exports = router