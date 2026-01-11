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
//add search and filter in video
async function getVideo(req,res){
   try {const { search, category } = req.query;
    // We create a dynamic filter object depending on what user sends
    let filter = {}

    //search by title(case sensitive)
    if(search){
        filter.title = ({$regex : search , $options : "i"})
    }
    // Filter by category
    if(category){
        filter.category = category;
    }

    // Fetch videos from DB
    const videos = await Video.find(filter)
    .populate("channel" , "channelName")
    .populate("uploader" , "userName")
    .sort({ createdAt: -1 }); // Latest videos first
     
       return res.status(200).json({ count: videos.length ,videos})
}catch(err){
    return res.status(500).json({message : "server error while fetch videos",err:err.message})
}
}


export  {addVideo,getVideo};
