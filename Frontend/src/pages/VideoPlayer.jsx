import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

function VideoPlayer() {
    const { id } = useParams();
    const { user } = useAuth();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    // comments
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    // edit comment
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // suggested videos
    const [suggestedVideos, setSuggestedVideos] = useState([]);

    // fetch video
    async function fetchVideo() {
        try {
            const res = await axiosInstance.get(`/videos/${id}`);
            setVideo(res.data);

            if (res.data?.category) {
                const suggestRes = await axiosInstance.get(
                    `/videos?category=${res.data.category}`
                );
                setSuggestedVideos(
                    suggestRes.data.videos.filter((v) => v._id !== id)
                );
            }
        } catch (err) {
            console.error("Failed to fetch video", err);
        } finally {
            setLoading(false);
        }
    }

    // fetch comments
    async function fetchComments() {
        try {
            const res = await axiosInstance.get(`/comments/${id}`);
            setComments(res.data.comments || []);
        } catch (err) {
            console.error("Failed to fetch comments");
        }
    }

    // add comment
    async function addComment() {
        if (!commentText.trim()) return;

        try {
            await axiosInstance.post(`/comments/${id}`, {
                text: commentText,
            });
            setCommentText("");
            fetchComments();
        } catch (err) {
            alert("Login required to comment");
        }
    }

    // delete comment
    async function deleteComment(commentId) {
        try {
            await axiosInstance.delete(`/comments/${commentId}`);
            fetchComments();
        } catch (err) {
            alert("Not allowed");
        }
    }

    // update comment
    async function updateComment(commentId) {
        if (!editText.trim()) return;

        try {
            await axiosInstance.put(`/comments/${commentId}`, {
                text: editText,
            });
            setEditingId(null);
            setEditText("");
            fetchComments();
        } catch (err) {
            alert("Update failed");
        }
    }

    useEffect(() => {
        fetchVideo();
        fetchComments();
    }, [id]);

    if (loading) {
        return <p className="text-gray-400">Loading video...</p>;
    }

    if (!video) {
        return <p className="text-red-500">Video not found</p>;
    }

    const isDrive = video.videoUrl?.includes("drive.google.com");
    const driveUrl = isDrive
        ? video.videoUrl.replace("/view", "/preview")
        : null;

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT SIDE */}
            <div className="lg:w-3/4">
                {/* VIDEO */}
                {isDrive ? (
                    <iframe
                        src={driveUrl}
                        className="w-full h-[450px] rounded-xl"
                        allow="autoplay"
                    />
                ) : (
                    <video
                        src={video.videoUrl}
                        controls
                        className="w-full rounded-xl bg-black"
                    />
                )}

                <h1 className="text-xl font-semibold mt-3">
                    {video.title}
                </h1>

                <p className="text-sm text-gray-400">
                    {video.channel?.channelName || "Unknown Channel"}
                </p>

                <div className="flex gap-4 mt-3">
                    <span>👍 {video.likes ?? 0}</span>
                    <span>👎 {video.dislikes ?? 0}</span>
                </div>

                <div className="bg-zinc-900 p-3 rounded-xl mt-4">
                    <p className="text-sm">{video.description}</p>
                </div>

                {/* COMMENTS */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Comments</h2>

                    {user && (
                        <div className="flex gap-2 mb-4">
                            <input
                                value={commentText}
                                onChange={(e) =>
                                    setCommentText(e.target.value)
                                }
                                placeholder="Add a comment..."
                                className="flex-1 px-4 py-2 bg-zinc-800 rounded-full"
                            />
                            <button
                                onClick={addComment}
                                className="px-4 py-2 bg-blue-600 rounded-full"
                            >
                                Comment
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {comments.map((c) => {
                            const isOwner =
                                user &&
                                (c.user?._id === user._id ||
                                    c.user?.id === user._id);

                            return (
                                <div
                                    key={c._id}
                                    className="bg-zinc-900 p-3 rounded-lg"
                                >
                                    <p className="text-sm font-semibold">
                                        {c.user?.userName || "User"}
                                    </p>

                                    {editingId === c._id ? (
                                        <>
                                            <input
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                className="w-full px-3 py-1 bg-zinc-800 rounded mt-1"
                                            />
                                            <div className="flex gap-3 mt-2">
                                                <button
                                                    onClick={() =>
                                                        updateComment(c._id)
                                                    }
                                                    className="text-xs text-green-500"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setEditingId(null)
                                                    }
                                                    className="text-xs text-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-sm">{c.text}</p>
                                    )}

                                    {isOwner && (
                                        <div className="flex gap-3 mt-1">
                                            <button
                                                onClick={() => {
                                                    setEditingId(c._id);
                                                    setEditText(c.text);
                                                }}
                                                className="text-xs text-blue-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteComment(c._id)
                                                }
                                                className="text-xs text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:w-1/4 hidden lg:block">
                <h3 className="font-semibold mb-3">Suggested Videos</h3>
                <div className="flex flex-col gap-4">
                    {suggestedVideos.map((v) => (
                        <VideoCard key={v._id} video={v} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
