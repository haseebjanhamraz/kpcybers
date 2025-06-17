import axios from "axios";

export const useServices = async () => {
    try {
        const response = await axios.get('/api/services');
        const data = response.data;
        const plans = data.map((service: any) => service.service_plans.plans);
        const features = data.map((service: any) => service.service_plans.features);
        const service = data.map((service: any) => service.service_plans.service);
        const service_plans = data.map((service: any) => service.service_plans);
        console.log(plans[0]);
        console.log(features[0]);
        console.log(service[0]);
        console.log(service_plans[0]);
        return { plans, features, service, service_plans };
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}