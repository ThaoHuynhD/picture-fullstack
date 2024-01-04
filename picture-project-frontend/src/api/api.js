import axios from "axios";
import { BASE_URL } from "./config";

export const getAllImg = () => {
    return axios.get(`${BASE_URL}/get-all-img`);
}