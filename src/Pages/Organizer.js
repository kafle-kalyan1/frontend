import React, { useContext, useEffect, useState } from "react";
import MiddleSide from "../Components/MiddleSide";
import RightSide from "../Components/RightSide";
import LeftSide from "../Components/LeftSide";
import { UserContext } from "../Context/UserProfile";
import { Link } from "react-router-dom";
import OrganizeSide from "../Components/OrganizeSide";
import { axios_auth } from "../Library/Library";


const Organizer = () => {
  const { userDetails, fetchProfile } = useContext(UserContext);

  useEffect(() => {
    fetchProfile();
  }, []);



  return (
    <>
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
            <div className="flex items-center justify-center cursor-pointer">
              <Link to={`/profile`}>
                {userDetails && userDetails.profilePic ? (
                  <img
                    src={userDetails.profilePic}
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : userDetails && userDetails.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                )}
              </Link>
            </div>
          </div>
          <OrganizeSide loggedUserData={userDetails} />
          {/* right start  */}
          <RightSide loggedUserData={userDetails} />
          {/* right end  */}
        </div>
      </div>
    </>
  );
};

export default Organizer;
