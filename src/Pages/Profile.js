import {React, useContext, useEffect, useLayoutEffect} from 'react';
import Button from '../Components/Button';
import { Modal, Input } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LeftSide from '../Components/LeftSide';
import { UserContext } from '../Context/UserProfile';
import { axios_auth } from '../Library/Library';
import { toast } from 'react-toastify';
import Card from '../Components/Card';
import SinglePost from './SinglePost';


export default function Profile() {
   const {userDetails, fetchProfile} = useContext(UserContext)
  const [post, setPost] = useState([]);
  const [showModal, setShowModal] = useState(false);
   const [updateState, setUpdateState] = useState(false);

  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [isUpcomingEventCardVisible, setIsUpcomingEventCardVisible] = useState(false);
  const [isRecentEventCardVisible, setIsRecentEventCardVisible] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);

 useEffect(() => {
   fetchProfile();
   }, []);

 useEffect(()=>{
  var userId = localStorage.getItem("_id")
      axios_auth.get('/api/v1/post/fetchMyPost/'+userId).then((res)=>{
         setPost(res.data)
      }
      ).catch((err)=>{
         toast.error(err.message)
      })
      
 },[])

  const showUpcomingEventCard = (event) => {
    setSelectedEvent(event);
    setIsUpcomingEventCardVisible(true);
  };

  const showRecentEventCard = (event) => {
    setSelectedEvent(event);
    setIsRecentEventCardVisible(true);
  };

  const handleCancel = () => {
    setIsUpcomingEventCardVisible(false);
    setIsRecentEventCardVisible(false);
  };






  const handleCardClick = (e, postData) => {
   e.preventDefault();
   setSelectedPostData(postData);
 };

 
  return (

   <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5">
   <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
     <LeftSide />
     {/* mobile view  */}
     <div className="md:hidden flex items-center justify-between pt-2 pb-4 sticky top-0 bg-white z-50">
       <div className="flex flex-col items-center justify-center cursor-pointer select-none">
         <span className="text-usergreen font-poppins font-bold text-base tracking-wide leading-relaxed">
           The Green
         </span>
         <span className="font-poppins text-black text-xs">Area</span>
       </div>
     </div>
    <div className="bg-gradient-to-b w-full min-h-screen flex items-start justify-center">
      <div className="bg-white flex flex-col rounded-lg shadow-md w-full lg:w-4/5 xl:w-3/4">
        <div className="bg-usergreen p-8 h-[10rem] text-white ">
        <div className="flex flex-col   gap-2 ">
          <div className="flex-shrink-0 flex items-center  gap-2">
            <img src={userDetails?.gender==='female'? "../assets/images/female-avatar.png" : "../assets/images/male-avatar.png"} alt="Profile" className="h-36 w-36 rounded-md shadow-md border-gray-400" />
            
            <div className="ml-4">
            <h5 className="text-sm md:text-xl font-bold">{userDetails?.username}</h5>
            <p className='text-sm md:text-lg font-thin'>{userDetails?.email}</p>
          </div>
          </div>

           {/* {
            post && post.length > 0 && post.map((post) => (
               <Card
                                modal={showModal}
   setShowModal={setShowModal}
   updateState={updateState}
   postData={post}
   postOwner={userDetails}
   loggedUserData={userDetails}
   />
            ))

           }

          </div>
        </div>
        
        <div className='p-8 flex flex-col gap-4'>

        {showModal ? (
          <SinglePost
            setShowModal={setShowModal}
            updateState={updateState}
            postData={selectedPostData}
            loggedUserData={userDetails}
          />
        ) : null}
        </div>
       */}

      </div>
      </div>
      </div>
    </div>
    </div>
      </div>
  );
}