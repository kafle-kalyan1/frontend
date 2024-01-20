import axios from "axios";


export const api_url = "http://localhost:8000";

console.log(localStorage.getItem("token"))

export const axios_auth = axios.create({
    baseURL: api_url,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  export const dateFormat = (date, includeDay = false) => {
    if (!date) return null;
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'short' });
    const day = d.getDate();
    const year = d.getFullYear();
    let dayOfWeek = null;
    if (includeDay) {
      dayOfWeek = d.toLocaleString('default', { weekday: 'short' });
    }
    return ` ${dayOfWeek? dayOfWeek+',':''} ${month} ${day}, ${year}`;
  };



