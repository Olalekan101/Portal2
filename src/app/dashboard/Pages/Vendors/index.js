import React, { useState } from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import { Navigate, Outlet, useNavigate } from "react-router";
import {
  ApproveModals,
  ExperiApproveModals,
} from "../../Components/Modals/ApproveDeclineModals";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveVendor,
  DeclineVendor,
} from "../../../../utils/redux/Vendor/VendorSlice";

// vendor page
function Vendor() {
  // const dispatch = useDispatch();
  // const [modal, setModal] = useState(false);
  // const navigate = useNavigate();
  // const openModal = ({ state, action, pushto }) => {
  //   setModal(!modal);
  //   navigate(`?state=${state}&action=${action}&pushto=${pushto}`, {
  //     replace: true,
  //   });
  // };
  return (
    <RouteLayout title={"Vendor/Vendor Management"}>
      {/* <Outlet openModal={openModal} /> */}
      {/* {modal && (
        <ExperiApproveModals
          isOpen={modal}
          closeModal={() => setModal(!modal)}
        />
      )} */}
    </RouteLayout>
  );
}

export default Vendor;
