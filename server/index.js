const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const {auth} = require('./CheckAuth.js')
const {register,login,getMe,subscribe,getAllSubscribers,getUser,editUser,unSubscribe,getAllUsers,searchUser, logout} = require('./controllers/UserController.js')
const {createPost,getAllPosts,getPost,addComment,getAllComment,like,Unlike,deletePost} = require('./controllers/PostController.js')
app.use(express.json())
const {UserModel}  = require('./models/User')
const {registerValidation} = require('./Valdiation.js'); 
const { postModel } = require('./models/Post.js');

app.get('/', (req,res) => {
    res.send({
        message:"Hello World!"
    })
})


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get('/image/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await postModel.findById(fileId);
        if (!file.img || !file.img.data) {
            return res.status(500).json({ message: 'Image data not found' });
          }
        const imgBuffer = Buffer.from(file.img.data, 'base64');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(file.img.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
});

app.get('/avatar/image/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await UserModel.findById(fileId);

        if (!file.avatar.img || !file.avatar.img.data) {
            return res.status(500).json({ message: 'Image data not found' });
        }
        const imgBuffer = Buffer.from(file.avatar.img.data.buffer);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imgBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image' });
    }
});

  

app.post('/post', auth,upload.single('file'),createPost);
  
    app.use(cors());
  
    
    app.get('/users',auth,getAllUsers)
    app.post('/search',auth,searchUser)
    app.post('/auth/login',login)
    app.post('/auth/register', registerValidation ,register)
    app.get('/auth/me',auth,getMe);
    app.post('/user/logout',auth,logout);
    app.get('/user/getUser/:id',auth,getUser);
    app.post('/delete/:id',auth,deletePost);
    app.post('/user/subscribe/:id',auth,subscribe)
    app.get('/user/getAllSubscriber/:id',auth,getAllSubscribers)
    app.post('/user/Unsubscribe/:id',auth,unSubscribe)


    app.post('/post/like/:id',auth,like)
    app.post('/post/Unlike/:id',auth,Unlike)

    app.get('/getPost/:id',auth,getPost);
    app.patch('/user/edit',auth,upload.single('file'),editUser)
    app.get('/post',auth,getAllPosts);
    app.post('/post/comment/:id',auth,addComment);
    app.get('/post/comment/:id',auth,getAllComment);
    app.post('/user/search/',auth,searchUser);



app.listen(4000,() => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/instagramS?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB Ok");
    }).catch((e) => {
        console.log(e);
    }) 
    console.log("http://localhost:4000");
})