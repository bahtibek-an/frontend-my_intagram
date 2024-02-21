const {UserModel} = require('../models/User.js');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')


const register = async(req,res) => {
    try {

        const password = req.body.password
        const salt     = await bcrypt.genSalt(10)
        const hash     = await bcrypt.hash(password,salt)


        const doc = new UserModel({
            name:req.body.name,
            passwordHash:hash
        })
        const name = await UserModel.findOne({name:req.body.name})

        if(name){
            return res.status(403).json({
                message:"Name arleady Used"
            })
        }

        const user = await doc.save();

        const token = jwt.sign(
            {
            _id:user._id
           
            },
        'secret123',
        {
            expiresIn:'30d'
        }
        )
        

        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(503).json(({
            message:"Error in Sign Up!"
        }))
    }
}

const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ name: req.body.name });

        if (!user) {
            return res.status(404).json({
                message: "404 User not found!"
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(403).json({
                message: "Incorrect login or password"
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getAllUsers = async(req,res) => {
    try {
        const users = await UserModel.find();
        res.json(users) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const searchUser = async(req,res) => {
    try {
        const user = await UserModel.findOne({ name : req.body.name }).select('-avatar');

        if (!user) {
            return res.status(404).json({
                message: "404 User not found!"
            });
        }

        res.json(user);

    } catch (error) {
        console.log("ERRROR IN SEARCH",error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getMe = async(req,res) => {
    try {
        const user = await UserModel.findById(req.userId).select('-avatar');

        if(!user){
            return res.status(404).json({
                message: "404 User not found!"
            });
        }

        const {passwordHash,...userData} = user._doc
        res.json(userData)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
const subscribe = async (req, res) => {
    try {
        const currentUserId = req.userId
        const targetUserId = req.params.id;


        const user = await UserModel.findByIdAndUpdate(
            {_id:targetUserId},
            {
              $push: { subscribers: currentUserId }
            },
            {
              new:true,
              returnDocument:'after'
            },
          );
          

        if (!user) {
            return res.status(404).json({
                message: "404 User not found!"
            });
        }


        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}




const getAllSubscribers = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "404 User not found!"
            });
        }
        const subscribers = user.subscribers

        if (!subscribers) {
            return res.status(404).json({
                message: "404 Subscribers not found!"
            });
        }

        res.json(subscribers);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
const getUser = async(req,res) => {
    try {
        const userId = req.params.id
        const user = await UserModel.findById({_id:userId})

        if(!user){
            return res.status(404).json({
                message: "404 User not found!"
            });
        }

        res.json(user)

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        }); 
    }
}

const editUser =  async(req,res)=> {
    try {
        const userId = req.userId
        const file  = req.file;
        const doc = await UserModel.findByIdAndUpdate({_id :userId }, {
            name:req.body.name,
            bio:req.body.bio,
            avatar:{
                img:{
                    name:file.originalname,
                    data:file.buffer
                }
            }
        },{
            new:true
        })
        // const uptadeUser = await UserModel.findById(userId);
        await doc.save();
        console.log('Updated User:', doc);

        res.json(doc)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        }); 
    }
}


const unSubscribe = async(req,res)=> {
    try {
        const currentUserId = req.userId
        const targetUserId = req.params.id
        const user = await UserModel.findByIdAndUpdate(            
            targetUserId,
            {
               $pull: { subscribers: currentUserId }
            },
            {
              new:true,
              returnDocument:'after'
            },)
            if(!user){
                return res.status(404).json({
                    message: "404 User not found!"
                });
            }
            res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        }); 
    }
}

const logout = async(req,res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message:'User not found!'
            })
        }

        user.accessToken = null;

        await user.save();

        return res.status(200).json({message:"Successful logouted!"});

    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    register,
    login,
    getMe,
    subscribe,
    getAllSubscribers,
    getUser,
    editUser,
    unSubscribe,
    getAllUsers,
    searchUser,
    logout
}