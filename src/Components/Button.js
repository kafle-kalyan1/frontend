import React, { useEffect, useState } from 'react';

const Button = ({ width, text, type, onClick }) => {

  const getWidthClass = () => {
    if (typeof width === 'number' || (typeof width === 'string' && /^\d+(\.\d+)?(px|%)?$/.test(width))) {
      return `w-${width}`;
    }
    return 'w-full';
  };

  const widthClass = getWidthClass();

  const buttonClasses = `cursor-pointer px-4 py-2 tracking-wide text-white transition-colors duration-200 transform ${widthClass} rounded-md`;

  const typeClasses = {
    primary: 'bg-usergreen hover:bg-usergreen_hover  focus:outline-none focus:bg-usergreen_hover',
    secondary: 'bg-secondary_btn hover:bg-secondary_btn_hover text-white focus:outline-none focus:bg-secondary_btn_hover',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:bg-red-600',
    txtPrimary: 'bg-indigo_bg hover:bg-primary_btn_dark text-indigo_text hover:text-white  focus:outline-none focus:bg-primary_btn_dark focus:text-white',
    txtSecondary: 'bg-green_bg hover:bg-secondary_btn_hover text-secondary_text hover:text-white focus:outline-none focus:bg-secondary_btn_hover focus:text-white',
    txtDanger: 'bg-red_bg hover:bg-red_text hover:text-white focus:outline-none text-red-600 focus:bg-red_text focus:text-white',
  };

  const typeClass = typeClasses[type] || typeClasses.primary;

  return (
    <button onClick={onClick} type="submit" className={`transition ease-linear  duration-100 shadow-md  ${buttonClasses} ${typeClass} hover:shadow-lg `}>
      {text}
    </button>
  );
};

export default Button;