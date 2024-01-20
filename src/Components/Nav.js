import { useState } from "react";
import Navlinks from "./NavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAreaClick = (e) => {
    e.stopPropagation();
  };

  return (
    // nav section
  
      

    
   
    <nav className="w-[100%] flex justify-between items-center border-b-[0.5px] px-14 py-4 flex-shrink md:gap-6 lg:gap-0 top-0 z-50 fixed bg-usergreen">
      {/* logo div */}
      <div className="flex items-center cursor-pointer select-none" onClick={()=>{
        navigate("/")
      }}>
        <img src="https://www.freeiconspng.com/img/34784" alt="logo" className="w-[10rem] h-[3rem] select-none"/>
      </div>
<div className=" flex gap-8">
  
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {/* SEARCH IN SMALL SCREEN
        <div className="md:hidden flex">
          search
        </div> */}

        {/* hamburger menu */}
        <div
          className="md:hidden flex items-center justify-center "
          onClick={toggleMenu}
        >
          <AiOutlineMenu size={25} className="text-white"/>
          {isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end ">
              <div
                className="flex flex-col h-full w-64 bg-white animate__animated animate__fadeInRightBig"
                onClick={handleAreaClick}
              >
                {/* close menu */}
                <div className="flex  py-4 px-4 justify-between border-b-[.5px] ">
                  <button
                    className="text-txtLight w-5 h-5 hover:text-dark focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <AiOutlineClose className="text-lg" size={25}/>
                  </button>
                  {/* <User handleClick={handleAreaClick} /> */}
                  <FaUserAlt className="text-2xl"/>
                </div>
                {/* hamburger nav links */}
                <Navlinks
                  ulClassName={
                    "flex flex-col items-center gap-4 font-medium  py-4 px-8"
                  }
                  liClassName={
                    " flex text-userblue hover:text-userblue border-b-[.25px] border-txtLight border-opacity-20 pb-2 justify-center items-center w-[100%]"
                  }
                />
              </div>
            </div>
          )}
        </div>
        <Navlinks
          ulClassName={
            "hidden md:flex items-center flex-wrap md:gap-4 lg:gap-6 font-medium "
          }
          liClassName={
            "flex flex-row text-white md:text-sm lg:text-base hover:border-b-2  items-center"
          }
        />
      </div>

      <div className=" text-white cursor-pointer hidden md:flex md:gap-4 lg:gap-6">
       <FaUserAlt className="text-2xl"/>
      </div>
      
</div>
    </nav>
    
  );
}

export default Navbar;