const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const {auth} = require('./CheckAuth.js')
const {register,login,getMe,subscribe,getAllSubscribers,getUser,editUser,unSubscribe,getAllUsers,searchUser} = require('./controllers/UserController.js')
const {createPost,getAllPosts,getPost,addComment,getAllComment,like,Unlike,deletePost} = require('./controllers/PostController.js')
app.use(express.json())
const {registerValidation} = require('./Valdiation.js'); 

app.get('/', (req,res) => {
    res.send({
        message:"Hello World!"
    })
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
app.post('/post', auth, upload.single('image'), createPost);
  
    app.use(cors());
  
    
    app.get('/users',auth,getAllUsers)
    app.post('/search',auth,searchUser)
    app.post('/auth/login',login)
    app.post('/auth/register', registerValidation ,register)
    app.get('/auth/me',auth,getMe)
    app.get('/user/getUser/:id',auth,getUser);
    app.post('/delete/:id',auth,deletePost);
    app.post('/user/subscribe/:id',auth,subscribe)
    app.get('/user/getAllSubscriber/:id',auth,getAllSubscribers)
    app.post('/user/Unsubscribe/:id',auth,unSubscribe)


    app.post('/post/like/:id',auth,like)
    app.post('/post/Unlike/:id',auth,Unlike)

    app.get('/getPost/:id',auth,getPost);
    app.patch('/user/edit',auth,upload.single('avatar'),editUser)
    app.get('/post',auth,getAllPosts);
    app.post('/post/comment/:id',auth,addComment);
    app.get('/post/comment/:id',auth,getAllComment);




app.listen(4000,() => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/instagram?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB Ok");
    }).catch((e) => {
        console.log(e);
    }) 
    console.log("http://localhost:4000");
})