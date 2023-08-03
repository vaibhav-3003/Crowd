import Post from '../models/Post.js';


const createPost = async(req,res)=>{
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

        res.status(201).json({
            success : true,
            post: newPost,
        });



    } catch (error) {
        res.status(500).json({success: false,message: error.message})
    }
}

export {
    createPost
}