import { apiClient, queryClient } from "../index";

export const searchSuburbsOrPostCode = async (query) => {
  const payloads = {
    suburbOrPostcode: query,
  };
  return apiClient.post("/Bookings/Suburbs", payloads).then((res) => res.data);
};
