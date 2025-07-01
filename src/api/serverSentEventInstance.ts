import axios from "axios";

export const serverSentEventInstance = axios.create({
  baseURL: "http://localhost:5001", 
});