import a from "axios"

const axios = a.create({
    baseURL: "http://localhost:8081"
});

axios.interceptors.request.use(config => {
    if (config.url !== '/login' && config.url !== '/register') {
        const accessToken = JSON.parse(localStorage.getItem("user"))?.jwtToken;
        if (accessToken)
            config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;