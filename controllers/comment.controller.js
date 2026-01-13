import Comment from "../models/Comment.model.js";

//add comment to a video
async function addComment(req,res){
   try { const {text} = req.body;
    const {videoId} = req.params
    //validation
    if(!text){
        return res.status(400).json({message : "comment is required"})
    }

    //create comment
    const commentCreate = new Comment({
        text,
        video : videoId,
        user : req.user._id
    })

await commentCreate.save()
return res.status(200).json({message : "comment added successfully"})

}catch(err){
    return res.status(500).json({message : "server err during comment",err : err.message})
}

}

// Get comments for a video
async function getCommentsByVideo(req,res){
    try{
        const {videoId} = req.params
        const comments = await Comment.find({video : videoId})
        .populate("user","userName")
        .sort({createAT : -1})

        return res.status(200).json({count : comments.length,comments})


    }catch(err){
        return res.status(500).json({message : "server error while getting comments by video",err:err.message})
    }
}

//update comment
async function updateComment(req,res){
   try{ const {text} = req.body
    const {commentId} = req.params
    const comment = await Comment.findById(commentId)
    if(!comment){
        return res.status(404).json({message : "comment not found"})
    }


    // Allow only owner to edit
    if(comment.user.toString() !== req.user._id.toString()){
        return res.status(403).json({message : "not allow to edit this comment"})
    }
    comment.text = text || comment.text
    await comment.save()
}catch(err){
    return res.status(500).json({message : "server error while editing comment",err:err.message})
}
}

// Delete comment
async function deleteComment(req,res){
   try {const {commentId} = req.params
    const comment = await findById(commentId)
    if(!comment){
        return res.status(404).json({message : "comment not found"})
    }
    // Allow only owner to delete
    if(comment.user.toString() !== req.user._id.toString()){
        return res.status(403).json({ message: "not allow to delete this comment" })
    }
    await comment.deleteOne()
    return res.status(200).json({message : "comment deleted successfully"})

}catch(err){
    return res.status(500).json({message : "server error while deleting comment",err:err.message})
}
}

export {addComment ,getCommentsByVideo ,updateComment,deleteComment}