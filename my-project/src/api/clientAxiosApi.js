import axios from 'axios'

const axiosClient =axios.create({
    baseURL: "http://datn-server-production.up.railway.app/api/",
    withCredentials: true
})
export default axiosClient