import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
   const navigate = useNavigate();

   return (
      <div
         onClick={() => navigate(`/watch/${video._id}`)}
         className="`w-[300px]` cursor-pointer"
      >
         {/* Thumbnail */}
         <div className="w-full `h-[170px]` bg-gray-200 rounded-xl overflow-hidden">
            <img
               src={video.thumbnailUrl}
               alt="video thumbnail"
               className="w-full h-full object-cover"
            />
         </div>

         {/* Info */}
         <div className="mt-3">
            <h3 className="font-semibold text-sm line-clamp-2">
               {video.title}
            </h3>

            <p className="text-gray-600 text-sm mt-1">
               {video.channel?.channelName}
            </p>

            <p className="text-gray-500 text-xs">
               {video.views} views
            </p>
         </div>
      </div>
   );
}

export default VideoCard;
