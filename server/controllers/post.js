import Post from '../models/Post.js';
import User from '../models/User.js';
import cloudinary from 'cloudinary'

export const createPost = async(req,res)=>{
    try {

        const {
            caption,
            image
        } = req.body

        if(!image){
            return res.status(400).json({
                success: false,
                message: 'Image is required !'
            })
        }

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder: "posts"
        });

        const newPostData = {
            caption,
            image:{
                public_id:myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user._id
        };

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id)
        await user.save()

        res.status(201).json({
            success : true,
            message: "Post Created",
        });

    } catch (error) {
        res.status(500).json({success: false,message: error.message})
    }
}

export const likeAndUnlikePost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                successs:false,
                message: "Post not found"
            })
        }

        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index,1)
            await post.save()

            return res.status(200).json({
                success: true,
                message: "Post Unliked"
            })
        }else{
            post.likes.push(req.user._id);
            await post.save()
            return res.status(200).json({
                success:true,
                message: "Post Liked"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deletePost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)
        if (!post) {
          return res.status(404).json({
            successs: false,
            message: "Post not found",
          });
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        await post.deleteOne();

        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index,1)
        await user.save()

        res.status(200).json({
            success: true,
            message:"Post Deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getPostOfFollowing = async(req,res)=>{
    try {
        
        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following
            }
        })

        res.status(200).json({
            success: true,
            posts: posts.reverse(),
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const fetchUserPosts = async(req,res)=>{
    try {
        
        const {username} = req.params
        let user = await User.findOne({username})

        let posts = await Post.find({owner: user._id})

        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getPost = async(req,res)=>{
    try {
        const {id} = req.params
        let post = await Post.findById(id).populate('owner comments likes')

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateCaption = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(404).json({
              success: false,
              message: "Post not found",
            });
        }

        if(post.owner.toString() !== req.user._id.toString()){
            res.status(401).json({
              success: false,
              message: "Unauthorized",
            });
        }

        post.caption = req.body.caption;
        await post.save()
        res.status(200).json({
          success: true,
          message: "Post Updated",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const commentOnPost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            res.status(404).json({
              success: false,
              message: "Post not found",
            });
        }

        let commentIndex = -1

        post.comments.forEach((item,index)=>{
            if(item.user.toString() === req.user._id.toString()){
                commentIndex = index;
            }
        })

        if (commentIndex !== -1) {
          post.comments[commentIndex].comment = req.body.comment;
          await post.save();
          res.status(200).json({
            success: true,
            message: "Comment Updated",
          });
        } else {
          const newComment = {
            user: req.user._id,
            comment: req.body.comment,
          };

          post.comments.push(newComment);
          await post.save();
          res.status(200).json({
            success: true,
            message: "Comment Added",
          });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

export const deleteComment = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if(post.owner.toString() === req.user._id.toString()){

            if(!req.body.commentId){
                return res.status(400).json({
                    success: false,
                    message: "Comment Id is required"
                })
            }

            post.comments.forEach((item, index) => {
              if (item._id.toString() === req.body.commentId.toString()) {
                return post.comments.splice(index, 1);
              }
            });

            await post.save()

            return res.status(200).json({
                success: true,
                message: "Selected Comment has Deleted"
            })


        }else{

            post.comments.forEach((item, index) => {
              if (item.user.toString() === req.user._id.toString()) {
                return post.comments.splice(index,1)
              }
            });
            await post.save()

            return res.status(200).json({
              success: true,
              message: "Your comment has deleted",
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}