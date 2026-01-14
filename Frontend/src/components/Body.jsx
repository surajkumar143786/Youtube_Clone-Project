import { useState } from "react";
import VideoCard from "./VideoCard";


const videoArr = [
    {
        id: 1,
        title: "Learn React in 30 Minutes",
        views: 15000,
        category: "React",
        thumbnail:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    {
        id: 2,
        title: "JavaScript Basics for Beginners",
        views: 22000,
        category: "JavaScript",
        thumbnail:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
        id: 3,
        title: "CSS Flexbox Complete Guide",
        views: 18000,
        category: "CSS",
        thumbnail:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
];

function Body() {

    const [allVideos, setAllVideos] = useState(videoArr);

    /*Search function*/
    function searchVideo(text) {
        const searchedVideos = videoArr.filter((video) =>
            video.title.toLowerCase().includes(text.toLowerCase())
        );

        setAllVideos(searchedVideos);
    }

    /* Category filter*/
    function filterByCategory(category) {
        const categoryFiltered = videoArr.filter(
            (video) => video.category === category
        );

        setAllVideos(categoryFiltered);
    }

    /*Reset filter*/
    function resetVideos() {
        setAllVideos(videoArr);
    }

    return (
        <div className="px-4 py-2">

            {/* Heading */}
            <h1 className="font-bold text-2xl mb-4">
                Recommended Videos
            </h1>

            {/* Buttons + Search */}
            <div className="flex gap-3 mb-4 items-center">

                {/* Category buttons */}
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
                    onClick={resetVideos}
                    className="px-4 py-2 border rounded-lg"
                >
                    Reset
                </button>

                {/* Search box (same as Swiggy Search) */}
                <input
                    type="text"
                    placeholder="Search videos"
                    onChange={(e) => searchVideo(e.target.value)}
                    className="ml-auto px-3 py-2 border rounded-lg"
                />
            </div>

            {/* Video list */}
            <div className="flex flex-wrap gap-6">
                {allVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

        </div>
    );
}

export default Body;
