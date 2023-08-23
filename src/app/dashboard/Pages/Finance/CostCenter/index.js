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
import { FiChevronDown, FiDelete, FiEdit2, FiEdit3, FiEye, FiTrash, FiUser, FiUsers } from "react-icons/fi";
import { FaHotel } from "react-icons/fa";
import { GetCostClasses, GetCostServices } from "../../../../../utils/redux/Finance/CostCenterSlice/CostCenterSlice";

function CostCenter() {
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
  let { CostCenterServices:data } = useSelector(state=> state.costCenter);

  useEffect(() => {
    dispatch(GetCostServices({PageSize: 100, PageNumber: 1}))
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
  const actionButton = (
    <>
      <CTAButtons onClick={() => {navigate(URL.CostCenterSetup)}}>
        Setup Cost Center Service
      </CTAButtons>
    </>
  );

  const altActionButton = (
    <button className="altActionButton" onClick={() => {navigate(URL.CostCenterClass)}}>
      Class
    </button>
  );

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
  let mockData = data? 
  data.pageItems.map((item, i)=> {
    console.log({limit: item.limit})
    return {
      id: i+1,
      departments: item.department.description,
      employees: item.employee.accountName,
      positions: item.employee.positionCode,
      branch: item.employee.branchName,
      ammount_alloted: FormatCurrency(item.limit),
    }
  }) : []
  // let mockData = [
  //   {
  //     id: "000",
  //     employees: "Tobi Gates",
  //     positions: "Front-end Engineer",
  //     departments: "Information Technology IT",
  //     branch: "Head Office",
  //     amount_alloted: FormatCurrency(350000)
  //   },
  //   {
  //     id: "001",
  //     employees: "Dami Gates",
  //     positions: "Front-end Engineer",
  //     departments: "Information Technology IT",
  //     branch: "Head Office",
  //     amount_alloted: FormatCurrency(350000)
  //   },
  //   {
  //     id: "002",
  //     employees: "Sunday Gates",
  //     positions: "Front-end Engineer",
  //     departments: "Information Technology IT",
  //     branch: "Head Office",
  //     amount_alloted: FormatCurrency(350000)
  //   },
  //   {
  //     id: "003",
  //     employees: "Chief Gates",
  //     positions: "Front-end Engineer",
  //     departments: "Information Technology IT",
  //     branch: "Head Office",
  //     amount_alloted: FormatCurrency(350000)
  //   },
    
  // ]

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
        title: "Amount Alloted",
        key: "amount_alloted",
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
        title: "Amount Alloted",
        key: "amount_alloted",
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
    {name: "View", icon: <FiEye />, action: (id)=> { navigate(`${id}/view`)}},
    {name: "Edit", icon: <FiEdit2 color="#946300" />, action: ()=> {}},
    {name: "Delete", icon: <FiTrash color="#E61B00" />, action: ()=> {}},
  ]

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        title={"Cost Center service setup"}
        hasBack={false}
        action={[altActionButton, actionButton]}
        isMain={true}
        preChildren={preTableDiv}
      >
        {tableSwitch}
        <div className={DashboardStyle.dashboard_filter}>
          <SearchFilter text={setSearch} />
          {/* 
            <ProDropFilter
              filter={null}
              setFilter={null}
              name={"Status"}
              filterBy={filterBy}
            />
          */}
          {/* <CalendarFilter2
            name="Select Date Range"
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          /> */}
          {/* <FilterButton onSubmit={()=> {}} onClick={() => setFilterModal(prev=> !prev)} name="" /> */}

          {/* <ActionButton
            filter={filters}
            setFilter={setFilters}
            name={"Action"}
            placeholder={"Action"}
            filterBy={actionTaken}
            onChange={() => {
              // setup onChange Function
            }}
          /> */}
        </div>
        <div className={DashboardStyle.dashboard_table_holder}>
          <Table>
            <thead>
              <tr>
                {/* <th>
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
                </th> */}
                {
                  currentHeaders.map((header, i)=> <th className={`!text-[#29382A] ${header.title==='Actions' && "flex justify-end !pr-6"}`} key={i}>{header.title}</th>)
                }
              </tr>
            </thead>
            <tbody>
              <RequestTable
                isLoading={false}
                data={mockData}
                keys={currentHeaders.map(header=> header.key)}
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

export default CostCenter;

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
            keys.filter(key=> key).map((key, i) => (<td key={i}>{item[key]}</td>))
          }
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
