/*ChannelPage Component -- Displays channel details and uploaded videos*/
function ChannelPage() {
    return (
        <div className="max-w-5xl mx-auto">

            {/* Channel Header */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold">Code with Suraj</h1>
                <p className="text-gray-600 mt-1">Coding tutorials and MERN stack projects</p>
                <p className="text-sm text-gray-500 mt-1">5.2K subscribers</p>
            </div>

            {/* Channel Videos */}
            <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {/* Single Video Card */}
                <div className="border rounded-lg p-3">
                    <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80" alt="video thumbnail"className="w-full h-40 object-cover rounded-md mb-2"/>

                    <h3 className="font-medium text-sm mb-1">Learn React in 30 Minutes</h3>

                    <p className="text-xs text-gray-500 mb-2">15K views</p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border rounded-lg">Edit</button>
                        <button className="px-3 py-1 text-sm border rounded-lg text-red-600">Delete</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ChannelPage;
