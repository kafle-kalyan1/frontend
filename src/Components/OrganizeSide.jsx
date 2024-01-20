import React, { useState, useEffect } from "react";
import { axios_auth } from "../Library/Library";
import Suggestions from "./Suggestions";

const OrganizeSide = ({userDetails}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);
  const [postDetails, setPostDetails] = useState([]);

  const updateState = (e, newState) => {
    e.preventDefault();
    setShowModal(newState);
    setStateChanged(!stateChanged);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios_auth.get(`/api/v1/user/staffs`);
        setPostDetails(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (e, postData) => {
    e.preventDefault();
    setSelectedPostData(postData);
  };


  return (
    <>
      {/* middle start  */}
      <div className="w-full md:w-[45%]">
        <div className="flex flex-col gap-y-4">
          {/* post div  */}
          <div className="flex flex-col gap-y-3 mb-24">
            <div>
              <span className="font-poppins text-md font-bold text-usergreen">
                Staffs or Organizer
              </span>
            </div>
            {isLoading ? (
              //   <Skeleton count={5} height={200} />
              <h1> Loading </h1>
            ) : (
              postDetails &&
              postDetails.map((val) => (
                <>
                  <div key={val._id} onClick={(e) => handleCardClick(e, val)}>
                    <Suggestions loggedUserData={userDetails} suggestedUserProfile={val} />
                    {/* <Card
                      setShowModal={setShowModal}
                      updateState={updateState}
                      postData={val}
                      postOwner={val.postedBy}
                      loggedUserData={loggedUserData}
                    /> */}
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizeSide;
