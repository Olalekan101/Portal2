import {
  CTAButtons,
  CTAButtonsAlt,
} from "../../../../../../../global/components/Buttons/buttons";
import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../../../../Components/Table/Table";
import Pagination from "../../../../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../../../../Components/Misc/Actions";
import "./style.css";
import { useTablesState } from "../States/States";
import { AppModalTemplate } from "../../../../../../Components/Modals/Modals";
import { CiWarning } from "react-icons/ci";
import { FormInput } from "../../../../../../Components/Forms/InputTemplate";
import { ButtonNormal } from "./ButtonXX";

/**Data Fetching */
let data = [{}];

let mockData = [
  {
    id: "000",
    narration: "Tobi Gates y",
    date_created: "Information Technology IT",
    date_updated: "Cash Advance",
    status: "Active",
  },
  {
    id: "001",
    narration: "Dami Gates",
    date_created: "Information Technology IT",
    date_updated: "Cash Advance",
    status: "Active",
  },
  {
    id: "002",
    narration: "Sunday Gates",
    date_created: "Information Technology IT",
    date_updated: "Cash Advance",
    status: "Active",
  },
  {
    id: "003",
    narration: "Chief Gates",
    date_created: "Information Technology IT",
    date_updated: "Cash Advance",
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
    title: "Narration",
    key: "narration",
  },
  {
    title: "Date Created",
    key: "date_created",
  },
  {
    title: "Date updated",
    key: "date_updated",
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
// let mockRowOptions = [
//   { name: "Edit Record", action: () => {} },
//   { name: "Approve Request", action: () => {} },
//   { name: "Decline Request", action: () => {} },
// ];

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

  const PaymentReqStateApprove = useTablesState(
    (state) => state.PaymentReqStateApprove
  );
  const setPaymentReqStateApprove = useTablesState(
    (state) => state.setPaymentReqStateApprove
  );

  /**Data Fetching */
  let data = [{}];

  let mockRowOptions = [
    { name: "Edit Record", action: () => {} },
    {
      name: "Approve Request",
      action: () => {
        setPaymentReqStateApprove();
      },
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
      {/* model button */}
      <div>
        <AppModalTemplate
          isOpen={PaymentReqStateApprove}
          setIsOpen={setPaymentReqStateApprove}
        >
          <section className="flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center items-center flex-col gap-2">
              <div>
                <CiWarning className="text-4xl text-[#946300]" />
              </div>
              <div className="text-2xl text-[#946300]">Approve Narration?</div>
            </div>
            <div className="flex flex-col justify-start gap-1">
              <div className="text-sm ">
                <span className="opacity-50 text-sm">Please add comments</span>
                <span className="text-red-500">*</span>
              </div>
              <textarea
                cols={45}
                placeholder="enter reason for approval"
                rows={5}
                className="bg-[#D9E9DA] p-2 rounded-md"
              />
            </div>
            <div className="flex justify-between w-full">
              {ButtonNormal({ text: "No, Cancel" })}
              {ButtonNormal({ text: "Yes, Decline", stylebtn: false })}
            </div>
          </section>
        </AppModalTemplate>
        <button onClick={() => setPaymentReqStateApprove()}>model</button>
      </div>
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
