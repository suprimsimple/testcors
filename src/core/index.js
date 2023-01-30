import axios from "axios";
import { QueryClient } from "react-query";

const BASE_URL = "https://bssatestbookonline.sahealth.sa.gov.au/api"; // Replace by gateway

const apiClient = axios.create({
  // Replace with Env
  baseURL: BASE_URL,
  auth: {
    username: process.env.REACT_APP_API_USERNAME,
    password: process.env.REACT_APP_API_PASSWORD,
  },
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
