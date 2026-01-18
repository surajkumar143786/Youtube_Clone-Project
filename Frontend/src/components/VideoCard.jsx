import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/video/${video._id}`)}
            className="cursor-pointer transform transition duration-300 hover:scale-[1.03]"
        >
            <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-44 object-cover rounded-xl"
            />

            <div className="mt-2">
                <h3 className="text-sm font-semibold line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-400">
                    {video.channel?.channelName}
                </p>
                <p className="text-xs text-gray-400">
                    {(video.views ?? 0)} views
                </p>
            </div>
        </div>
    );
}

export default VideoCard;
