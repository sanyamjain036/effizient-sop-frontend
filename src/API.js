import axios from "axios";


// export const baseURL = "http://127.0.0.1:8080/api";
export const baseURL = "https://effizient-sop-backend.onrender.com/api";

const API = axios.create({
    baseURL: baseURL,
});


export const registerForm = (values) => {
    return API.post("/sopform/create", { formData: values });
};


export const getHLE = () => {
    return API.get("/hle");
};

