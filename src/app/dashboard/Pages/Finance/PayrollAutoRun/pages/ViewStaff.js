import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/FinancePageLayout";
import { useNavigate } from "react-router";
import { URL } from "../../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../../Components/Search/Search";
import "../style.css";
import RouteLayout from "../../../../Components/Layout/RouteLayout";
import { FiXCircle, FiArrowLeft } from "react-icons/fi";
import CustomModal from "../components/CustomModal";

function PayrollAutoRun() {
  // Filter states
  const [optionOpen, setOptionOpen] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentTable, setCurrentTable] = useState("employee");
  const [selectedPreTable, setSelectedPreTable] = useState("Medical");

  //Select states
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [togglePayroll, setTogglePayroll] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**Select One Action */
  const HandleSelectedItems = (itemId, checked) => {
    setSelectedItems((prevSelectedItems) => {
      if (checked) {
        return [...prevSelectedItems, itemId];
      } else {
        return prevSelectedItems.filter((id) => id !== itemId);
      }
    });
  };

  const handleBackNav = () => {
    navigate("/dashboard/finance/payroll-Autorun/payroll");
  };

  const earnings = [
    { id: 1, title: "Basic", value: "N999,000,000" },
    { id: 1, title: "Transport", value: "N999,000,000" },
    { id: 1, title: "Housing", value: "N999,000,000" },
    { id: 1, title: "Bonus", value: "N999,000,000" },
    { id: 1, title: "Consolidated", value: "N999,000,000" },
  ];

  const deductions = [
    { id: 1, title: "Tax", value: "N999,000,000", fixed: true },
    { id: 1, title: "Pension", value: "N999,000,000", fixed: true },
    { id: 1, title: "Insurance", value: "N999,000,000", fixed: true },
    {
      id: 1,
      title: "Cooperative Control",
      value: "N999,000,000",
      fixed: false,
    },
    { id: 1, title: "Cooperative Loan", value: "N999,000,000", fixed: false },
    { id: 1, title: "Cash Advance", value: "N999,000,000", fixed: false },
  ];

  useEffect(() => {
    // dispatch(); fetch data from central state: redux-store or context-API
    // OR run Filter Functions
  }, [pageNumber, pageSize, search, filters, endDate, startDate]);

  /**Select One Action */

  const backBtn = (
    <button
      style={{ border: "1px solid #305f32" }}
      className="border flex items-center px-5 py-2 justify-center gap-1 text-baseFont border-customGreen text-customGreen rounded-md"
      onClick={handleBackNav}
    >
      <FiArrowLeft />
      Back
    </button>
  );

  const preTableDiv = <div id="preTableDiv"></div>;

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        backBtn={backBtn}
        title={null}
        hasBack={false}
        isMain={true}
        preChildren={preTableDiv}
      >
        <div>
          <h1
            style={{ borderBottom: "1px solid #ccc" }}
            className="text-customGreen text-2xl py-3"
          >
            Staff Remuneration
          </h1>
          {/*Earnings*/}
          <div
            style={{ borderBottom: "1px solid #ccc" }}
            className="flex items-start justify-center gap-1 w-full my-2 py-3"
          >
            <div style={{ flex: "0.5" }} className="p-2">
              <h1 className="text-baseFont">Earnings</h1>
            </div>
            <div
              style={{
                flex: "2",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "30px",
              }}
              className="p-2"
            >
              {earnings.map((earning) => (
                <div key={earning.id} className="flex flex-col gap-2 mb-2">
                  <span className="text-baseFont text-slate-400">
                    {earning.title}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#f7fbf7",
                      border: "1px solid #f7fbf7",
                    }}
                    className="rounded w-full p-3 text-slate-400"
                  >
                    {earning.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/*Deductions*/}
          <div
            style={{ borderBottom: "1px solid #ccc" }}
            className="flex items-start justify-center gap-1 w-full my-2 py-3"
          >
            <div style={{ flex: "0.5" }} className="p-2">
              <h1 className="text-baseFont">Deductions</h1>
            </div>
            <div
              style={{
                flex: "2",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "30px",
              }}
              className="p-2"
            >
              {deductions.map((deduction) => (
                <div
                  key={deduction.id}
                  className=" relative flex flex-col gap-2 mb-2"
                >
                  <span className="text-baseFont text-slate-400">
                    {deduction.title}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#f7fbf7",
                      border: "1px solid #f7fbf7",
                    }}
                    className="rounded w-full p-3 text-slate-400"
                  >
                    {deduction.value}
                  </span>
                  {!deduction.fixed && (
                    <button className="absolute top-0 right-0 text-altRed">
                      <FiXCircle />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end py-2">
            <button
              className="px-5 py-2 opacity-50 gap-1 text-baseFont bg-customGreen text-white rounded-md"
              onClick={handleBackNav}
            >
              Done
            </button>
          </div>
        </div>
      </PageStyle>
    </RouteLayout>
  );
}

export default PayrollAutoRun;
