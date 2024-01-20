import React, { useState, useEffect } from "react";
// import SinglePost from "../pages/SinglePost";
// import Card from "./Card";
import axios from "axios";
import CreatePost from "./CreatePost";
import { api_url, axios_auth } from "../Library/Library";
import Card from "./Card";
import SinglePost from "../Pages/SinglePost";
// import Story from "./Story";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { getAllPost } from "../feature/postReducer";

const MiddleSide = ({ loggedUserData }) => {
  //   const dispatch = useDispatch();
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
        const response = await axios_auth.get(`/api/v1/post/getAllPost`);
        setPostDetails(response.data.result);
        setIsLoading(false);
        console.log(response.data.result);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [showModal]);

  const handleCardClick = (e, postData) => {
    e.preventDefault();
    setSelectedPostData(postData);
  };

  return (
    <>
      {/* middle start  */}
      <div className="w-full md:w-[45%]">
        <div className="flex flex-col gap-y-4">
          {/* <Story loggedUserData={loggedUserData} /> */}
          <CreatePost loggedUserData={loggedUserData} />
          {/* post div  */}
          <div className="flex flex-col gap-y-3 mb-24">
            {isLoading ? (
              //   <Skeleton count={5} height={200} />
              <h1> Loading </h1>
            ) : (
              postDetails &&
              postDetails.map((val) => (
                <>
                  <div key={val._id} onClick={(e) => handleCardClick(e, val)}>
                    <Card
                    modal={showModal}
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

export default MiddleSide;
