import axios from "axios";

const BASE_URL = "http://localhost:5000/api/comments";

export async function getComments(videoId) {
    const response = await axios.get(`${BASE_URL}/${videoId}`);
    return response.data.comments;
}

export async function addComment(videoId, text) {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${BASE_URL}/${videoId}`,
        { text },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.comment;
}
