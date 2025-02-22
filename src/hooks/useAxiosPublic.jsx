import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://task-manager-backend-eight-tau.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
