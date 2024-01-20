import React from 'react';
import { Select } from 'antd';

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const Selects = (props) => {
  const {options,  formik, Icon, title, name} = props;

  const onChange = (value) => {
formik.values[name] = value;
  };

  return (
    <div className="mb-2 ">
    <span className="flex">
      {Icon}
      <label
        htmlFor={name}
        className="block text-sm font-semibold ml-2 text-textPrimary dark:text-dark_textPrimary"
      >
        {title}
      </label>
    </span>
    <span className="flex w-full">


  <Select
    showSearch
    title={title}
    optionFilterProp="children"
    onChange={onChange}
    placeholder={<b>{title}</b>}
    defaultValue={formik.values[name]}
    onBlur={formik.handleBlur}
    filterOption={filterOption}
    options={options}
    rootClassName='outline-0 border ring-0 bg-background dark:border-dark_cardBorder '
    className={`block w-full mt-2 h-[42px] text-textPrimary dark:text-dark_textPrimary font-mono dark:bg-dark_background border-0 ring-0 outline-0 rounded-md border-cardBorder dark:border-dark_cardBorder bg-background`}
  />
          </span>

          {formik.touched[name] &&
      formik.errors[name] &&
      formik.values[name] != "" ? (
        <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
      ) : null}

   </div>
);
  }
export default Selects;