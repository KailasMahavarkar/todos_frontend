import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API || "http://localhost:2000";
export default axios;