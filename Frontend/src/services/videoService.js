import axios from "axios";

const API_URL = "http://localhost:5000/api/videos";

/*Add video API (Protected)*/
export const addVideo = async (videoData) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        videoData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
