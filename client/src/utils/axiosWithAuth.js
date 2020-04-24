import axios from 'axios'


//centralizes our requests to make life easier
export const axiosWithAuth = _ => {
    const token = localStorage.getItem("token")

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: "http://localhost:5000"
    })
}