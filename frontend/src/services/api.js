import axios from "axios";

const API_URL = "http://localhost:8080/api/welfare";

export const checkEligibility = (data) => {
  return axios.post(`${API_URL}/check-eligibility`, data);
};
