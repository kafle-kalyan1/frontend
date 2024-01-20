import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdEmojiEvents } from "react-icons/md";
import { RiOrganizationChart, RiRobotLine } from "react-icons/ri";
import axios from "axios";
import { RobotFilled, RobotOutlined } from "@ant-design/icons";
import logo from '../logo.svg'
axios.defaults.withCredentials = true;

const LeftSide = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className="hidden md:w-[25%] md:flex flex-col gap-y-10 sticky top-10 h-max">
        {/* logo */}
        <Link to="/">
          <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
           <img src={logo} className="w-44 h-24" alt="Logo" />
          </div>
        </Link>
        {/* icons  */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-start justify-center gap-y-6 select-none">
            <Link to="/">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <AiFillHome color="#44AE26" size={25} />
                </i>
                <span className="font-poppins">Home</span>
              </div>
            </Link>

            <Link to="/message">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <AiFillMessage color="#44AE26" size={25} />
                </i>
                <span className="font-poppins">Message</span>
              </div>
            </Link>

            <Link to="/events">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <MdEmojiEvents color="#44AE26" size={25} />
                </i>
                <span className="font-poppins">Events</span>
              </div>
            </Link>

            <Link to="/organizer">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <RiOrganizationChart color="#44AE26" size={25} />
                </i>
                <span className="font-poppins">Organizers</span>
              </div>
            </Link>

            <Link to="/predictor">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <RiRobotLine color="#44AE26" size={25} />
                </i>
                <span className="font-poppins">Predictor</span>
              </div>
            </Link>

            <div
              className="flex gap-x-4 items-center justify-center cursor-pointer"
              onClick={handleLogout}
            >
              <i>
                <MdLogout color="#44AE26" size={25} />
              </i>
              <span className="font-poppins">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
