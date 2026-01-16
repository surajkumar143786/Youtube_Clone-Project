import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";

/*
  Body Component
  - Home page
  - Fetches videos from backend
  - Supports search, category filter, reset
*/
function Body() {

    // Stores all videos fetched from backend
    const [allVideos, setAllVideos] = useState([]);

    // Controls which videos are displayed on UI
    const [videos, setVideos] = useState([]);

    /*
      Fetch videos when page loads
    */
    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/videos"
                );

                // Backend returns videos array
                setAllVideos(response.data.videos);
                setVideos(response.data.videos);
            } catch (error) {
                console.error("Failed to fetch videos");
            }
        }

        fetchVideos();
    }, []);

    /*
      Search videos by title
    */
    function handleSearch(searchText) {
        const filteredVideos = allVideos.filter((video) =>
            video.title.toLowerCase().includes(searchText.toLowerCase())
        );

        setVideos(filteredVideos);
    }

    /*
      Filter videos by category
    */
    function filterByCategory(category) {
        const filteredVideos = allVideos.filter(
            (video) => video.category === category
        );

        setVideos(filteredVideos);
    }

    /*
      Reset all filters
    */
    function resetFilters() {
        setVideos(allVideos);
    }

    return (
        <div className="px-4 py-2">

            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-4">
                Recommended Videos
            </h1>

            {/* Search and Filter Section */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">

                {/* Category Filters */}
                <button
                    onClick={() => filterByCategory("React")}
                    className="px-4 py-2 border rounded-lg"
                >
                    React
                </button>

                <button
                    onClick={() => filterByCategory("JavaScript")}
                    className="px-4 py-2 border rounded-lg"
                >
                    JavaScript
                </button>

                <button
                    onClick={() => filterByCategory("CSS")}
                    className="px-4 py-2 border rounded-lg"
                >
                    CSS
                </button>

                <button
                    onClick={() => filterByCategory("MERN")}
                    className="px-4 py-2 border rounded-lg"
                >
                    MERN
                </button>

                <button
                    onClick={resetFilters}
                    className="px-4 py-2 border rounded-lg"
                >
                    Reset
                </button>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search videos"
                    onChange={(e) => handleSearch(e.target.value)}
                    className="ml-auto px-3 py-2 border rounded-lg outline-none"
                />
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>

        </div>
    );
}

export default Body;
