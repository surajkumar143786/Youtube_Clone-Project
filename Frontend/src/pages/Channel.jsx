import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Channel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    // Fetch user's channel
    const fetchChannel = async () => {
        try {
            const res = await axiosInstance.get("/channels/my");
            setChannel(res.data.channel);
            setVideos(res.data.videos || []);
        } catch (error) {
            setChannel(null);
        }
    };

    // Create channel
    const handleCreateChannel = async () => {
        if (!channelName.trim()) return;

        try {
            await axiosInstance.post("/channels", {
                channelName,
                description,
            });
            fetchChannel();
        } catch (error) {
            alert("Failed to create channel");
        }
    };

    // Delete video
    const handleDeleteVideo = async (videoId) => {
        if (!window.confirm("Delete this video?")) return;

        try {
            await axiosInstance.delete(`/videos/${videoId}`);
            fetchChannel();
        } catch (error) {
            alert("Failed to delete video");
        }
    };

    useEffect(() => {
        fetchChannel();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            {/* If channel does not exist */}
            {!channel ? (
                <div className="bg-zinc-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">
                        Create Your Channel
                    </h2>

                    <input
                        type="text"
                        placeholder="Channel Name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="w-full mb-3 px-4 py-2 bg-zinc-800 rounded"
                    />

                    <textarea
                        placeholder="Channel Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mb-3 px-4 py-2 bg-zinc-800 rounded"
                    />

                    <button
                        onClick={handleCreateChannel}
                        className="px-5 py-2 bg-blue-600 rounded"
                    >
                        Create Channel
                    </button>
                </div>
            ) : (
                <>
                    {/* Channel Header */}
                    <div className="bg-zinc-900 p-6 rounded-xl mb-6">
                        <h1 className="text-2xl font-semibold">
                            {channel.channelName}
                        </h1>
                        <p className="text-gray-400 mt-1">
                            {channel.description}
                        </p>
                    </div>

                    {/* Videos List */}
                    <h2 className="text-xl font-semibold mb-4">Your Videos</h2>

                    {videos.length === 0 ? (
                        <p className="text-gray-400">No videos uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {videos.map((video) => (
                                <div
                                    key={video._id}
                                    className="bg-zinc-900 p-3 rounded-xl"
                                >
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-36 object-cover rounded"
                                        onClick={() =>
                                            navigate(`/video/${video._id}`)
                                        }
                                    />

                                    <h3 className="mt-2 text-sm font-semibold">
                                        {video.title}
                                    </h3>

                                    <button
                                        onClick={() => handleDeleteVideo(video._id)}
                                        className="mt-2 text-red-500 text-sm"
                                    >
                                        Delete Video
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Channel;
