function VideoCard({video}){
    return(
       <div className="w-72 cursor-pointer">
          {/* thumbnail */}
          <img
             src={video.thumbnail}
             alt="video thumbnail"
             className="w-full h-54 object-cover rounded-lg"
          />

       {/* video info */}
        <div className="mt-2">
          <h3 className="font-semibold text-sm">{video.title}</h3>
          <p className="text-gray-600 text-sm">{video.channel}</p>
          <p className="text-gray-500 text-xs">{video.views} views</p>
        </div>

       </div>
    )
}
export default VideoCard;