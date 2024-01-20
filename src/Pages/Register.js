/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

import Loading, { showLoading } from "../Components/Loading";

import { toast } from "react-toastify";

import Input from "../Components/Input";
import axios from "axios";
import SelectInput from "../Components/Select";

import Button from "../Components/Button";
import { FaUserCircle } from "react-icons/fa";
import { Modal } from "antd";
import { api_url } from "../Library/Library";
import logo from '../logo.svg'



const Register = () => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      fullname:"",
      gender: null,
      who:"user",
      terms: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
      fullname: Yup.string().required("Fullname is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter and one number"
        ),
      gender: Yup.string().required("Gender is required"),
      
    }),
    onSubmit: (values) => {
      if (values.terms === false) {
        toast.error("Please accept the terms and conditions to continue", {
          description: "",
          duration: 3000,
        });
      } else {
        showLoading(true);
        axios
          .post(`${api_url}/api/v1/user/signup`, values)
          .then((res) => {
            toast.success("Registered Successfully", {
               duration: 3000,
               });
          })
          .catch((err) => {
            toast.error(
              err.response?.data?.message
                ? err.response?.data?.message
                : "Something went wrong",
              {
                duration: 3000,
              }
            );
          })
          .finally(() => {
            showLoading(false);
          });
      }
    },
  });

  return (
    <>

      <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden  max-sm:block mb-8 ">
        <div className="w-full p-10 m-auto bg-cardBg rounded-md shadow-xl sm:max-w-xl dark:bg-dark_cardBg border">
          {/* <h1 className="w-full m-auto -ml-1 flex -my-14 justify-center">
          <img src={logo} className="w-48 h-24 mb-8" alt="Logo" />

          </h1> */}

          <h3 className="text-sm mt-3 font-semibold text-center text-textSecondary dark:text-dark_textSecondary">
            By signing up, you agree to our
            <br />
            <p
              onClick={showModal}
              className="font-medium text-link_text hover:underline mt-1 cursor-pointer"
            >
              Terms and Conditions
            </p>
          </h3>
          <Modal
        title="Terms and Conditions"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        children={
          <>
           <h1>
            Terms and Conditions for "The Green Area" Web App
           </h1>

Welcome to <b>"The Green Area</b>" web app. Before you start using our services, please carefully read and understand the following terms and conditions. By accessing or using our web app, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.

Acceptance of Terms:
By accessing or using "The Green Area" web app, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. These terms may be updated from time to time, and your continued use of the app signifies your acceptance of any changes.

User Registration:
To access certain features of the app, you may be required to register and create an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

Purpose of the App:
"The Green Area" is designed to connect users with various environmental activities, NGOs/INGOs, and provide information about upcoming events related to environmental conservation. The app also includes a plant disease prediction feature to assist users in identifying and addressing plant health issues.

Content and Services:
The app may include content and services provided by third parties. "The Green Area" is not responsible for the accuracy, completeness, or reliability of third-party content and services. Users are encouraged to verify information independently.

Plant Disease Prediction:
The plant disease prediction feature is based on algorithms and data analysis. While we strive for accuracy, "The Green Area" cannot guarantee the absolute precision of predictions. Users are advised to consult with professionals for accurate diagnosis and treatment.

User Conduct:
Users agree not to engage in any activity that may interfere with the proper functioning of the app or compromise its security. Any unauthorized access or use of the app is strictly prohibited.

Intellectual Property:
All content, trademarks, logos, and intellectual property on "The Green Area" app are the property of the app owner. Users may not use, reproduce, or distribute any content from the app without prior written consent.

Privacy Policy:
The app's Privacy Policy outlines how user data is collected, used, and protected. By using "The Green Area," you agree to the terms of the Privacy Policy.

Termination of Services:
"The Green Area" reserves the right to terminate or suspend services, accounts, or access to the app at its discretion, without prior notice.

Disclaimer of Warranties:
"The Green Area" provides the app on an "as-is" basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or suitability of the app for any purpose.
          </>
        }
      >
       </Modal>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <Input
              formik={formik}
              Icon={<MailOutlined />}
              title="Email"
              name="email"
              type="email"
            />
            <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Username"
              name="username"
              type="text"
            />
             <Input
              formik={formik}
              Icon={<UserOutlined />}
              title="Fullname"
              name="fullname"
              type="text"
            />
            <Input
              formik={formik}
              Icon={<LockOutlined />}
              name="password"
              title="Password"
              type={"text"}
          haveHideView={true}

            />
            <SelectInput
              formik={formik}
              Icon={<FaUserCircle />}
              title="Select an Gender"
              name="gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "others", label: "Others" },
              ]}
              value={formik.values.gender}
            />
            
            <div className="mt-6 w-full justify-center flex">
              <Button
                type="primary"
                text="Register"
                onClick={formik.handleSubmit}
              />
            </div>
          </form>
      

          <p className="mt-8 text-2xs font-light text-center text-textPrimary dark:text-dark_textPrimary">
            {" "}
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-link_text hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
