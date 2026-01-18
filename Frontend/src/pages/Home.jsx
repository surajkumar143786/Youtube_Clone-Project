import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";

function Home() {
    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState("All");
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");

    useEffect(() => {
        async function fetchVideos() {
            try {
                let url = "/videos";
                const params = [];

                if (searchQuery) params.push(`search=${searchQuery}`);
                if (category !== "All") params.push(`category=${category}`);
                if (params.length) url += `?${params.join("&")}`;

                const res = await axiosInstance.get(url);
                setVideos(res.data.videos || []);
            } catch (err) {
                console.error("Failed to fetch videos");
            }
        }
        fetchVideos();
    }, [searchQuery, category]);

    return (
        <div>
            <FilterBar active={category} setActive={setCategory} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))
                ) : (
                    <p className="text-gray-400">No videos found</p>
                )}
            </div>
        </div>
    );
}

export default Home;
