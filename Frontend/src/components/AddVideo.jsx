import { useState } from "react";
import { addVideo } from "../services/videoService";

/*
  AddVideo Component
  Allows channel owner to add a video
  */
function AddVideo() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        category: "",
    });

    /*
      Handle input change
    */
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    /*
      Handle add video
    */
    async function handleAddVideo() {
        try {
            await addVideo(formData);
            alert("Video added successfully");
        } catch (error) {
            alert(
                error.response?.data?.message || "Video upload failed"
            );
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">
                Add Video
            </h1>

            <input
                type="text"
                name="title"
                placeholder="Video Title"
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <textarea
                name="description"
                placeholder="Video Description"
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <input
                type="text"
                name="thumbnailUrl"
                placeholder="Thumbnail URL"
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />

            <input
                type="text"
                name="category"
                placeholder="Category (React, JS, CSS...)"
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded-lg"
            />

            <button
                onClick={handleAddVideo}
                className="w-full py-2 bg-green-600 text-white rounded-lg"
            >
                Add Video
            </button>

        </div>
    );
}

export default AddVideo;
