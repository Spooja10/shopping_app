import apiClient from "./api-client";

const setAuthToken = (token) => {
    if(token){
        apiClient.defaults.headers.coomon["x-auth-token"] = token   // "x-auth-token" name it based on token given in backend
    }else{
        delete apiClient.defaults.headers.coomon["x-auth-token"]
    }
}

export default setAuthToken;