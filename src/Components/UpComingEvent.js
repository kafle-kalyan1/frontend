import React, { useEffect, useState } from "react";
import { axios_auth, dateFormat } from "../Library/Library";

const UpComingEvent = () => {
  const [data, setData] = useState()

  const sendRequestComment = async () => {
    const res = await axios_auth
      .get('/api/v1/post/upcoming-events')
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequestComment().then((data) => setData(data.result));
  }, []);

  
  // useEffect(()=>{
  //   let response = axios_auth.get('/api/v1/post/upcoming-events')
  //   setData(response.data)
  //   console.log(response)
  // },[])
  return (
    <React.Fragment>
     {
      data && data.map((item,i) => (
        <div className="w-[100%] flex flex-row gap-x-1 p-3 my-2 space-x-2 items-start justify-end select-none border border-black rounded-md" key={item._id} >
        <div className="w-[100%] flex flex-col gap-y-2">
          <span className="text-xs">{dateFormat(item.datePick,true)}</span>
          <span className="text-sm font-poppins font-semibold overflow-x-hidden  max-[1067px]:text-xs line-clamp-3">
            {item.content}
          </span>
        </div>
      </div>
      ))
     }
    </React.Fragment>
  );
};

export default UpComingEvent;
