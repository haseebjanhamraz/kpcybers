import axios from "axios";
import { useParams } from "next/navigation";

// Hook to get all services data from the database
export const useServices = async () => {
    const response = await axios.get('/api/services/');
    const data = response.data;
    return data;
}

export const useSingleService = async (id: string) => {
    const response = await axios.get(`/api/services/${id}`);
    const data = response.data;
    return data;
}