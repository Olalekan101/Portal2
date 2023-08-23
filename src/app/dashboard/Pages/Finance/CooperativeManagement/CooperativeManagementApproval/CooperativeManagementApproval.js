import RouteLayout from "../../../../Components/Layout/RouteLayout";
import {
  CTAButtons,
  CTAButtonsAlt,
} from "../../../../../global/components/Buttons/buttons";
import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../../Components/Layout/FinancePageLayout";
import Table from "../../../../Components/Table/Table";
import {
  SearchFilter,
  ActionButton,
  CalendarFilter2,
  ProDropFilter,
} from "../../../../Components/Search/Search";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../../Components/Misc/Actions";
import { FormatCurrency } from "../../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../../Components/Search/Search";
import "./style.css";
import { FiChevronDown } from "react-icons/fi";

export default function CooperativeManagementApproval() {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**Data Fetching */
  let data = [{}];

  useEffect(() => {
    // dispatch(); fetch data from central state: redux-store or context-API
    // OR run Filter Functions
  }, [pageNumber, pageSize, search, filters, endDate, startDate]);

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

  /**Select All Action */
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const selectedItemIds = mockData.map((item) => item.id);
      setSelectedItems(selectedItemIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  // Action Button at the top of screen
  const actionButton = (
    <>
      <CTAButtonsAlt
        onClick={() => {
          navigate(`/dashboard/finance/${URL.CooperativeComponent}`);
        }}
      >
        <span className="whitespace-nowrap">Upload Deduction</span>
      </CTAButtonsAlt>
    </>
  );

  const dropDown = (
    <select
      style={{
        marginLeft: "10px",
        padding: "13px 20px",
        border: "1px solid #ccc",
        borderRadius: "7px",
        outline: "none",
      }}
      placeholder="Reviewer"
    >
      <option>2023</option>
      <option>2023</option>
      <option>2023</option>
    </select>
  );

  const Reviewer_options = [
    { value: "Reviewer", label: "Reviewer" },
    { value: "Approval", label: "Approval" },
  ];

  const dropDownMenu = (
    <select className="block w-full px-4 py-4 text-gray-700 border ml-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      {Reviewer_options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const altActionButton = (
    <button
      className="altActionButton"
      onClick={() => {
        /*navigate(URL.CostCentre)*/
      }}
    >
      Class
    </button>
  );

  const preTableDiv = (
    <div id="preTableDiv">
      <div>
        <p className="selectLabel">Services</p>
        <div
          onClick={() => setOptionOpen((prev) => !prev)}
          className="selectFilter"
        >
          <p className="placeholder">Medical</p>
          <div className="caret">
            <FiChevronDown size={24} color="#6E9170" />
          </div>
        </div>
        {optionOpen && (
          <div className="optionBox">
            <p
              className="option"
              onClick={() => {
                setOptionOpen(false);
              }}
              value="medical"
            >
              Medical
            </p>
            <p
              className="option"
              onClick={() => {
                setOptionOpen(false);
              }}
              value="travel"
            >
              Travel
            </p>
            <p
              className="option"
              onClick={() => {
                setOptionOpen(false);
              }}
              value="marketting"
            >
              Marketting
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Filter options to Map in Filter Modal
  // When Selected, it uses the corresponding key in the mapped data and filters by the selected option
  const filterBy = [
    {
      key: "positions",
      options: ["Front-end Engineer", "Developer"],
    },
    {
      key: "departments",
      options: ["Information Technology IT", "Human Resources"],
    },

    // {
    //   name: "Cancel",
    //   filter: 3,
    // },
  ];

  // const actionTaken = [
  //   {
  //     name: "Approved",
  //     filter: 0,
  //   },
  //   {
  //     name: "Declined",
  //     filter: 2,
  //   },

  // ];

  // Format data result to look something like this:
  let mockData = [
    {
      id: "000",
      employees: "Tobi Gates",
      positions: "Front-end Engineer",
      department: "Information Technology IT",
      branch: "Head Office",
      email: "FINOVR",
      phone: "Approved",
    },
    {
      id: "000",
      employees: "Tobi Gates",
      positions: "Front-end Engineer",
      department: "Information Technology IT",
      branch: "Head Office",
      email: "FINOVR",
      phone: "Approved",
    },
    {
      id: "000",
      employees: "Tobi Gates",
      positions: "Front-end Engineer",
      department: "Information Technology IT",
      branch: "Head Office",
      email: "FINOVR",
      phone: "Approved",
    },
    {
      id: "000",
      employees: "Tobi Gates",
      positions: "Front-end Engineer",
      department: "Information Technology IT",
      branch: "Head Office",
      email: "FINOVR",
      phone: "Approved",
    },
  ];

  // Table Headers format:
  let mockHeaders = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Employees",
      key: "employees",
    },
    {
      title: "Positions",
      key: "positions",
    },
    {
      title: "Departments",
      key: "department",
    },
    {
      title: "Branch",
      key: "branch",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: null,
    },
  ];

  // Format for "More Options" buttons:
  let mockRowOptions = [
    { name: "Edit Record", action: () => {} },
    { name: "Approve Request", action: () => {} },
    { name: "Decline Request", action: () => {} },
  ];
  return (
    <RouteLayout>
      <PageStyle
        title={" Cooperative Management Approval"}
        hasBack={false}
        action={[dropDownMenu]}
        isMain={true}
        // preChildren={preTableDiv}
      >
        <section className="bg-white p-6 flex flex-col">
          <div className={DashboardStyle.dashboard_filter}>
            <SearchFilter text={setSearch} />
          </div>
          <div className={DashboardStyle.dashboard_table_holder}>
            <Table>
              <thead>
                <tr>
                  <th>
                    <input
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
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "green",
                      }}
                    />
                  </th>
                  {mockHeaders.map((header) => (
                    <th key={header.key}>{header.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <RequestTable
                  isLoading={false}
                  data={mockData}
                  keys={mockHeaders.map((header) => header.key)}
                  selectable={true}
                  rowOptions={mockRowOptions}
                  // getRequest={()=> {}} // function to get request data
                  HandleSelectedItems={HandleSelectedItems}
                  selectedItems={selectedItems}
                />
                {/* {data?.map?.((item) => (
                <RequestTable
                  {...item}
                  key={item.id}
                  isLoading={false}
                  apiData={apiData}
                />
              ))} */}
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
        </section>
      </PageStyle>
    </RouteLayout>
  );
}

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
                // url is for the view "eye icon" routing
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
                <TableActions children={rowOptions} url={`${item?.id}/view`}>
                  {rowOptions}
                </TableActions>
              )
            }
          </td>
        </tr>
      ))}
    </>
  );
}
