import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiChevronDown, FiFilter, FiSearch,FiThumbsUp } from "react-icons/fi";
import FilterSearch from "./Filter.module.css";
import { DayPicker } from "react-day-picker";
import { addDays } from "date-fns";
import "./DatePicker.css";
import "react-day-picker/dist/style.css";
import moment from "moment";

export function SearchFilter({ text, fromHeader }) {
  const ref = useRef(null);

  const handleAutoFocus = () => {
    ref.current.focus();
  };
  return (
    <div>
      {fromHeader === true ? "" : <label htmlFor="">Search</label>}
      <div onClick={handleAutoFocus} className={FilterSearch.Search}>
        <FiSearch className={FilterSearch.Icon} />
        <input
          onChange={(e) => text(e.target.value)}
          ref={ref}
          placeholder={"Search"}
          type="text"
        />
      </div>
    </div>
  );
}

export function ProDropFilter({ filterBy, setFilter, filter, name }) {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <div className={`${FilterSearch.Search} ${FilterSearch.Search_Select}`}>
        {/* {!filter?.filter ? "Filter" : filter?.name} */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          name={name}
          id={name}
        >
          <option value="">{name}</option>
          {filterBy?.map(({ name, filter }, index) => (
            <option key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ProDropFilterMd({ filterBy, setFilter, filter, name }) {
  return (
    <div className={`${FilterSearch.Search} ${FilterSearch.Search_Select_md}`}>
      {/* {!filter?.filter ? "Filter" : filter?.name} */}
      <select onChange={(e) => setFilter(e.target.value)} name="" id="">
        <option value="">{name}</option>
        {filterBy?.map(({ name, filter }, index) => (
          <option key={index} value={filter}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ActionFilter({
  filterBy,
  setFilter,
  filter,
  name,
  placeholder,
}) {
  return (
    <div>
      <div className={`${FilterSearch.Action_Filter}`}>
        {/* {!filter?.filter ? "Filter" : filter?.name} */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          name={name}
          id={name}
          placeholder={placeholder}
        >
          <option value="">{placeholder}</option>
          {filterBy?.map(({ name, filter }, index) => (
            <option key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function ActionButton({
  filterBy,
  setFilter,
  filter,
  name,
  placeholder,
  onChange,
  disabled,
  style
}) {
  return (
    <div
      style={{ maxWidth: "100px", }}
      className={`${FilterSearch.Action_Filter}`}
    >
      {/* <label htmlFor={name}>{name}</label> */}
      <div style={style??{}} className={FilterSearch.Search} onChange={() => onChange()}>
        <select
          onChange={(e) => setFilter(e.target.value)}
          name={name}
          id={name}
          placeholder={placeholder}
          style={style??{}}
         disabled={disabled === "disabled" ? true : false}
        >
          <option value="">{placeholder}</option>
          {filterBy?.map(({ name, filter }, index) => (
            <option key={index} value={filter}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function FilterButton({ filterBy, setFilter, filter, name, onClick }) {
  return (
    <div onClick={() => onClick()} style={{ height: "100%", maxWidth: "100px" }}>
      <label htmlFor={name}>{name}</label>
      <div
        style={{ padding: "0.56rem 0.6rem" }}
        className={FilterSearch.Search}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
          }}
        >
          {" "}
          <FiFilter className={FilterSearch.Icon} />
          <p>Filter</p>
        </div>
        <input placeholder={"Search"} type="button" />
      </div>
    </div>
  );
}




export function CalendarFilter({ filterBy, name, date }) {
  const pastMonth = new Date();
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState(defaultSelected);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    date(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  return (
    <div
      onMouseLeave={() => setOpenModal(false)}
      className={FilterSearch?.date_filter}
      style={{ maxWidth: "200px" }}
    >
      <label htmlFor={name}>{name}</label>
      {/* <style>{css}</style> */}
      <div style={{ padding: "0.7rem 0.6rem" }} className={FilterSearch.Search}>
        <div
          onClick={() => setOpenModal(!openModal)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {" "}
          <FiCalendar className={FilterSearch.Icon} />
          <p style={{ fontSize: "0.71rem", display: "inline-flex" }}>
            {moment(range?.from).format("l")}–{moment(range?.to).format("l")}
          </p>
          <FiChevronDown className={FilterSearch.Icon} />
        </div>
        <input
          style={{ display: "none" }}
          placeholder={"Search"}
          type="button"
        />
      </div>
      {openModal && (
        <div className={FilterSearch?.date_filter_picker}>
          {" "}
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            // footer={footer}
            onSelect={setRange}
          />
        </div>
      )}
    </div>
  );
}

export function CalendarFilter2({ setStartDate, setEndDate, name }) {
  const pastMonth = new Date();
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [range, setRange] = useState(defaultSelected);

  const handleDateRange = () => {
    setStartDate(range.from);
    setEndDate(range.to);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      onMouseLeave={() => setOpenModal(false)}
      className={FilterSearch?.date_filter}
      style={{ maxWidth: "200px" }}
    >
      <label htmlFor={name}>{name}</label>
      {/* <style>{css}</style> */}
      <div style={{ padding: "0.7rem 0.6rem" }} className={FilterSearch.Search}>
        <div
          onClick={() => setOpenModal(!openModal)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0px 8px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {" "}
          <FiCalendar className={FilterSearch.Icon} />
          <p style={{ fontSize: "0.71rem", display: "inline-flex" }}>
            {moment(range?.from).format("l")}–{moment(range?.to).format("l")}
          </p>
          <FiChevronDown className={FilterSearch.Icon} />
        </div>
        <input
          style={{ display: "none" }}
          placeholder={"Search"}
          type="button"
        />
      </div>
      {openModal && (
        <div
          className={FilterSearch?.date_filter_picker}
          onMouseLeave={handleDateRange}
        >
          {" "}
          <DayPicker
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            // footer={footer}
            onSelect={setRange}
          />
        </div>
      )}
    </div>
  );
}
