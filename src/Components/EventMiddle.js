import  Card  from "./Card";
import React, { useState, useEffect } from "react";
import SinglePost from "../Pages/SinglePost";
import { axios_auth } from "../Library/Library";

const EventMiddle = ({ loggedUserData }) => {
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
        const response = await axios_auth.get(`/api/v1/post/upcoming-events`);
        setPostDetails(response.data.result);
        setIsLoading(false);
        console.log(response.data.result);
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
          <div className="flex flex-col gap-y-3 mb-24">
            <div>
              <span className="font-poppins text-md font-bold text-usergreen">
Events
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
                    <Card
                      setShowModal={setShowModal}
                      updateState={updateState}
                      postData={val}
                      postOwner={val.postedBy}
                      loggedUserData={loggedUserData}
                    />
                  </div>
                </>
              ))
            )}
        </div>

        </div>
        {showModal ? (
          <SinglePost
            setShowModal={setShowModal}
            updateState={updateState}
            postData={selectedPostData}
            loggedUserData={loggedUserData}
          />
        ) : null}
      </div>
    </>
  );
};

export default EventMiddle;
