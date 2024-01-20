import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = (props) => {
   const { formik, Icon, title, type, haveHideView = false, onlyHide=false, default_show=false, name, ref_ } =
     props;
 
     const [show, setShow] = useState(true);
  
     useEffect(() => {
       if(haveHideView && default_show){
         setShow(true)
       }
       else if(haveHideView && !default_show){
         setShow(false)
       }
 
     }, [])
   return (
     <div className="mb-2">
       <span className="flex">
         {Icon}
         <label
           htmlFor={name}
           className="block ml-3 text-sm font-semibold text-textPrimary dark:text-dark_textPrimary"
         >
           {title}
         </label>
       </span>
       <span className="w-full">
         <input
           type={onlyHide ? "password" : show ? type : "password"}
           name={name}
           ref={ref_}
           value={formik.values[name]}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           placeholder={
             formik.touched[name] && formik.errors[name]
               ? `${title} is required`
               : `${title}`
           }
           className={`w-full px-4 py-2 mt-2 text-textPrimary dark:text-dark_textPrimary bg-background dark:bg-dark_background border-2 rounded-md font-mono  focus:outline-usergreen border-cardBorder dark:border-dark_cardBorder hover:border-usergreen flex
    ${
      formik.touched[name] && formik.errors[name]
        ? " border-red_text placeholder-red_text"
        : "outline-cardBorder dark:outline-dark_cardBorder"
    }`}
         />
 
         {haveHideView ? (
           <span
             className="w-6 h-7 cursor-pointer -mt-8 -ml-1 transition block float-right duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
             onClick={() => {
               setShow((p)=>(!p))
               }}
             title={!show ? "Show" : "Hide"}
           >
             {!show ? <FaEye/> : <FaEyeSlash/>}
           </span>
         ) : null}
       </span>
       {formik.touched[name] &&
       formik.errors[name] &&
       formik.values[name] != "" ? (
         <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
       ) : null}
     </div>
   );
 };
 Input.defaultProps = {
   type: "text",
   otherState: null,
   btn1: null,
   btn2: null,
   name: null,
   ref_: null,
 };
 
 
 export default Input;
 