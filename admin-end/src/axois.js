import axios from "axios";
//import LocalStorageService from "./services/storage/localstorageservice";
//import router from "./router/router";

// LocalstorageService
//const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("admintoken");
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    const originalRequest = error.config;
    
    if(error.response.status === 401 && originalRequest.url === process.env.VUE_APP_ROOT_API + 'adminSignIn'){
        return Promise.reject(error);
    }
    if (error.response.status === 401 && originalRequest.url ===
        process.env.VUE_APP_ROOT_API + 'auth/refresh') {
        localStorage.setItem('admintoken', null);
       // this.$router.push({ name: 'login', query: { redirect: '/path' } });
        window.location = "./login";
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("admintoken");
        //console.log("Refresh Token"+refreshToken);
        return axios.post(process.env.VUE_APP_ROOT_API + 'auth/refresh', {
                "refresh_token": refreshToken
            })
            .then(res => {

                if (res.status === 201) {
                    const token = res.data.token;
                    console.log("Response Token "+token);
                    localStorage.setItem('admintoken', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }
            })
    }
    return Promise.reject(error);
});