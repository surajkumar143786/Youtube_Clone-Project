import Channel from "../models/Channel.model.js";

//creating channel
async function channelCreate(req,res){
   try {
    const {channelName , description} = req.body
    //validation
    if(!channelName){
        return res.status(400).json({message : "channelName is required"})
    }
       // Check if user already has a channel
       const channelExists = await Channel.findOne({ owner: req.user._id })
       if(channelExists){
        return res.status(400).json({message : "user already has a channel"})
       }

       // Create channel
       const newChanneCreate = new Channel({
        channelName,
        description,
        owner : req.user._id,
       })

       await newChanneCreate.save()

       res.status(201).json({message : "channel successfully created" , newChanneCreate})
 
    }catch(err){
        return res.status(500).json({message : "server error while creating channel" ,err : err.message})
    }
}
export default channelCreate;