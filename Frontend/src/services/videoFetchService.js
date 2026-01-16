import axios from "axios";

const API_URL = "http://localhost:5000/api/videos";

/*
  Get all videos (Public API)
*/
export const getAllVideos = async () => {
    const response = await axios.get(API_URL);
    return response.data.videos;
};
