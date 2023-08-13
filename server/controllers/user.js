import Post from '../models/Post.js';
import User from '../models/User.js'
import { sendEmail } from '../middlewares/sendEmail.js';
import crypto from 'crypto'

export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        let user = await User.findOne({email});

        if(user){
            return  res.status(400).json({success: false,message: "User already exists"})
        }
        user = await User.create({
          name,
          email,
          password,
          avatar: { public_id: "sample_id", url: "sample_url" },
        });

        const token = await user.generateToken();
        res
          .status(201)
          .cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
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
        res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "None",
            domain: "localhost",
            path: "/",
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

export const logout = async(req,res)=>{
  try {
    
    res.status(200).cookie("token",null,{expires: new Date(Date.now()),httpOnly: true})
    .json({
      success: true,
      message:"Logged out"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const followAndUnfollowUser = async(req,res)=>{
  try {

    const userToFollow = await User.findById(req.params.id)
    const loggedInUser = await User.findById(req.user._id)

    if(!userToFollow){
      return res.status(404).json({
        success: false,
        message: "User not Found"
      })
    }

    if(loggedInUser.following.includes(userToFollow._id)){
      
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id)
      loggedInUser.following.splice(indexfollowing,1)

      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id)
      userToFollow.followers.splice(indexfollowers, 1)

      await loggedInUser.save()
      await userToFollow.save()

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    }else{
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }

  } catch (error) {
    res.status(500).json({
      success : false,
      message: error.message
    })
  }
}

export const updatePassword = async(req,res)=>{
  try {
    
    const user = await User.findById(req.user._id).select("+password")

    const {oldPassword,newPassword} = req.body;

    if(!oldPassword && !newPassword){
      return res.status(400).json({
        success: false,
        message: "Please provide old password and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword)

    if(!isMatch){
      return  res.status(401).json({
        success: false,  
        message: "Incorrect Password"
      })
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const updateProfile = async(req,res)=>{
  try {
    
    const user = await User.findById(req.user._id)

    const {name,email} = req.body;

    if(name){
      user.name= name
    }

    if(email){
      user.email = email
    }

    //User Avatar todo

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteMyProfile = async(req,res)=>{
  try {
    
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id

    await user.deleteOne();

    //logout user after deleting profile
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })

    //Delete all posts of the user
    for(p of posts){
      const post = await Post.findById(p)
      await post.deleteOne()
    }

    //Removing user from followers following
    for(f of followers){
      const follower = await User.findById(f);

      const index = follower.following.indexOf(userId)
      follower.following.splice(index,1)
      await follower.save()
    }

    //Removing user from following's followers
    for(f of following){
      const follows = await User.findById(f);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    res.status(200).json({
      success: true,
      message:"Account Deleted Successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const myProfile = async(req,res)=>{
  try {
    
    const user = await User.findById(req.user._id).populate('posts');

    res.status(200).json({
      success: true,
      user,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getUserProfile = async(req,res)=>{
  try {
    
    const user = await User.findById(req.params.id).populate('posts');

    if(!user){
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllUsers = async(req,res)=>{
  try {
    
    const users = await User.find({ _id: { $ne: req.user._id } });

    res.status(200).json({
      success :true,
      users
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
}

export const forgotPassword = async(req,res)=>{
  try {
    
    const user = await User.findOne({email: req.body.email});

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    await user.save()

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`

    const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`

    try{
      await sendEmail({
        email: user.email,
        subject: 'Reset Password',
        message
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`
      })
    }catch(error){
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save()

      res.status(500).json({
        success: false,
        message: error.message
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const resetPassword = async(req,res)=>{
  try {
    
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
      return res.status(401).json({
        success: false,
        message: "Invalid Token or expired"
      })
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

