import { lazy, Suspense, useContext, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Organizer from "./Pages/Organizer";
import Message from "./Pages/message/Message";

const Login = lazy(() => import("./Pages/Login"));

const Home = lazy(() => import("./Pages/Home"));

const Register = lazy(() => import("./Pages/Register"));
const EventsPage = lazy(() => import("./Pages/EventsPage"));

const Predictor = lazy(() => import("./Pages/Predictor"));
const Profile = lazy(() => import("./Pages/Profile"));

const AppRoute = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path="/message" element={<Message/>} />
          <Route path="/predictor" element={<Predictor/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
};

export default AppRoute;
