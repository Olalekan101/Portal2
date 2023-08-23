import React from "react";
import PageStyle from "./Layout.module.css";
import { BackButtons } from "../../../global/components/Buttons/buttons";
import { useNavigate } from "react-router";

function FinancePageLayout({
  children,
  title,
  action,
  altAction,
  hasBack,
  className,
  isMain,
  support,
  backURL,
  preChildren,
  backBtn,
}) {
  const navigate = useNavigate();
  return (
    <div className={`${PageStyle.Route_Layout} ${className}`}>
      <div>{backBtn && backBtn}</div>
      <div className={PageStyle.Route_Buttons}>
        {isMain === true && (
          <div>
            <h3 className={PageStyle.Route_Page_Title}>{title}</h3>
            <small className={PageStyle.Route_Page_Support}>{support}</small>
            <div>
              {" "}
              {hasBack && isMain && <BackButtons onClick={() => navigate(backURL || -1)} />}
            </div>
          </div>
        )}
        <div>
          {" "}
          {hasBack && !isMain && <BackButtons onClick={() => navigate(backURL || -1)} />}
        </div>
        <div className={PageStyle.Action_Button_Subsection}>
          {action && action.map((component) => component)}
        </div>
      </div>
      <div>{preChildren}</div>
      <div className={`${PageStyle.Route_Page_Layout_Body} shadow`}>
        {" "}
        {isMain !== true && (
          <div>
            <h3 className={`${PageStyle.Route_Page_Title} !font-[400]`}>{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default FinancePageLayout;
