import axios from "axios";

export const useServices = async () => {
    const response = await axios.get('/api/services');
    const data = response.data;
    return data;
}