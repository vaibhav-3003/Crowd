import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        let user = await User.findOne({email});

        if(user){
            return  res.status(400).json({success: false,message: "User already exists"})
        }

        let hashPassword = await bcrypt.hash(password,10)

        user = await User.create({
          name,
          email,
        //   password:hashPassword,
          password,
          avatar: { public_id: "sample_id", url: "sample_url" },
        });

        res.status(201).json({success: true,user});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({
                success:false,
                message: "User does not exist"
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const token = await user.generateToken()
        res.status(200).cookie("token", token,{
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        })
        .json({
          success: true,
          user,
          token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

