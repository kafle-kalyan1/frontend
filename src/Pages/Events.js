import { useState } from "react";
import Navbar from "../Components/Nav";
import Search from "../Components/Search";
import { FaFilter } from "react-icons/fa";
import { events } from "../Components/EventsData";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import Button from "../Components/Button";

function EventsPage() {
    const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const [showAllevents, setShowAllevents] = useState(false);
  const toggleShowAllevents = () => {
    setShowAllevents(!showAllevents);
  };

  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <div className="pt-24 flex flex-col gap-4">
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            <Search />
            <div
              className="cursor-pointer text-gray-400 hover:text-userbluel"
              onClick={toggleOptions}
            >
              <FaFilter />
            </div>
            <Button type={"primary"} width={4} text={"Create Event"} onClick={()=> alert("aaa")} />
            {showOptions && (
              <div className="absolute z-1 mt-2 p-2 bg-white border border-gray-300 rounded shadow">
                {/* Your filter options go here */}
                <div className="py-1 hover:border-b-2 cursor-pointer">
                  Option 1
                </div>
                <div className="py-1 hover:border-b-2 cursor-pointer">
                  Option 2
                </div>
                <div className="py-1 hover:border-b-2 cursor-pointer">
                  Option 3
                </div>
                <div className="py-1 hover:border-b-2 cursor-pointer">
                  Option 4
                </div>
              </div>
            )}
          </div>
        </div>
        {/* events */}
        <div className="flex justify-center py-4">
          <div className="flex flex-col w-[75%]   gap-4 overflow-hidden">
            {events.length === 0 ? (
              <p className="text-txtLight">No events yet.</p>
            ) : (
              <ul className="list-reset flex flex-col gap-2 md:gap-4">
                {/* show at most 3 events firstly */}
                {events.slice(0, showAllevents ? undefined : 3).map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-wrap items-center gap-2  md:gap-4 p-2 "
                  >
                    <div className="flex gap-2 md:gap-4 items-center w-full shadow-md px-4 pt-2 ">
                      <div className=" flex flex-col gap-2 w-full ">
                        <div className="flex gap-2 justify-start flex-wrap">
                          <div className="w-2 h-2 md:w-[2rem] md:h-[2rem] rounded-full bg-gray-300 flex-shrink-0 object-cover overflow-hidden border-gray-300 border-2">
                            {" "}
                            <img
                              src={event.profileImg}
                              alt="user img"
                              className="w-full h-full"
                            />
                          </div>
                          <p className="cursor-pointer text-sm font-bold">
                            {event.organizer}
                          </p>
                         
                        </div>
                        <p className="break-words  p-2 md:p-3 rounded-md text-xs md:text-base font-serif leading-relaxed tracking-wide">
                          {event.post}
                          <img src={event.pic}/>
                          <div className="flex py-2 flex-row justify-between items-center text-gray-400">
                            {/* like and comment */}
                            <div className="flex flex-row gap-4">
                                <span className="flex flex-row gap-2 items-center">
                                    <AiOutlineLike onClick={handleClick} className= {`${isClicked ? "text-usergreen" : "text-gray-400"} cursor-pointer  hover:text-usergreen hover:text-opacity-50  text-xl `}/>
                                {event.likecounts}
                                </span>
                                <span className="flex flex-row gap-2 items-center">
                                    <GoComment className="cursor-pointer text-usergreen text-opacity-50 hover:text-opacity-100  text-xl  active:text-usergreen"/>
                                {event.comments}
                                </span>
                               
                            </div>
                            {/* location and datetime */}
                            <div className="flex items-center  gap-2 flex-row">
                              <p className="cursor-pointer hover:text-userblue">
                                {event.location}
                              </p>
                              <div className=" rounded w-1 h-1 bg-gray-400" />
                              <p className="cursor-pointer hover:text-userblue">
                                {event.datetime}
                              </p>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {/* Show "View All" button if there are more than 3 events */}
            <div className="flex justify-center w-full">

            {events.length > 3 && (
              <button
                onClick={toggleShowAllevents}
                className="bg-usergreen flex items-center hover:bg-usergreen_hover  focus:outline-none focus:bg-usergreen_hover cursor-pointer px-4 py-2 tracking-wide text-white transition-colors w-48 justify-center transform rounded-md  ease-linear  duration-100 shadow-md hover:shadow-lg"
              >
                {showAllevents ? "View Less" : "View All"}
                {showAllevents ? (
                  <BiChevronUp className="text-2xl" />
                ) : (
                  <BiChevronDown className="text-2xl" />
                )}
              </button>

            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;