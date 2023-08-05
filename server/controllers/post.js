import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async(req,res)=>{
    try {

        const {
            caption
        } = req.body

        const newPostData = {
            caption,
            image:{
                public_id:"public id",
                url: "url of image"
            },
            owner: req.user._id
        };

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id)
        await user.save()

        res.status(201).json({
            success : true,
            post: newPost,
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
            posts,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}