import React, { useState, useEffect, useRef, useContext } from "react";
import { AiFillCloseCircle, AiTwotoneSave } from "react-icons/ai";
import { BiUpvote } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillSendCheckFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { axios_auth } from "../Library/Library";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "timeago.js";
import { UserContext } from "../Context/UserProfile";
// import parse from "html-react-parser";

const SinglePost = ({
  setShowModal,
  updateState,
  postData,
  loggedUserData,
}) => {
  const toastId = useRef(null);
  const [likeLength, setLikeLength] = useState(postData?.likes.length);
  const [updatedPostData, setUpdatedPostData] = useState(postData);
  const [updatedLoggedUserData, setUpdatedLoggedUsertData] =
    useState(loggedUserData);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState();
  const {userDetails} = useContext(UserContext)

  const closingHandler = (e) => {
    updateState(e, false);
    setShowModal(false);
  };

  const sendRequestComment = async () => {
    const res = await axios_auth
      .get(`/api/v1/post/${postData?._id}/comments`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequestComment().then((data) => setAllComment(data.comments));
  }, []);

  const likePostHandler = async () => {
    try {
      const response = await axios_auth.put(
        "/api/v1/post/like",
        { postId: postData?._id },
      );
      setUpdatedPostData(response.data.result); // update the state with new data
      setLikeLength(response.data.result.likes.length);
    } catch (error) {
      console.error(error);
    }
  };

  const unlikePostHandler = async () => {
    try {
      const response = await axios_auth.put(
        "/api/v1/post/unlike",
        { postId: postData?._id },
      );
      setUpdatedPostData(response.data.result); // update the state with new data
      setLikeLength(response.data.result.likes.length);
    } catch (error) {
      console.error(error);
    }
  };

  const commentHandler = async () => {
    const data = {
      postId: postData?._id,
      comment,
    };
    const createComment = async () => {
      try {
        const response = axios_auth.post(
          `/api/v1/post/${postData?._id}/comment`,
          data
        );
        toast.success("comment added successfully");
        console.log((await response).data.savedComment);
        sendRequestComment().then((data) => setAllComment(data.comments))
            } catch (error) {
        console.log("Error:", error);
      }
    };

    createComment();
  };

  console.log(postData);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:backdrop-blur-none backdrop-blur-md">
        <div className="relative my-6 mx-auto md:max-w-3xl w-[90%]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="flex gap-x-4">
                {postData && postData.postedBy.profilePic ? (
                  <img
                    src={postData.postedBy.profilePic}
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full"
                  />
                ) : postData && postData.postedBy.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="other-profile-pic"
                    className="w-[4rem] h-[4rem] rounded-full"
                  />
                )}
                <div className="flex flex-col gap-y-1">
                  <span className="text-sm font-poppins font-semibold">
                    {postData.postedBy.fullname}
                  </span>
                  <span className="text-xs font-thin">
                    {format(postData?.updatedAt)}
                  </span>
                </div>
              </div>
              <button className="p-1 ml-auto float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <AiFillCloseCircle color="red" onClick={closingHandler} />
              </button>
            </div>
            {/*body*/}
            <div className=" p-6 flex flex-col h-[20rem] w-full overflow-y-scroll">
              <div
                className={`flex flex-col md:flex-row md:h-full md:gap-x-6  ${
                  !postData.picture || !postData.content
                    ? "md:items-start md:justify-start"
                    : ""
                }`}
              >
                {postData.picture && (
                  <img
                    src={postData.picture}
                    alt="single-img"
                    className="md:w-[17.5rem] md:h-full bg-cover"
                    style={{ objectFit: "cover" }}
                  />
                )}

                <p className="my-4 pr-3 md:m-1 text-slate-500 text-lg leading-relaxed h-full  md:overflow-y-auto scrollbar select-none scrollbar-thumb-orange scrollbar-track-gray-100 scrollbar-w-1 overflow-y-scroll">
                  {postData.content}
                </p>
              </div>
              {/* comment section start  */}
              <div>
                <hr className="border-1 border-black my-5" />
                <div className="comment flex flex-col justify-center items-center">
                  <form className="w-full">
                    <div className="flex items-center border-b border-teal-500 py-2">
                      <input
                        className="appearance-none  border-none w-full text- mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins"
                        type="text"
                        placeholder="Add a comment ....."
                        aria-label="Full name"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex gap-x-5">
                        <BsFillSendCheckFill
                          size={25}
                          color="green"
                          onClick={commentHandler}
                          className="cursor-pointer"
                        />
                        <RxCross2
                          size={25}
                          color="red"
                          onClick={() => setComment("")}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {allComment &&
                  allComment.map((value) => (
                    <>
                      {/* comment start  */}
                      <div className="flex gap-2 mt-5 " key={value._id}>
                        {value && value.author.profilePic ? (
                          <img
                            src={value.author.profilePic}
                            alt="other-profile-pic"
                            className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] rounded-full"
                          />
                        ) : value && value.author.gender === "male" ? (
                          <img
                            src="../assets/images/male-avatar.png"
                            alt="other-profile-pic"
                            className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] rounded-full"
                          />
                        ) : (
                          <img
                            src="../assets/images/female-avatar.png"
                            alt="other-profile-pic"
                            className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] rounded-full"
                          />
                        )}

                        <div className="flex flex-col w-full py-2 bg-white rounded-lg  shadow-2xl">
                          <div className="flex  ml-4 justify-between">
                            <span className="tracking-wider font-bold text-xs mt-2 cursor-pointer">
                              {value.author.username}
                            </span>
                            <span className="font-time text-xs mr-2 mt-2 cursor-pointer">
                              {format(value?.createdAt)}
                            </span>
                          </div>
                          <span className="mx-4 my-2 font-hotTopicsFont text-sm tracking-wider text-gray-500">
                            {value.body}
                          </span>
                        </div>
                      </div>
                      {/* comment end  */}
                    </>
                  ))}
              </div>
              {/* comment section end  */}
            </div>
            {/*footer*/}
            <div className="flex items-center gap-x-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                {updatedPostData.likes.includes(loggedUserData?._id) ? (
                  <BiUpvote
                    color="#f5190a"
                    size={25}
                    onClick={unlikePostHandler}
                  />
                ) : (
                  <BiUpvote
                    color="gray"
                    size={25}
                    onClick={likePostHandler}
                  />
                )}

                <span>{likeLength}</span>
              </div>
              <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                <FaCommentAlt color="gray" size={25} />
                <span>{allComment?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SinglePost;
