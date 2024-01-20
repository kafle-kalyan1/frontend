import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../Library/Library';
import { toast } from 'react-toastify';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [userDetails, setUserDetails] = useState(null);

   const fetchProfile = () =>{
      const acessToken = localStorage.getItem('token');

      if (acessToken) {
         axios.get(`${api_url}/api/v1/user/thegreenarea/verify`, {
            headers: {
               Authorization: `Bearer ${acessToken}`,
            },
         }).then((res) => {
            setUserDetails(res.data.user);
            localStorage.setItem('_id', (res.data.user._id));
         }).catch((err) => {
            toast.error(err)
         });
      }
      else{
         window.location.href = '/login';
      }
   }

   const updateUserDetails = (details) => {
      setUserDetails(details);
   };
   return (
      <UserContext.Provider value={{ fetchProfile,userDetails, updateUserDetails }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserContext, UserProvider };
