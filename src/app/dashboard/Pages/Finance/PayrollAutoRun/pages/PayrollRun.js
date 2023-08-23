import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/FinancePageLayout";
import { CTAButtons } from "../../../../../global/components/Buttons/buttons";
import Table from "../../../../Components/Table/Table";
import {
  SearchFilter,
  ActionButton,
  CalendarFilter2,
} from "../../../../Components/Search/Search";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../../Components/Search/Search";
import "../style.css";
import RouteLayout from "../../../../Components/Layout/RouteLayout";
import SummaryCard from "../../../../Components/SummaryCard/SummaryCard";
import LineChart from "../../../../Components/LineChart/LineChart";
import {
  FiChevronDown,
  FiFilePlus,
  FiChevronUp,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiArrowLeft,
  FiDelete,
  FiEdit2,
  FiEdit3,
  FiEye,
  FiTrash,
  FiUser,
  FiUsers,
  FiFile,
} from "react-icons/fi";
import CustomModal from "../components/CustomModal";
import { payrollDummyData } from "../dummyData";
import { summaryData } from "../dummyData";
import { dates } from "../dummyData";
import { ProDropFilter } from "../../../../Components/Search/Search";

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

  let data = [{}];

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
    navigate("/dashboard/finance/payroll-Autorun");
  };

  const handleViewStaff = () => {
    navigate(`/dashboard/finance/payroll-Autorun/view-staff`);
  };

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

  const preTableDiv = (
    <div id="preTableDiv">
      <div className="bg-white w-full rounded shadow p-7">
        <div className={DashboardStyle.dashboard_filter}>
          <ProDropFilter
            filter={null}
            setFilter={null}
            name={"Payroll Type"}
            //   filterBy={filterBy}
          />

          <CalendarFilter2
            name="Payroll Date"
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <FilterButton
            onSubmit={() => {}}
            onClick={() => setFilterModal((prev) => !prev)}
            name=""
          />
          <button className="text-baseFont opacity-50 bg-customGreen py-3 px-5 flex items-center gap-2 justify-center rounded-md text-white">
            <FiFile /> Payroll Run
          </button>
        </div>
      </div>
    </div>
  );

  let mockData = [
    {
      id: "001",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "002",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Annex Office - Lekki",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "003",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Annex Office - Lekki",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "004",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "005",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "006",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "007",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "008",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
    {
      id: "009",
      employees: "Odunewu Idowu",
      cadre_level: "Officer 2",
      departments: "IT Department",
      branch: "Head Office",
      value: "--",
      approval: "--",
      payroll_status: "--",
    },
  ];

  // Table Headers format:
  const headerSetter = () => {
    let EmployeeHeaders = [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Employees",
        key: "employees",
      },
      {
        title: "Departments",
        key: "departments",
      },
      {
        title: "Cadre Level",
        key: "cadre_level",
      },
      {
        title: "Branch",
        key: "branch",
      },
      {
        title: "Value",
        key: "value",
      },
      {
        title: "Approval",
        key: "approval",
      },
      {
        title: "Payroll Status",
        key: "payroll_status",
      },
      {
        title: "Actions",
        key: null,
      },
    ];
    let DepartmentHeaders = [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Departments",
        key: "departments",
      },
      {
        title: "Branch",
        key: "branch",
      },
      {
        title: "Amount Alloted",
        key: "amount_alloted",
      },
      {
        title: "Actions",
        key: null,
      },
    ];
    let BranchesHeaders = [
      {
        title: "ID",
        key: "id",
      },
      {
        title: "Branch",
        key: "branch",
      },
      {
        title: "Amount Alloted",
        key: "amount_alloted",
      },
      {
        title: "Actions",
        key: null,
      },
    ];

    return currentTable === "employees"
      ? EmployeeHeaders
      : currentTable === "department"
      ? DepartmentHeaders
      : currentTable === "branches"
      ? BranchesHeaders
      : EmployeeHeaders;
  };
  let currentHeaders = headerSetter();

  // Format for "More Options" buttons:
  let mockRowOptions = [
    {
      name: "View Details",
      icon: <FiEye />,
      action: () => {
        handleViewStaff();
      },
    },
    {
      name: "Remove from Payroll",
      icon: <FiEdit2 color="#946300" />,
      action: () => {},
    },
  ];

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        backBtn={backBtn}
        title={"Payroll Run"}
        hasBack={false}
        isMain={true}
        preChildren={preTableDiv}
      >
        <div className="w-full flex items-end justify-between mb-3">
          <SearchFilter text={setSearch} fromHeader={true} />
          <div className="flex items-center justify-end gap-2">
            <button className="text-baseFont opacity-50 bg-customGreen py-2 px-5 rounded text-white">
              Approve All
            </button>
            <select
              style={{ padding: "6px 15px" }}
              className="text-baseFont border border-slate-300 rounded"
            >
              <option>Active Staff</option>
              <option>Exit Staff</option>
            </select>
          </div>
        </div>
        <div className={DashboardStyle.dashboard_table_holder}>
          <Table>
            <thead>
              <tr>
                <th>
                  {/* <input
                    type="checkbox"
                    className={DashboardStyle.dashboard_table_check_input}
                    checked={
                      selectAll === true ||
                      (selectedItems.length > 0 &&
                        selectedItems.length ===
                          data?.filter(
                            (item) => item.requisitionStatus === "Initiated"
                          ).length)
                    }
                    onChange={handleSelectAllChange}
                    style={{ height: "20px", width: "20px", backgroundColor:'green'}}
                  /> */}
                </th>
                {currentHeaders.map((header, i) => (
                  <th
                    className={`!text-[#29382A] ${
                      header.title === "Actions" && "flex justify-end !pr-6"
                    }`}
                    key={i}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <RequestTable
                isLoading={false}
                data={mockData}
                keys={currentHeaders.map((header) => header.key)}
                selectable={false}
                rowOptions={mockRowOptions}
                // getRequest={()=> {}} // function to get request data
                HandleSelectedItems={HandleSelectedItems}
                selectedItems={selectedItems}
              />
            </tbody>
          </Table>
        </div>

        <Pagination
          last_page={data?.totalPages}
          present_page={data?.currentPage}
          totalRows={data?.totalRows}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setPageNumber(page)}
        />
      </PageStyle>
    </RouteLayout>
  );
}

export default PayrollAutoRun;

function RequestTable({
  data,
  keys,
  selectable,
  HandleSelectedItems,
  selectedItems,
  rowOptions,
}) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log({data, keys})
  return (
    <>
      {data?.map((item) => (
        <tr key={item.id}>
          <td>
            {selectable && (
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => HandleSelectedItems(item.id, e.target.checked)}
                style={{ height: "20px", width: "20px" }}
              />
            )}
          </td>
          {keys
            .filter((key) => key)
            .map((key, i) => (
              <td key={i}>{item[key]}</td>
            ))}
          {/**Status column if Any*/}
          {/* <td style={{ textAlign: "center" }}>
              <span
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  backgroundColor:
                    item.requisitionStatus === "Initiated"
                      ? "#FFF1CF"
                      : item.requisitionStatus === "Approved"
                      ? "#DCFFC9"
                      : item.requisitionStatus === "Cancelled"
                      ? "#FFF1e4"
                      : item.requisitionStatus === "Declined"
                      ? "#FBE6E7"
                      : "",
                  color:
                    item.requisitionStatus === "Initiated"
                      ? "#815103"
                      : item.requisitionStatus === "Approved"
                      ? "#0F6308"
                      : item.requisitionStatus === "Cancelled"
                      ? "815123"
                      : item.requisitionStatus === "Declined"
                      ? "#8A002B"
                      : "",
                }}
              >
                {item.requisitionStatus}
              </span>
            </td> */}
          <td>
            {
              // Different conditions for different state
              item["ifCondition"] === "Declined" ? (
                // "url" is for the view "eye icon" routing
                <TableActions hasChildren={true} url={`${item?.id}/view`}>
                  {[
                    {
                      name: "Edit Requisition",
                      action: () =>
                        navigate(`${item?.id}/edit`, {
                          state: item,
                        }),
                    },
                  ]}
                </TableActions>
              ) : item?.requisitionStatus === "Approved" ||
                item?.requisitionStatus === "Cancelled" ? (
                <TableActions
                  hasChildren={true}
                  url={`${item?.id}/view`}
                ></TableActions>
              ) : (
                // DEFAULT ACTION DROPDOWN
                <div className={`flex justify-end bg-transparent`}>
                  <TableActions children={rowOptions} url={`${item?.id}/view`}>
                    {rowOptions}
                  </TableActions>
                </div>
              )
            }
          </td>
        </tr>
      ))}
    </>
  );
}
