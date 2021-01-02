import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-7e003/us-central1/api'
    // baseURL: 'https://us-central1-challenge-7e003.cloudfunctions.net/api'
})

export default instance

//http://localhost:5001/challenge-7e003/us-central1/api