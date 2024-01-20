import React, { useContext, useState } from 'react'
import LeftSide from '../Components/LeftSide'
import { Link } from 'react-router-dom'
import MiddleSide from '../Components/MiddleSide'
import RightSide from '../Components/RightSide'
import { UserContext } from '../Context/UserProfile'
import Button from '../Components/Button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showLoading } from '../Components/Loading'

const Predictor = () => {
   const {userDetails} = useContext(UserContext);
   const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [confiderScore, setConfiderScore] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = () => {
    showLoading(true);
   var response =  fetch('http://127.0.0.1:5000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({file: selectedImage})
})
.then(response => response.json())
.then(data => {
   setPredictionResult(data.prediction)
   setConfiderScore(data.confidence)
})
.catch(e => toast.error(e.message)).finally(()=>showLoading(false))

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
     <div className="flex items-center justify-center w-[50%] h-screen">
      <div className="flex flex-col gap-2 items-center justify-center p-2 h-56 w-72">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center px-4 py-2 h-56 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG, or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <Button text={"Predict"} onClick={handlePredict} />
        {predictionResult && (
         <>

          <div className="text-sm text-gray-700 mt-2">
            Prediction Result:  <span className='font-poppins text-md tracking-wider font-semibold text-usergreen ml-1'>
             {predictionResult}
            </span>
          </div>
          <div className="text-sm text-gray-700 mt-2">
            Confident Score:  
            <span className='font-poppins text-md tracking-wider font-semibold text-usergreen ml-1'>
            {confiderScore}
            </span>
          </div>
         </>
        )}
      </div>
    </div>
     {/* right start  */}
     <RightSide loggedUserData={userDetails} />
     {/* right end  */}
   </div>
 </div>
  )
}

export default Predictor