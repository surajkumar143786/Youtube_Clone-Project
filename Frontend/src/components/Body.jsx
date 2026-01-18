import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";

function Body({ searchText }) {
    const [allVideos, setAllVideos] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await axios.get("http://localhost:5000/api/videos");
                setAllVideos(res.data.videos);
                setVideos(res.data.videos);
            } catch (err) {
                console.error("Failed to fetch videos");
            }
        }
        fetchVideos();
    }, []);

    useEffect(() => {
        if (!searchText) {
            setVideos(allVideos);
        } else {
            const filtered = allVideos.filter(video =>
                video.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setVideos(filtered);
        }
    }, [searchText, allVideos]);

    return (
        <div className="px-4 py-2 w-full">

            <h1 className="text-2xl font-bold mb-4">
                Recommended Videos
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map(video => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>

        </div>
    );
}

export default Body;
