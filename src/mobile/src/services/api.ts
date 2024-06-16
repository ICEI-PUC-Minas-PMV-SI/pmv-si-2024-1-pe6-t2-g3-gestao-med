import axios from "axios";



const api = axios.create({
    // baseURL:'http://localhost:3333'
    baseURL: 'http://192.168.18.247:3333'
})

export { api }


