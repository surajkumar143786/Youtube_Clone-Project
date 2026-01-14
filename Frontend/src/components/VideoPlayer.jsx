import { useParams } from "react-router-dom";

/*VideoPlayer Component -- Displays a single video page*/
function VideoPlayer() {
    const { id } = useParams();

    return (
        <div className="max-w-4xl mx-auto">

            {/* Video Player */}
            <video controls className="w-full rounded-lg mb-4">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4"type="video/mp4"/>
            </video>

            {/* Video Title */}
            <h1 className="text-xl font-bold mb-1">Learn React in 30 Minutes</h1>

            {/* Video Meta */}
            <p className="text-gray-600 text-sm mb-3">15K views • Channel: Code with Suraj</p>

            {/* Like / Dislike Buttons */}
            <div className="flex gap-4 mb-6">
                <button className="px-4 py-1 border rounded-lg">👍 Like</button>
                <button className="px-4 py-1 border rounded-lg">👎 Dislike</button>
            </div>

            {/* Description */}
            <p className="text-sm mb-6">This video explains the basics of React in a simple and easy way.</p>

            {/* Comments Section */}
            <div>
                <h2 className="font-semibold mb-3">Comments</h2>

                {/* Add Comment UI */}
                <input type="text"placeholder="Add a comment..."className="w-full px-3 py-2 border rounded-lg mb-4"/>

                {/* Static Comment */}
                <div className="border-b pb-2 mb-2">
                    <p className="font-medium text-sm">Virat Kohli</p>
                    <p className="text-sm text-gray-700">Great video! Very helpful.</p>
                </div>
            </div>

        </div>
    );
}

export default VideoPlayer;
