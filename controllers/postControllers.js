require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const GridFsBucket = mongodb.GridFSBucket;
const client = new MongoClient(process.env.DB_URL);
const postModel = require('../models/postModel');

let postController = {}

postController.post = async(req , res)=>{
    console.log(req.body);
    try{
        let newPost = await new postModel({
            ...req.body,
            image : `image/${req.file.filename}`
        })
        console.log(newPost);
        let result = await newPost.save();
        res.status(200).json({
            status:"Success",
            message:"Posted Successfully",
            result:result
        })
    }
    catch(err){
        res.status(400).json({
            status:"Failed",
            message: err.message
        })
    }
};

postController.get = async(req , res)=>{
    try{
        let allPosts = await postModel.find()
        res.status(200).json({
            status:"Success",
            result : allPosts
        })
    }
    catch(err){
        res.status(400).json({
        status:"Failed",
        message: err.message
    })
    }
}

postController.load = async(req , res) =>{
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = new GridFsBucket(db , {
            bucketName: process.env.DB_COLLECTION
        })
        const loadImage = collection.openDownloadStreamByName(req.params.name);
        loadImage.on("data" , data=> res.status(200).write(data));
        loadImage.on('error' , (err)=>{
            res.status(400).send({status:"Failed" , message:err.message})
        })
        loadImage.on("end" , ()=>{
            res.end();
        })
    }
    catch(err){
        res.status(500).send({
            status:"Server Error",
            message:err.message
        })
    }
}




module.exports = postController