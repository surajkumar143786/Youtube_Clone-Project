import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { getComments, addComment } from "../services/commentService";

function VideoPlayer() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState("");

    // Fetch video
    useEffect(() => {
        async function fetchVideo() {
            try {
                const res = await axiosInstance.get(`/videos/${id}`);
                setVideo(res.data.video);
            } catch (err) {
                setError("Failed to load video");
            }
        }
        fetchVideo();
    }, [id]);

    // Fetch comments
    useEffect(() => {
        async function fetchComments() {
            const data = await getComments(id);
            setComments(data);
        }
        fetchComments();
    }, [id]);

    async function handleAddComment() {
        if (!commentText.trim()) return;

        await addComment(id, commentText);
        setCommentText("");

        const updated = await getComments(id);
        setComments(updated);
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    if (!video) {
        return <p className="text-center mt-10">Loading video...</p>;
    }

    // 🔑 HANDLE GOOGLE DRIVE VIDEO
    const isDriveLink = video.videoUrl?.includes("drive.google.com");

    const driveEmbedUrl = isDriveLink
        ? video.videoUrl
            .replace("/view", "/preview")
            .replace("file/d/", "file/d/")
        : null;

    return (
        <div className="max-w-4xl mx-auto">

            {/* VIDEO PLAYER */}
            {isDriveLink ? (
                <iframe
                    src={driveEmbedUrl}
                    allow="autoplay"
                    className="w-full h-[450px] rounded-lg mb-4"
                />
            ) : (
                <video
                    controls
                    autoPlay
                    className="w-full rounded-lg mb-4"
                    src={video.videoUrl}
                />
            )}

            <h1 className="text-xl font-bold mb-1">{video.title}</h1>

            <p className="text-gray-400 text-sm mb-3">
                {video.views} views • {video.channel?.channelName}
            </p>

            <p className="text-sm mb-6 text-gray-300">{video.description}</p>

            {/* COMMENTS */}
            <div>
                <h2 className="font-semibold mb-3">Comments</h2>

                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 rounded-lg mb-3"
                />

                <button
                    onClick={handleAddComment}
                    className="px-4 py-1 bg-blue-600 rounded-lg mb-4"
                >
                    Comment
                </button>

                {comments.map((comment) => (
                    <div key={comment._id} className="border-b border-zinc-700 pb-2 mb-2">
                        <p className="font-medium text-sm">
                            {comment.user?.userName}
                        </p>
                        <p className="text-sm text-gray-400">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoPlayer;
