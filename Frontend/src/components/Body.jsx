import { useState } from "react";
import VideoCard from "./VideoCard";

//   Static video data
const videoData = [
    {
        id: 1,
        title: "Learn React in 30 Minutes",
        category: "React",
        views: "15K",
        channel: "Code with Suraj",
        thumbnail:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    {
        id: 2,
        title: "JavaScript Basics for Beginners",
        category: "JavaScript",
        views: "22K",
        channel: "JS Mastery",
        thumbnail:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
        id: 3,
        title: "CSS Flexbox Complete Guide",
        category: "CSS",
        views: "18K",
        channel: "Frontend Hub",
        thumbnail:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
        id: 4,
        title: "Build MERN Stack Project from Scratch",
        category: "MERN",
        views: "9K",
        channel: "Tech World",
        thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
    {
        id: 5,
        title: "Node.js Crash Course",
        category: "Backend",
        views: "31K",
        channel: "Backend Dev",
        thumbnail:
            "https://images.unsplash.com/photo-1660054373740-b8fc241e35f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9kZS5qc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 6,
        title: "MongoDB Tutorial for Beginners",
        category: "Backend",
        views: "14K",
        channel: "Database School",
        thumbnail:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    },
    {
        id: 7,
        title: "Tailwind CSS Full Course",
        category: "CSS",
        views: "27K",
        channel: "UI Academy",
        thumbnail:
            "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
    },
    {
        id: 8,
        title: "React Router Explained Clearly",
        category: "React",
        views: "11K",
        channel: "React Simplified",
        thumbnail:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    },
    {
        id: 9,
        title: "API Integration using Axios",
        category: "JavaScript",
        views: "8K",
        channel: "Web Dev Notes",
        thumbnail:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
        id: 10,
        title: "Full Stack Project Architecture Explained",
        category: "MERN",
        views: "19K",
        channel: "Full Stack Mentor",
        thumbnail:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
];


function Body() {

    //   State that controls which videos are displayed on UI
    const [videos, setVideos] = useState(videoData);

    
    //   Filters videos based on search text (title)
    function handleSearch(searchText) {
        const filteredVideos = videoData.filter((video) =>
            video.title.toLowerCase().includes(searchText.toLowerCase())
        );

        setVideos(filteredVideos);
    }

    
    //   Filters videos based on selected category
    function filterByCategory(category) {
        const filteredVideos = videoData.filter(
            (video) => video.category === category
        );

        setVideos(filteredVideos);
    }


    //   Resets all filters and shows all videos
    function resetFilters() {
        setVideos(videoData);
    }

    return (
        <div className="px-4 py-2">

            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-4">
                Recommended Videos
            </h1>

            {/* Search and Filter Section */}
            <div className="flex items-center gap-3 mb-5">

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
            <div className="flex flex-wrap gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

        </div>
    );
}

export default Body;
