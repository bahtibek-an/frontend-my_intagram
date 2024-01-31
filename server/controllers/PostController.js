const  mongoose  = require('mongoose')
const {postModel,} = require('../models/Post.js')
const {commentModel} = require('./Comment.js')
const { body } = require('express-validator')
const getAllPosts = async(req,res)=> {
    try {
        const posts = await postModel.find().populate('user').exec()

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                message: "404 Posts not found"
            });
        }
        res.json(posts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"500 Internal Server Error"
        })
    }
}
const getPost = async(req,res) => {
    try {
        const postId = req.params.id;

        const post = await postModel.findById(postId).populate('user').exec();

        res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"500 Internal Server Error"
        })
    }
}
const createPost = async(req,res) => {
    try {
        // const userId = req.userId
        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
          }
        const doc = new postModel({
            title:req.body.title,
            img:`/uploads/${req.file.filename}`,
            user:req.userId
        })
        const post = await doc.save()

        res.json(post)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"500 Internal Server Error"
        })
    }
}

const addComment = async(req,res) => {
    try {
        const postId = req.params.id

        const com = new commentModel({
            comment:req.body.comment,
            user:req.userId
        })

        const post = await postModel.findById({_id:postId});
        const newComment = post.comments.push(com);
        const doc = await post.save()
        const comment = await com.save()

        res.json(doc)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"500 Internal Server Error"
        })
    }
}
const getAllComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel
            .findById(postId)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .populate('user')
            .exec();
        
        if (!post) {
            return res.status(404).json({
                message: "404 Post not found!"
            });
        }

        const comments =  post.comments;

        res.json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "500 Internal Server Error"
        });
    }
}
const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;

        const post = await postModel.findByIdAndDelete({_id:postId});

        if(!post){
            return res.status(404).json({
                message:"404 Post Not Found!"
            })
        }

        res.json({
            success:"true"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "500 Internal Server Error"
        });
    }
}

    const like = async(req,res) => {
        try {
            const postId = req.params.id;
            const userId = req.userId;
            const likeArr = await postModel.findByIdAndUpdate({_id:postId},{
                $set : { liked:"true" }
            },{
                new:true,
                returnDocument:'after'
            })  

            if(!likeArr){
                return res.status(404).json({
                    message:"404 Post not found"
                })
            }


            if (!likeArr.like) {
                likeArr.like = [];
            }

            
            likeArr.like.push(userId);

            await likeArr.save();

            res.json(likeArr)
        }catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "500 Internal Server Error"
            });
        }
    }
    const Unlike = async(req,res) => {
        try {
            const postId = req.params.id;
            const userId = req.userId;
            const likeArr = await postModel.findByIdAndUpdate({_id:postId},{
                $set : { liked:"false" }
            },{
                new:true,
                returnDocument:'after'
            })  

            if(!likeArr){
                return res.status(404).json({
                    message:"404 Post not found"
                })
            }


            if (!likeArr.like) {
                likeArr.like = [];
            }

            
            likeArr.like.pop(userId);

            await likeArr.save();
            
            res.json(likeArr)
        }catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "500 Internal Server Error"
            });
        }
    }

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    addComment,
    getAllComment,
    like,
    Unlike,
    deletePost
}