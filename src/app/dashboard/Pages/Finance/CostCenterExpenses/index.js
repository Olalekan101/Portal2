import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/FinancePageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ActionButton,
  CalendarFilter2,
  ProDropFilter,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/ActionsModVersion";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { FilterButton } from "../../../Components/Search/Search";
import './style.css'
import RouteLayout from "../../../Components/Layout/RouteLayout";
import { FiCheck, FiChevronDown, FiDelete, FiEdit2, FiEdit3, FiEye, FiTrash, FiUser, FiUsers, FiX } from "react-icons/fi";
import { FaHotel } from "react-icons/fa";
import ProgressDiv from "../../../Components/Misc/ProgressBar";

function CostCenterExpenses() {
  //Pre-Table Switcher state
  const [selectedPreTable, setSelectedPreTable] = useState("Medical");
  //Table Switcher state
  const [currentTable, setCurrentTable] = useState("employee");
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
  }, [ pageNumber, pageSize, search, filters, endDate, startDate ]);

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
  

  const preTableDiv = (
    <div id="preTableDiv">
      <div>
        <p className="selectLabel">Services</p>
        <div onClick={()=>setOptionOpen(prev=> !prev)} className="selectFilter">
          <p className="placeholder">{selectedPreTable}</p>
          <div className="caret">
            <FiChevronDown size={24} color="#6E9170" />
          </div>
        </div>
        {optionOpen && 
        <div className="optionBox">
          <p className="option" onClick={(e)=> { setSelectedPreTable(e.target.innerText); setOptionOpen(false); }}>Medical</p>
          <p className="option" onClick={(e)=> { setSelectedPreTable(e.target.innerText); setOptionOpen(false); }}>Travel</p>
          <p className="option" onClick={(e)=> { setSelectedPreTable(e.target.innerText); setOptionOpen(false); }}>Marketing</p>
        </div>}
      </div>
    </div>
  )

  const tableSwitch = (
    <div id="tableSwitchContainer">
      <div className="tableSwitch">
        <div onClick={()=> setCurrentTable("employee")} className={currentTable === "employee"? "tableSwitchItemActive" : "tableSwitchItem"} >
          <div><FiUser size={16} /></div>
          <p>Employee</p>
        </div>

        <div onClick={()=> setCurrentTable("department")} className={currentTable === "department"? "tableSwitchItemActive" : "tableSwitchItem"} >
          <div><FiUsers size={16} /></div>
          <p>Department</p>
        </div>

        <div onClick={()=> setCurrentTable("branches")} className={currentTable === "branches"? "tableSwitchItemActive" : "tableSwitchItem"} >
          <div><FaHotel size={16} /></div>
          <p>Branches</p>
        </div>
      </div>
      <div className="line"></div>
    </div>
  )

  // Filter options to Map in Filter Modal
  // When Selected, it uses the corresponding key in the mapped data and filters by the selected option
  const filterBy = [
    {
      key: "positions",
      options: ["Front-end Engineer", "Developer"]
    },
    {
      key: "departments",
      options: ["Information Technology IT", "Human Resources"]
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
      departments: "Information Technology IT",
      branch: "Head Office",
      amount_expended: FormatCurrency(350000),
      amount_left: <ProgressDiv percent={50} showTailLabel />,
      status: "Unpaid",
    },
    {
      id: "001",
      employees: "Dami Gates",
      positions: "Front-end Engineer",
      departments: "Information Technology IT",
      branch: "Head Office",
      amount_expended: FormatCurrency(350000),
      amount_left: <ProgressDiv percent={20} showTailLabel />,
      status: "Unpaid",
    },
    {
      id: "002",
      employees: "Sunday Gates",
      positions: "Front-end Engineer",
      departments: "Information Technology IT",
      branch: "Head Office",
      amount_expended: FormatCurrency(350000),
      amount_left: <ProgressDiv percent={100} showTailLabel />,
      status: "Paid",
    },
    {
      id: "003",
      employees: "Chief Gates",
      positions: "Front-end Engineer",
      departments: "Information Technology IT",
      branch: "Head Office",
      amount_expended: FormatCurrency(350000),
      amount_left: <ProgressDiv percent={90} showTailLabel />,
      status: "Unpaid",
    },
    
  ]

  // Table Headers format:
  const headerSetter= ()=> {
    
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
        title: "Positions",
        key: "positions",
      },
      {
        title: "Departments",
        key: "departments",
      },
      {
        title: "Amount Expended",
        key: "amount_expended",
      },
      {
        title: "Amount Left",
        key: "amount_left",
      },
      {
        title: "Status",
        key: "status",
      },
      {
        title: "Actions",
        key: null,
      },
      
    ]
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
        title: "Amount Expended",
        key: "amount_expended",
      },
      {
        title: "Amount Left",
        key: "amount_left",
      },
      {
        title: "Status",
        key: "status",
      },
      {
        title: "Actions",
        key: null,
      },
      
    ]
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
        title: "Amount Expended",
        key: "amount_expended",
      },
      {
        title: "Amount Left",
        key: "amount_left",
      },
      {
        title: "Status",
        key: "status",
      },
      {
        title: "Actions",
        key: null,
      },
      
    ]

    return currentTable === 'employees'? EmployeeHeaders
    : currentTable === 'department'? DepartmentHeaders
    : currentTable === 'branches'? BranchesHeaders
    : EmployeeHeaders
  }
  let currentHeaders = headerSetter();
  
  // Format for "More Options" buttons:
  let mockRowOptions = [
    {name: "View", icon: <FiEye size={16} className="pt-1" />, action: (id)=> { navigate(`${id}/view`)}},
    {name: "Edit", icon: <FiCheck color="green" size={16} className="mt-0.5" />, action: ()=> {}},
    {name: "Delete", icon: <FiX color="#E61B00" size={16} className="mt-0.5" />, action: ()=> {}},
  ]

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        title={"Cost Center Expenses"}
        hasBack={false}
        action={[]}
        isMain={true}
        preChildren={preTableDiv}
      >
        {tableSwitch}
        <div className="flex justify-between items-center flex-wrap mb-4">
          <div className={`${DashboardStyle.dashboard_filter} min-w-[60%]`}>
            <SearchFilter text={setSearch} />
            
            <ProDropFilter
              filter={null}
              setFilter={null}
              name={"Select Amount"}
              filterBy={filterBy}
            />
            <ProDropFilter
              filter={null}
              setFilter={null}
              name={"Select Status"}
              filterBy={filterBy}
            />
          
            {/* <CalendarFilter2
              name="Select Date Range"
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            /> */}
            <div className="min-h-full border-solid border-4 border-transparent">
              <FilterButton onSubmit={()=> {}} onClick={() => setFilterModal(prev=> !prev)} name="" />
            </div>
          </div>
          <div>
            <ActionButton
              style={{ backgroundColor: 'darkGreen', color: 'white', justifyEnd: true}}
              filter={filters}
              setFilter={setFilters}
              name={"Action"}
              placeholder={"Action"}
              filterBy={[]}
              onChange={() => {
                // setup onChange Function
              }}
            />
          </div>
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
                    style={{ height: "20px", width: "20px", backgroundColor:'green'}}
                  />
                </th>
                {
                  currentHeaders.map((header, i)=> <th className={`!text-[#29382A] ${header.title==='Actions' && "flex justify-end !pr-6"} ${header.title === "Status" && "!text-center"}`} key={i}>{header.title}</th>)
                }
              </tr>
            </thead>
            <tbody>
              <RequestTable
                isLoading={false}
                data={mockData}
                keys={currentHeaders.map(header=> header.key)}
                selectable={true}
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

export default CostCenterExpenses;

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
           {selectable && ( 
            <td>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => HandleSelectedItems(item.id, e.target.checked)}
                style={{ height: "20px", width: "20px" }}
              />
            </td>)}
          {
            keys.filter(key=> key).map((key, i) => (key === "status"? <StatusText status={item.status} /> : <td key={i}>{item[key]}</td>))
          }
          <td>
            
            { // Different conditions for different state
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
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

function StatusText({status}){

  return (
    <td style={{ textAlign: "center" }}>
      <span
        className={`
          ${status === "Paid"? "bg-green-100 text-green-700"
            : status === "Unpaid"? "bg-red-100 text-red-700"
            : "text-gray-700"
          }
        `}
        style={{
          textAlign: "center",
          padding: "0.3rem 0.4rem",
          borderRadius: "10px",
          fontSize: "0.875rem",
          fontWeight: "600",
        }}
      >
        {status}
      </span>
    </td>
  )
}
