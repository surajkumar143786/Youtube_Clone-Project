import Video from "../models/Video.model.js";
import Channel from "../models/Channel.model.js";

//create function for addVideo
async function addVideo(req,res){
try{

    //validation
    const { title, description, videoUrl,thumbnailUrl, category} = req.body;
    if (!title || !description || !videoUrl || !thumbnailUrl || !category){
        return res.status(400).json({message : "all fields are required"})
    }
    //check if user has channel
    const isChannel = await Channel.findOne({owner : req.user._id})
    if (!isChannel){
        return res.status(400).json({ message: "Create a channel before uploading videos"})
    }

    //create video
    const video = new Video(
        {
            title,
             description,
              videoUrl,
               thumbnailUrl,
                category,
                channel : isChannel._id,
            uploader: req.user._id
        }  
    )
    await video.save()
    
    return res.status(201).json({message : "video uploaded successfully"})

}catch(err){
    return res.status(500).json({message : "server error" , err:err.message})
}

}
export default addVideo;
