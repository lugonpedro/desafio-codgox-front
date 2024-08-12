import axios from "axios";

const useApi = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json"
    }
});

export default useApi;
    