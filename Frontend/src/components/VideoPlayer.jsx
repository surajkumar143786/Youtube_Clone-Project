import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getComments, addComment } from "../services/commentService";

function VideoPlayer() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    // Fetch video
    useEffect(() => {
        async function fetchVideo() {
            const response = await axios.get(
                `http://localhost:5000/api/videos/${id}`
            );
            setVideo(response.data.video);
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
        if (!commentText) return;

        await addComment(id, commentText);
        setCommentText("");

        const updatedComments = await getComments(id);
        setComments(updatedComments);
    }

    if (!video) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">

            <video
                controls
                className="w-full rounded-lg mb-4"
                src={video.videoUrl}
            />

            <h1 className="text-xl font-bold mb-1">
                {video.title}
            </h1>

            <p className="text-gray-600 text-sm mb-3">
                {video.views} views • {video.channel?.channelName}
            </p>

            <p className="text-sm mb-6">
                {video.description}
            </p>

            {/* COMMENTS */}
            <div>
                <h2 className="font-semibold mb-3">Comments</h2>

                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-3"
                />

                <button
                    onClick={handleAddComment}
                    className="px-4 py-1 border rounded-lg mb-4"
                >
                    Comment
                </button>

                {comments.map((comment) => (
                    <div key={comment._id} className="border-b pb-2 mb-2">
                        <p className="font-medium text-sm">
                            {comment.user?.userName}
                        </p>
                        <p className="text-sm text-gray-700">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default VideoPlayer;
