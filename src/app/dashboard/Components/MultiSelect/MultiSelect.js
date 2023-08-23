import React, { useState } from "react";
import multi from "./MultiSelect.module.css";
import { HiX } from "react-icons/hi";
import DashboardStyle from "../../Styles/Dashboard.module.css";
import { CheckBox } from "../Forms/InputTemplate";

function MultiSelect({ data, dataValues, name, title, isOptional }) {
  const [showOptions, setShowOptions] = useState(false);
  const thirdArray = data?.filter?.((elem) => {
    return dataValues?.some?.((ele) => {
      return +ele === elem?.id;
    });
  });

  return (
    <div onMouseLeave={() => setShowOptions(false)} className={multi.select}>
      <label htmlFor="">
        {title}{" "}
        {isOptional === true ? "" : <sup style={{ color: "red" }}>*</sup>}
      </label>
      {/* {showOptions && ( */}
      <div className={multi.select_choices}>
        {thirdArray?.slice(0, 3)?.map((x) => (
          <button onClick={() => setShowOptions(!showOptions)} type="button">
            <p> {x?.checkBoxName || "Missing Name"}</p> <HiX />
          </button>
        ))}
        {thirdArray?.slice(3, thirdArray?.length)?.length >= 1 && (
          <button
            className={multi._count}
            onClick={() => setShowOptions(!showOptions)}
            type="button"
          >
            <p>+ {thirdArray?.slice(3, thirdArray?.length)?.length}</p>
          </button>
        )}
      </div>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={multi.input_field}
      ></div>

      {showOptions && (
        <div
          style={{ width: "100%" }}
          className={`${DashboardStyle.inputs_group_no_grid} ${multi.inputs_group_no_grid}`}
        >
          <div
            style={{ margin: "0" }}
            className={`${DashboardStyle.inputs_checkbox_groups} ${multi.inputs_checkbox_groups}`}
          >
            <div
              style={{
                margin: "0",
              }}
              className={multi.inputs_checkbox_groupsx}
            >
              {" "}
              {data?.map((x, index) => {
                return (
                  <CheckBox
                    // style={{multi.}}
                    key={index}
                    name={x?.checkBoxName}
                    camelCase={name}
                    group={name}
                    value={x?.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
