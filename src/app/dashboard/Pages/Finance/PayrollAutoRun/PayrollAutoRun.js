import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/FinancePageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ActionButton,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../Components/Search/Search";
import "./style.css";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import SummaryCard from "../../../Components/SummaryCard/SummaryCard";
import LineChart from "../../../Components/LineChart/LineChart";
import {
  FiChevronDown,
  FiFilePlus,
  FiChevronUp,
  FiCheckCircle,
  FiXCircle,
  FiX,
} from "react-icons/fi";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import CustomModal from "./components/CustomModal";
import { payrollDummyData } from "./dummyData";
import { summaryData } from "./dummyData";
import { dates } from "./dummyData";
import {
  getPayrollData,
  schedulePayroll,
} from "../../../../../utils/redux/Finance/PayrollSlice/PayrollSlice";
import toast from "react-hot-toast";

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

  //Select states
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [togglePayroll, setTogglePayroll] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const payrollData = useSelector((state) => state?.payrollStore?.payrollData);
  const isLoading = useSelector((state) => state?.payrollStore?.isLoading);

  /**Data Fetching */

  const handleModal = () => {
    setOpenModal(true);
  };

  function convertDate(isoDate) {
    let timestamp = Date.parse(isoDate);
    let jsDate = new Date(timestamp);
    let fDate = new Intl.DateTimeFormat("en-us", {
      dateStyle: "long",
    });
    return fDate.format(jsDate);
  }

  useEffect(() => {
    dispatch(getPayrollData({ search, startDate, endDate }));
  }, [dispatch, search, startDate, endDate]);

  // console.log({ isLoading });
  console.log({ payrollData });

  const summaryData =
    payrollData &&
    Object.entries(payrollData).filter((item) => {
      return item[0] !== "payrollHistory" && item[0] !== "upcomingPayrollDate";
    });

  // console.log(summaryData);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handlePayrollToggle = () => {
    setTogglePayroll(!togglePayroll);
  };

  const handleNavigate = () => {
    navigate("/dashboard/finance/payroll-Autorun/payroll");
  };

  useEffect(() => {
    // dispatch(); fetch data from central state: redux-store or context-API
    // OR run Filter Functions
  }, [pageNumber, pageSize, search, filters, endDate, startDate]);

  /**Select One Action */

  // Action Button at the top of screen
  const actionButton = (
    <button
      style={{ padding: "12.5px 15px" }}
      className="bg-customGreen border flex items-center justify-center gap-1 text-baseFont border-customGreen text-white rounded-md"
    >
      <FiFilePlus />
      Download a printable copy
    </button>
  );

  const dropDown = (
    <select className="ml-3 border border-customGreen py-3 pl-2 text-baseFont outline-none focus:ring-0 rounded-md w-20">
      {dates.map((date, index) => (
        <option key={index} value={date}>
          {date}
        </option>
      ))}
    </select>
  );

  function generateMonthsArray() {
    const currentMonth = new Date().getMonth(); // Get the current month (0 to 11)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const months = [];

    for (let month = currentMonth + 1; month <= 11; month++) {
      months.push({ index: month, month: monthNames[month] });
    }

    return months;
  }

  const monthsArray = generateMonthsArray();

  function createYearArray() {
    const currentYear = new Date().getFullYear();
    const lowestYear = 2002;
    const years = [];

    for (let year = currentYear; year >= lowestYear; year--) {
      years.push(year);
    }

    return years;
  }

  const yearArray = createYearArray();

  //payroll run params
  const [payrollType, setPayrollType] = useState(0);
  const [staffType, setStaffType] = useState(1);
  const [payrollMonth, setPayrollMonth] = useState(monthsArray[0]?.index);
  const [payrollYear, setPayrollYear] = useState(yearArray[0]);

  const handlePayrollType = (e) => {
    setPayrollType(e.target.value);
  };

  const handleStaffType = (e) => {
    setStaffType(e.target.value);
  };

  const handlePayrollMonth = (e) => {
    setPayrollMonth(e.target.value);
  };

  const handlePayrollYear = (e) => {
    setPayrollYear(e.target.value);
  };

  const handlePayrollSchedule = () => {
    dispatch(
      schedulePayroll({
        payrollType: payrollType,
        currentStaffStatus: staffType,
        month: payrollMonth,
        year: payrollYear,
      })
    );
    setTimeout(() => {
      dispatch(getPayrollData({ search, startDate, endDate }));
    }, 1000);
  };

  const preTableDiv = (
    <div id="preTableDiv">
      {openModal && (
        <CustomModal hideModal={setOpenModal}>
          <div
            className="bg-white w-full overflow-hidden"
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
          >
            <header className="w-full py-3 bg-customGreen px-4 flex items-center justify-between">
              <p className="text-white text-baseFont">Schedule Payroll Run</p>
              <button className="text-baseFont text-white" onClick={closeModal}>
                <FiX />
              </button>
            </header>
            {/*main*/}
            <div
              className="flex items-start justify-between gap-3 w-full px-7 pt-7 pb-28"
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <div className="flex-1">
                <div className="w-full mb-5">
                  <h1 className="text-baseFont text-customGreen mb-2">
                    Payroll Type
                  </h1>
                  <select
                    className="text-baseFont w-full py-3 rounded border border-slate-300 bg-slate-50 outline-none focus:ring-0"
                    onChange={handlePayrollType}
                    value={payrollType}
                  >
                    <option value={0}>Monthly</option>
                    <option value={1}>Quarterly</option>
                    <option value={2}>Yearly</option>
                  </select>
                </div>
                <div className="w-full">
                  <h1 className="text-baseFont text-customGreen mb-2">
                    Payroll Month
                  </h1>
                  <select
                    className="text-baseFont w-full py-3 rounded border border-slate-300 bg-slate-50 outline-none focus:ring-0"
                    onChange={handlePayrollMonth}
                    value={payrollMonth}
                  >
                    {monthsArray.map((month) => (
                      <option key={month.index} value={month.index}>
                        {month.month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full mb-5">
                  <h1 className="text-baseFont text-customGreen mb-2">
                    Select Staff
                  </h1>
                  <select
                    className="text-baseFont w-full py-3 rounded border border-slate-300 bg-slate-50 outline-none focus:ring-0"
                    value={staffType}
                    onChange={handleStaffType}
                  >
                    <option value={1}>Active Staff</option>
                    <option value={2}>Exit Staff</option>
                  </select>
                </div>
                <div className="w-full">
                  <h1 className="text-baseFont text-customGreen mb-2">
                    Payroll Year
                  </h1>
                  <select
                    className="text-baseFont w-full py-3 rounded border border-slate-300 bg-slate-50 outline-none focus:ring-0"
                    onChange={handlePayrollYear}
                    value={payrollYear}
                  >
                    {yearArray.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/*main*/}
            <div className="w-full flex items-center justify-end gap-5 pt-3 px-7">
              <button
                className="rounded-md py-1 px-4 text-baseFont text-customGreen"
                style={{ border: "1px solid #305f32" }}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-customGreen rounded-md py-1 px-4 text-white text-baseFont"
                style={{ border: "1px solid #305f32" }}
                onClick={handlePayrollSchedule}
              >
                Ok
              </button>
            </div>
          </div>
        </CustomModal>
      )}
      <SummaryCard summaryData={summaryData} />
      <div className="w-full flex items-center justify-end my-5">
        <button
          className="bg-customGreen border border-customGreen rounded-md text-baseFont p-3 text-white"
          onClick={handleModal}
        >
          Schedule Payroll Run
        </button>
      </div>
      <div className="border border-slate-300 shadow bg-white w-full rounded-md p-3">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-baseFont text-slate-500">Payroll Schedule</h1>
          <div className="flex items-center justify-end gap-5">
            {/* <p className="text-baseFont font-semibold">
              {payrollData?.payrollYTD
                ? `N${payrollData?.payrollYTD} paid | `
                : null}
              Next Payroll on {payrollData?.upcomingPayrollDate}
            </p> */}
            <button className="text-slate-400" onClick={handlePayrollToggle}>
              {togglePayroll ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>
        {togglePayroll && (
          <div className="w-full pt-2">
            <table className="w-full mt-2">
              <tbody>
                {payrollData?.payrollHistory &&
                  payrollData?.payrollHistory?.map((payroll, index) => (
                    <tr
                      key={payroll.id}
                      className="text-baseFont"
                      style={{
                        borderBottom:
                          index === payrollData?.payrollHistory?.length - 1
                            ? "none"
                            : "1px solid #f1f1f1",
                      }}
                    >
                      <td className="py-4 text-baseFont">
                        {payroll?.batchName}
                      </td>
                      <td className="py-4 text-baseFont">
                        Payroll ran{" "}
                        {payroll?.createdDate
                          ? convertDate(payroll.createdDate)
                          : "--"}
                      </td>
                      <td className="py-4 text-baseFont">{"--"}</td>
                      <td className="py-4 text-baseFont flex items-center justify-center gap-1">
                        {payroll?.payrollBatchStatus ? (
                          <FiCheckCircle className="text-altGreen" />
                        ) : (
                          <FiXCircle className="text-altRed" />
                        )}{" "}
                        {payroll?.payrollBatchStatus
                          ? "Payroll completed"
                          : "Payroll pending"}
                      </td>
                      <td className="py-4 text-baseFont">
                        <button
                          disabled={payroll?.payrollBatchStatus && true}
                          className={`border border-customGreen ${
                            payroll?.payrollBatchStatus && "opacity-50"
                          } bg-customGreen text-white py-2 px-4 rounded`}
                          onClick={handleNavigate}
                        >
                          Payroll Run
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        title={"Dashboard"}
        hasBack={false}
        action={[actionButton, dropDown]}
        isMain={true}
        preChildren={preTableDiv}
      >
        <h1 className="text-slate-500 text-baseFont mb-2">
          Payroll History in Naira against time
        </h1>
        <LineChart />
      </PageStyle>
    </RouteLayout>
  );
}

export default PayrollAutoRun;
