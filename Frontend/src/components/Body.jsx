import VideoCard from "./VideoCard";

/*Body Component (Home Page)*/
const videos = [
    {
        id: 1,
        title: "Learn React in 30 Minutes",
        channel: "Code with Suraj",
        views: "15K",
        thumbnail:
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&auto=format",
    },
    {
        id: 2,
        title: "JavaScript Basics for Beginners",
        channel: "JS Mastery",
        views: "22K",
        thumbnail:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format",
    },
    {
        id: 3,
        title: "Build MERN Stack Project",
        channel: "Tech World",
        views: "9K",
        thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format",
    },
    {
        id: 4,
        title: "CSS Flexbox in One Video",
        channel: "Frontend Hub",
        views: "18K",
        thumbnail:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format",
    },
];

/*
  Grid layout using Tailwind
*/
function Body() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
}

export default Body;
