import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UpComingEvent from "./UpComingEvent";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Suggestion from "./Suggestion";

axios.defaults.withCredentials = true;

const RightSide = ({ loggedUserData }) => {
  console.log("right side", loggedUserData);
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [isProfieLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    if (loggedUserData) {
      setIsProfileLoading(false);
    }
  }, []);

  return (
    <>
      <div className="hidden md:w-[30%] md:flex flex-col gap-y-16 sticky top-10 h-max items-center justify-center p-5 select-none">
        {/* for profile  */}
        <div className="flex gap-x-4">
          {isProfieLoading && loggedUserData == undefined ? (
            // <Skeleton circle width={100} height={100} />
            <h1>Loading...</h1>
          ) : (
            <Link to="/profile">
              {loggedUserData && loggedUserData.profilePic ? (
                <img
                  src={loggedUserData.profilePic}
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              ) : loggedUserData && loggedUserData.gender === "male" ? (
                <img
                  src="../assets/images/male-avatar.png"
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              ) : (
                <img
                  src="../assets/images/female-avatar.png"
                  alt="profile"
                  className="md:w-[4rem] xl:w-[5rem] xl:h-[5rem] md:h-[4rem] rounded-full border-solid border-2 border-blue-500"
                />
              )}
            </Link>
          )}
          <div className="flex flex-col gap-y-1">
            <span className="text-sm font-semibold">
              {loggedUserData && loggedUserData.fullname}
            </span>
            <span className="text-xs font-poppins font-semibold">
              {loggedUserData && loggedUserData.username}
            </span>
            <span className="text-md text-usergreen font-poppins font-semibold">
              {loggedUserData && loggedUserData.role}
            </span>
          </div>
        </div>
        {/* upcoming event  */}

        <div className="flex flex-col gap-y-4 items-center justify-end">
          <div className="w-full flex items-center justify-center gap-x-10">
            <span className="text-sm font-semibold font-poppins">
              Upcoming Event
            </span>
            <span onClick={()=>navigate('/events')} className="text-xs text-orange  max-[1067px]:hidden">
              View All
            </span>
          </div>
          <div className="flex flex-col w-[100%]">
            <UpComingEvent />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
