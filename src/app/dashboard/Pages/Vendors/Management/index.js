import React  from "react";
import { Outlet, Route, useNavigate } from "react-router";
import RouteLayout from "../../../Components/Layout/RouteLayout";

function VendorMgt() {
  // const [modal, setModal] = useState(false);
  // const navigate = useNavigate();
  // const openModal = ({ state, action, pushto, identity }) => {
  //   setModal(!modal);
  //   navigate(
  //     `?state=${state}&action=${action}&pushto=${pushto}&identity=${identity}`
  //   );
  // };
// this
  // const closeModal = () => {
  //   setModal(!modal);
  //   navigate(`?`);
  // };
  return (
    <RouteLayout title={"Title"}>
      <>
        <Outlet
        // context={{
        //   action: (value) => openModal(value),
        //   close: (value) => closeModal(value),
        // }}
        />
        {/* {modal && (
        <VendorModals
          isOpen={modal}
          closeModal={(close) => closeModal(close)}
        />
      )} */}
      </>
    </RouteLayout>
  );
}

export default VendorMgt;
