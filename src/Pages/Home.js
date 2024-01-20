import { React, useContext, useEffect, useState } from "react";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMarkdown } from "react-icons/fa";
import { UserContext } from "../Context/UserProfile";
import { Link, useNavigate } from "react-router-dom";
import LeftSide from "../Components/LeftSide";
import MiddleSide from "../Components/MiddleSide";
import RightSide from "../Components/RightSide";
import { Facts } from "../Components/Facts";
import { toast } from "react-toastify";
import { message } from "antd";

const { BaseLayer } = LayersControl;

export default function Map() {
  const navigate = useNavigate();
  const { userDetails, fetchProfile } = useContext(UserContext);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState({
    lat: 26.7935883,
    lng: 87.2927818,
    zoom: 13,
  });

  useEffect(() => {
    const hasSeenFacts = sessionStorage.getItem("hasSeenFacts");
    if (!hasSeenFacts) {
      console.log("not seen");
      fetchRandomFacts();
      sessionStorage.setItem("hasSeenFacts", "true");
    }
    fetchProfile();
  }, []);

  const fetchRandomFacts = () => {
    const randomIndex = Math.floor(Math.random() * Facts.length);
    const randomFact = Facts[randomIndex];

    // toast.info(`Quote: ${randomFact.quote}\nAuthor: ${randomFact.author}`);
    message.info(`Quote: ${randomFact.quote}\nAuthor: ${randomFact.author}`);

    // Hide the fact after 5 seconds
    setTimeout(() => {
      console.log("Fact hidden");
    }, 5000);
  };


  useEffect(() => {
    if (!map) return;
    L.easyButton(<FaMarkdown />, () => {}).addTo(map);
  }, [map]);

  const position = [location.lat, location.lng];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 13,
      });
      console.log(position);
    });
  }, []);

  return (
    <>
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
            <div className="flex items-center justify-center cursor-pointer">
              <Link to={`/profile`}>
                {userDetails && userDetails.profilePic ? (
                  <img
                    src={userDetails.profilePic}
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : userDetails && userDetails.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="my-profile-pic"
                    className="w-[3rem] h-[3rem] rounded-full border-solid border-2 border-blue-500"
                  />
                )}
              </Link>
            </div>
          </div>
          <MiddleSide loggedUserData={userDetails} />
          {/* right start  */}
          <RightSide loggedUserData={userDetails} />
          {/* right end  */}
        </div>
      </div>
      {/* <MobileFooter  /> */}

      {/* <Navbar /> */}

      {/* {"Username: " + userDetails?.username + "Email: " + userDetails?.email} */}
      {/* <Button onClick={() => navigate("/logout")} text="Logout" type="danger" /> */}
      {/* <MapContainer
      center={position}
      zoom={location.zoom}
      style={{ height: "100vh" }}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
        </BaseLayer>
      </LayersControl>

      {position && (
        <Marker position={position}>
          <Popup>
          </Popup>
        </Marker>
      )}
    </MapContainer> */}
    </>
  );
}
