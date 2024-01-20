import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { axios_auth } from "../Library/Library";
import { UserContext } from "../Context/UserProfile";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const Suggestions = ({ suggestedUserProfile }) => {
  const { userDetails, fetchProfile } = useContext(UserContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  //   add to conversation
  const addConversationHandler = async () => {
    await axios_auth
      .post(
        `/api/v1/message/conversation`,
        {
          senderId: userDetails?._id,
          receiverId: suggestedUserProfile._id,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("Successfully Added!, Now you can chat");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <div className="flex flex-row gap-x-1 w-full p-3 space-x-2 rounded-md border border-black items-start justify-end select-none">
        <div className="w-[15%] =">
          <div to={`/profile/${suggestedUserProfile._id}`}>
            {suggestedUserProfile && suggestedUserProfile.profilePic ? (
              <img
                src={suggestedUserProfile.profilePic}
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            ) : suggestedUserProfile.gender === "male" ? (
              <img
                src="./assets/images/male-avatar.png"
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            ) : (
              <img
                src="./assets/images/female-avatar.png"
                alt="suggestion"
                className="w-[3rem] h-[3rem]  max-[1067px]:w-[2rem]  max-[1067px]:h-[2rem] rounded-full"
              />
            )}
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-y-1">
          <span className="text-sm font-poppins font-semibold overflow-x-hidden  max-[1067px]:text-xs">
            {suggestedUserProfile.username}
          </span>
          <span className="text-sm text-userblue font-poppins font-semibold overflow-x-hidden  max-[1067px]:text-xs">
            {suggestedUserProfile.who}
          </span>
        </div>
        <div className="w-[30%] flex flex-col gap-y-1">
          <button
            className="w-full h-8 bg-usergreen text-white rounded-md font-poppins font-semibold text-xs"
            onClick={addConversationHandler}
          >
            Ask a Question ?
          </button>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
