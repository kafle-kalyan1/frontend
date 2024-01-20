import React, { useState, useRef, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiPhoto } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axios_auth } from "../Library/Library";
import { DatePicker, Input, Select } from "antd";
import MapPicker from "react-google-map-picker";
import { UserContext } from "../Context/UserProfile";
import { district } from "./Districts";
const DefaultZoom = 10;
const DefaultLocation = {
  lat: 26.7935883,
  lng: 87.2927818  }

const UserCreate = ({ props, loggedUserData,setIsCreate }) => {
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState(null);
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState();
  const [defaultLocation, setDefaultLocation] = useState();
  const [zoom, setZoom] = useState(DefaultZoom);
  const {userDetails} = useContext(UserContext)

  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImg(changeEvent.target.files[0]);
  }

  async function imageUpload() {
    console.log("hellotoat");
    try {
      const isEvent = userDetails.role == 'staff' ? true : false

      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "rijoqnuu");
      data.append("cloud_name", "dcnm2ql9y");

      toast.info("Uploading Images");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcnm2ql9y/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();
      console.log(res2);
      if (res2.error) {
        console.log("something went wrong");
      } else {
        let x = res2.url;
        const data = {
          picture: x,
          content,
          location,
          datePick:date,
          isEvent
        };

        const createPost = async () => {
          try {
            const response = axios_auth.post("/api/v1/post/createPost", data).then(()=>window.location.reload());
            toast.success("Post added successfully");
            
          } catch (error) {
            console.log("Error:", error);
          }
        };

        createPost();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmitPost = () => {
    console.log(img)
    if (img) {
      imageUpload();
    } else {
      const data = {
        content,
        
      };
    }
  };

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleResetLocation(){
    setDefaultLocation({ ... {
      lat: 26.7935883,
      lng: 87.2927818,
      zoom: 13,
    }});
    setZoom(DefaultZoom);
  }


  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-screen lg:h-screen pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          {/* search button */}
          <div className="w-[15rem] md:w-[40rem] flex items-center justify-center ">
            <span className="font-poppins font-bold leading-relaxed text-lg">
              Create post
            </span>
          </div>
          <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
            <AiOutlineClose
              size={25}
              className="text-red-900 block cursor-pointer"
            />
          </i>
        </div>
        {/* header end  */}
        {/* body start  */}
        <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
          <label htmlFor="postimg-input" className="cursor-pointer">
            <HiPhoto size={25} color="#f5190a" />
          </label>
          <input
            type="file"
            name="postImg"
            id="postimg-input"
            onChange={handleOnChange}
            style={{ display: "none" }}
          />
          {imageSrc ? (
            <>
              <div className="w-[100%] ">
                <img src={imageSrc} className="w-[22rem] rounded-b-md" />
              </div>
            </>
          ) : (
            ""
          )}
          {/* <TextEditor setContent={setContent} /> */}

          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-orange resize-none"
            placeholder="Write your thoughts here..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

         {
          userDetails.role === 'staff'?  <DatePicker 
          className="w-full"
          onChange={(e)=>{setDate(e);debugger}}
          value={date}
          />
          : <></>
         }
                    {/* <MapPicker defaultLocation={{
  lat: 26.7935883,
  lng: 87.2927818  }}
    mapTypeId="roadmap"
    zoom={zoom}
    style={{height:'400px'}}
    onChangeZoom={handleChangeZoom}
    onChangeLocation={handleChangeLocation} 
    apiKey='AIzaSyAsOiVFoj7et2Q8qKfbyPy-_nwVOCGpITg'/> */}
    <Select 
    showSearch
    placeholder="Location"
    className="w-full"
    onChange={(e)=>{setLocation(e);debugger}}
filterOption={district}
options={district}
    />
    

    

          <div
            className="w-full py-2 px-2 bg-usergreen font-poppins text-white rounded-md text-center cursor-pointer"
            onClick={handleSubmitPost}
          >
            <span>Post</span>
          </div>
        </div>
        {/* body end  */}
      </div>
    </>
  );
};

export default UserCreate;
