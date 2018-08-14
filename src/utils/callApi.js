import axios from "axios";
import { API_URL } from "./config";

export default function callApi(endPoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endPoint}`,
        data: body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export function callApiFormData(endPoint, method = "GET", body) {
    const data = new FormData();
    for (const field in body) {
        data.append(field, body[field]);
    }

    return axios({
        method: method,
        url: `${API_URL}/${endPoint}`,
        data: data,
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        }
    });
}
