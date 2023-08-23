import React from "react";
import on from "./Style/onboarding.module.css";
import DashboardStyle from "../../../dashboard/Styles/Dashboard.module.css";
import Success from "../../Images/86372-addland-thanks-you.gif";
import { ActionButtons } from "../../../global/components/Buttons/buttons";
import Logout from "../../../../utils/functions/LogoutFunction";

function OnboardingStepSix(props) {
  return (
    <>
      <img
        className={on.onboarding_thank_you_img}
        src={Success}
        alt="Success GIF"
      />
      <h3 className={on.onboarding_thank_you}>
        Thank’s for providing your information
      </h3>
      <p className={on.cta_text}>
        Next, we’ll review your application to ensure it meets our criteria.
        This will take 5-10 business days.
      </p>
      <div className={`${DashboardStyle.button_cage} ${on.cta_button_cage}`}>
        <ActionButtons
          width={"auto"}
          onClick={() => Logout()}
          className={DashboardStyle?.button_cage_weight}
        >
          Explore the portal
        </ActionButtons>
      </div>
    </>
  );
}

export default OnboardingStepSix;
