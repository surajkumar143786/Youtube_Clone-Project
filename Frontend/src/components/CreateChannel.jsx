import { useState } from "react";
import createChannel from "../services/channelService.js";


/*CreateChannel Component -- Allows logged-in user to create a channel*/
function CreateChannel() {
    const [formData, setFormData] = useState({
        channelName: "",
        description: "",
    });

    /*Handle input changes*/
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    /*Handle channel creation*/
    async function handleCreateChannel() {
        try {
            const data = await createChannel(formData);
            alert("Channel created successfully");
            console.log(data);
        } catch (error) {
            alert(
                error.response?.data?.message || "Channel creation failed"
            );
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 border rounded-lg p-6">

            <h1 className="text-2xl font-bold mb-4 text-center">Create Channel</h1>

            <input
                type="text"
                name="channelName"
                placeholder="Channel Name"
                onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded-lg"/>

            <textarea name="description" placeholder="Channel Description" onChange={handleChange} className="w-full mb-4 px-3 py-2 border rounded-lg"/>

        <button onClick={handleCreateChannel}className="w-full py-2 bg-blue-600 text-white rounded-lg">Create Channel</button>

        </div>
    );
}

export default CreateChannel;
