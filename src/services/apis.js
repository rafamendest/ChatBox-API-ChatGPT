import axios from "axios";

export const Client = axios.create({
  headers: { Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}` },
});

