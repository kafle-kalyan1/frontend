/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { showLoading } from "../Components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import logo from '../logo.svg'


import Input from "../Components/Input";

import Button from "../Components/Button";
import { FaLock, FaMailchimp, FaUser } from "react-icons/fa";
import { api_url } from "../Library/Library";
import { UserContext } from "../Context/UserProfile";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const usernames = useRef();
  const navigate = useNavigate();
  const { updateUserDetails } = useContext(UserContext);

  useEffect(() => {
    usernames.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Username is required")
        .email("Invalid email address"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter and one number"
        ),
    }),
    onSubmit: (values) => {
      showLoading(true);
      axios
        .post(`${api_url}/api/v1/user/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Loggedin Successfully", {
              duration: 3000,
            });
            localStorage.setItem("token", res.data.token);
            updateUserDetails(res.data.user);
            window.location.href = "/";
          } else {
            toast.error(res.data.message, {
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          if (err.request.status === 422) {
            toast.error("Email or password doesn't match!", {
              duration: 3000,
            });
          } else {
            toast.error("Login Failed Something went wrong", {
              duration: 3000,
            });
          }
        })
        .finally(() => {
          showLoading(false);
        });
    },
  });

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block ">
        <div className="w-full p-6 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl border ">
          <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
          <img src={logo} className="w-48 h-24 mb-8" alt="Logo" />
          </h1>

          <form className="mt-8" onSubmit={formik.handleSubmit}>
            <Input
              formik={formik}
              Icon={<FaMailchimp />}
              title="Email"
              name="email"
              type="text"
              ref_={usernames}
            />

            <Input
              formik={formik}
              Icon={<FaLock />}
              name="password"
              title="Password"
              type={"text"}
              haveHideView={true}
            />
            <Link
              to="#"
              title="Reset Password here!"
              className="text-xs text-text_ focus:text-red_text hover:text-red_text duration-100 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-6 w-full justify-center flex">
              <Button type="primary" text="Login" width="full" />
            </div>
          </form>
          <span></span>

          <p className="mt-8 text-2xs font-light text-center text-textPrimary dark:text-dark_textPrimary">
            {" "}
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-link_text hover:underline"
            >
              Register Now?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
