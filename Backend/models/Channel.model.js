import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
       channelName:{
        "type" : String,
        "required" : true,
        "trim" : true
       },
       description :{
        "type" : String,
        "default" : ""
       },
       channelBanner:{
        "type" : String,
           "default": ""
       },
       owner :{
        "type" : mongoose.Schema.Types.ObjectId,
        "ref" : "User", //reference to user model,
        "required" : true
       },
       subscribers :{
        "type" : Number,
        "default" : 0
       }
},
{timestamps : true}
)

const Channel = mongoose.model("Channel",channelSchema)
export default Channel;