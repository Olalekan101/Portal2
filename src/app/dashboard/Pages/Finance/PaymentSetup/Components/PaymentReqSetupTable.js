import {
  CTAButtons,
  CTAButtonsAlt,
} from "../../../../../global/components/Buttons/buttons";
import { FormatCurrency } from "../../../../../../utils/functions/FormatCurrency";
import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../Components/Table/Table";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../Components/Misc/Actions";
import "./style.css";

/**Data Fetching */
let data = [{}];

let mockData = [
  {
    id: "000",
    employees: "Tobi Gates x",
    departments: "Information Technology IT",
    payment_type: "Cash Advance",
    min_value: FormatCurrency(99999),
    max_value: FormatCurrency(99999),
    role: "initiator",
    status: "Active",
  },
  {
    id: "001",
    employees: "Dami Gates",
    departments: "Information Technology IT",
    payment_type: "Cash Advance",
    min_value: FormatCurrency(99999),
    max_value: FormatCurrency(99999),
    role: "initiator",
    status: "Active",
  },
  {
    id: "002",
    employees: "Sunday Gates",
    departments: "Information Technology IT",
    payment_type: "Cash Advance",
    min_value: FormatCurrency(99999),
    max_value: FormatCurrency(99999),
    role: "initiator",
    status: "Active",
  },
  {
    id: "003",
    employees: "Chief Gates",
    departments: "Information Technology IT",
    payment_type: "Cash Advance",
    min_value: FormatCurrency(99999),
    max_value: FormatCurrency(99999),
    role: "initiator",
    status: "Active",
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
    title: "Departments",
    key: "departments",
  },
  {
    title: "Payment Type",
    key: "payment_type",
  },
  {
    title: "Min Value",
    key: "min_value",
  },
  {
    title: "Max Value",
    key: "max_value",
  },
  {
    title: "Role",
    key: "role",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    key: null,
  },
];
let mockRowOptions = [
  { name: "Edit Record", action: () => {} },
  { name: "Approve Request", action: () => {} },
  { name: "Decline Request", action: () => {} },
];

export default function PaymentReqSetupTable() {
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

  let mockRowOptions = [
    { name: "Edit Record", action: () => {} },
    {
      name: "Approve Request",
      action: () => {},
    },
    { name: "Decline Request", action: () => {} },
  ];

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
      <CTAButtons
        onClick={() => {
          /*navigate(URL.CostCentre)*/
        }}
      >
        Download as printable copy
      </CTAButtons>
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
    >
      <option>2023</option>
    </select>
  );
  return (
    <>
      <div className={`${DashboardStyle.dashboard_table_holder} `}>
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
    </>
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
