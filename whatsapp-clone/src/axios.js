import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:2704',
})

export default instance;