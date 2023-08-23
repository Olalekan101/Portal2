import React from "react";
import LOGO_SVG from "../../../global/images/logo.svg";
import HeaderStyle from "./Style/Header.module.css";
import { SearchFilter } from "../Search/Search";
import { GetLocalStorage } from "../../../../utils/functions/GetLocalStorage";
import { FiBell, FiChevronDown } from "react-icons/fi";

function Header({ className }) {
  const user = GetLocalStorage();
  const userInitials = user?.fullName
    ?.split(" ")
    ?.map((x) => {
      return x?.slice(0, 1);
    })
    ?.join("");

  return (
    <header className={`${HeaderStyle.header} ${className}`}>
      <div className={HeaderStyle?.header_logo}>
        <img src={LOGO_SVG} alt="" />
      </div>
      <div className={HeaderStyle?.header_actions}>
        <div className={HeaderStyle?.header_search}>
          <SearchFilter fromHeader={true} />
        </div>
        <div>
          <span className={HeaderStyle.header_bell_icon}>
            {" "}
            <FiBell fontSize={30} />
          </span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <div className={HeaderStyle.userInitials}>{userInitials}</div>
          <span>
            <FiChevronDown className={HeaderStyle.header_chevron_icon}/>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
