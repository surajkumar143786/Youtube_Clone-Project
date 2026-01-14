import axios from "axios";

const API_URL = "http://localhost:5000/api/channels"

// Create channel API(Protected)
async function createChannel(channelData) {
    const token = localStorage.getItem("token")

    const response = await axios.post(
        API_URL,
        channelData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    return response.data
}

export default createChannel;