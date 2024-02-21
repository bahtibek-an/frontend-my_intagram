const {postModel,} = require('../models/Post.js')
const {commentModel} = require('../models/Comment.js')
const { body } = require('express-validator')


const getAllPosts = async(req,res)=> {
    try {
        const posts = await postModel.find().populate({
            path:'user'
        }).select('-img').exec()

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
const createPost = async (req, res) => {
    try {
        const file = req.file;

        if (!file.originalname) {
            return res.status(403).json({ message: 'Please upload a file!' });
        }


        const savedFile = await postModel.create({
            title:req.body.title,
            img: { name: file.originalname, data: file.buffer },
            user:req.userId
        });

        res.json({
            message: 'File uploaded successfully',
            file: savedFile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error!' });
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
        await post.save()
        await com.save()

        res.json(newComment)
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
                    path: 'user',
                    select:'-avatar'
                }
            })
            .select('-avatar')
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
            const likeArr = await postModel.findByIdAndUpdate(
                postId,
                {$push: {like:userId}},
                {new:true,select:'-img'}
            )  

            if(!likeArr){
                return res.status(404).json({
                    message:"404 Post not found"
                })
            }


            if (!likeArr.like) {
                likeArr.like = [];
            }


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
            const likeArr = await postModel.findByIdAndUpdate(
                postId,
                { $pull: { like: userId } },
                { new: true,select:'-img' }
            )  

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

            // const {img,...post} = likeArr;
            
            
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
    deletePost,
}