import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
  CalendarFilter,
  CalendarFilter2,
} from "../../../Components/Search/Search";
import { TableActions } from "../../../Components/Misc/Actions";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { GetAllLeaveRequest,GetAllDepartments, ApproveLeave, DeclineLeave } from "../../../../../utils/redux/HR/HRSlice";
import { useSelector, useDispatch } from "react-redux";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import {
    GetUserPermissions,
    GetUserPermissionByID,
    GetCurrentUserPermission
} from "../../../../../utils/redux/Permission/PermissionSlice";
import ApprovalData from '../ApprovalConstants/data'
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
const LeaveApproval = () => {
  const [approvalStatus, setApprovalStatus] = useState(null)
  const [search, setSearchText] = useState("");
  const [departId, setDepartId] = useState([])
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  
  const { all_request, isLoading ,all_departments } = useSelector((state) => state.hr);
//console.log(all_request)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    search: search,
  };
  useEffect(() => {
    if(approvalStatus !== null ){ 
      apiData['approvalStatus'] = approvalStatus;
   
    }
    if(search !== null && search !== "" && search !== " "){
      apiData['search'] = search;
    }
    dispatch(GetAllLeaveRequest(apiData));
     }, [pageNumber, pageSize, search,approvalStatus]);

  // let requisition = all_request?.result;

  // requisition = requisition?.filter((text) =>
  //   text?.leaveTypeName.toLowerCase().includes(searchText)
  // );

   const filterDept = all_departments?.responseObject?.pageItems?.map((item)=> item.id)
  const actionButton = (
    <>
      
    </>
  );
  const filterBy = [
   
    {
      name: "Pending",
      filter: 1,
    },
    {
      name: "Approved",
      filter: 20,
    },
    {
      name: "Rejected",
      filter: 81,
    },
  ];

  return (
    <PageStyle
      title={"Leave Approval Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearchText}/>
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={approvalStatus}
          setFilter={setApprovalStatus}
          name={"Approval Status"}
          filterBy={filterBy}
        />
        <CalendarFilter2 name="Select Date Range" setStartDate={setStartDate} setEndDate={setEndDate}/>
        <FilterButton onClick={() => setFind(true)} name="" />
   
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Employee Name</th>  
              <th>Department</th>            
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No of Days</th>
              <th>Leave Status</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <LeaveTable
              data={all_request}
              isLoading={isLoading}
              apiData={apiData}
              
            />

            {all_request?.result?.map((item) => (
              // console.log(item)
              <LeaveTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={all_request?.totalPages}
        present_page={all_request?.currentPage}
        totalRows={all_request?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default LeaveApproval;

function LeaveTable({ isLoading, data , apiData}) {
  const { openModal, closeModal } = useApprovals({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {data?.result?.map((item) => (
        <tr key={item?.id}>      
          <td>{item?.employeeName}</td>
          <td>{item?.departmentName}</td>
          <td>{item?.leaveTypeName}</td>
          <td>{FormatDateTime(item?.startDate)}</td>
          <td>{FormatDateTime(item?.endDate)}</td>
          <td>
            {item?.durationValue > 1
              ? item?.durationValue + " " + " Days"
              : item?.durationValue + " " + " Day"}
          </td>
          <td style={{ textAlign: "center" }}>   <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item?.leaveStatus === "Awaiting"
                    ? "#8DE9FF"
                    : item?.leaveStatus === "OnLeave"
                    ? "#DCFFC9"
                    : item?.leaveStatus === "Back"
                    ? "#005BD4"
                    : item?.leaveStatus === "Recalled"
                    ? "#FFFF"
                    : "",
                color:
                  item?.leaveStatus === "Awaiting"
                    ? "#FFFFf"
                    : item?.leaveStatus === "OnLeave"
                    ? "#0F6308"
                    : item?.leaveStatus === "Back"
                    ? "#FFFF"
                    : item?.leaveStatus === "Recalled"
                    ? "#FF8D8D"
                    : "",
              }}
            >
              {" "}
              {item?.leaveStatus}
            </span></td>
          <td style={{ textAlign: "center" }}>
            <span
              style={{
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "1rem",
                fontSize: "0.875rem",
                backgroundColor:
                  item?.approvalStatus==="Pending"
                    ? "#FFF1CF"
                    : item?.approvalStatus === "ApprovedByHOD"
                    ? "#DCFFC9"
                    : item?.approvalStatus === "RejectedByHOD"
                    ? "#FBE6E7"
                    : "",
                color:
                  item?.approvalStatus === "Pending"
                    ? "#815103"
                    : item?.approvalStatus === "ApprovedByHOD"
                    ? "#0F6308"
                    : item?.approvalStatus === "RejectedByHOD"
                    ? "#8A002B"
                    : "",
              }}
            >
              {" "}
              {item?.approvalStatus}
            </span>
          </td>

          <td>{item?.approvalStatus ==="RejectedByHOD" ?(
        <TableActions hasChildren={true} url={`${item.id}/view`} >
            {[
              {
                name: "Edit Requisition",
                action: () =>
                  navigate(`${item.id}/edit`, {
                    state: item ,
                  }),
                
              },
            
            ]}
          </TableActions>):item.approvalStatus === "ApprovedByHOD"? ( <TableActions hasChildren={true} url={`${item.id}/view`}>

          </TableActions>):(  
          <TableActions hasChildren={true} url={`${item.id}/view`}>
            {[
              // {
              //   name: "Edit Requisition",
              //   action: () =>
              //     navigate(`${item.id}/edit`, {
              //       state: item,
              //     }),
                
              // },
         
              {
                name: "Approve Leave",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Approve",
                        color: "",
                      },
                      title: "Approve Requisition",
                      submitData: (data) => {
                        dispatch(
                          ApproveLeave({
                            comment: data?.comments,
                            requisitionId: item?.id,
                            approvalType:ApprovalData.ApprovedByHR,


                          })
                        )?.then((res) => {
                          closeModal();
                          dispatch(GetAllLeaveRequest(apiData));
                        });
                      },
                    },
                  });
                },
              },
              {
                name: "Decline Leave",
                action: () => {
                  openModal({
                    type: "suspend",
                    details: {
                      button: {
                        name: "Yes, Decline",
                        color: "",
                      },
                      title: "Decline Requisition",
                      submitData: (data) => {
                        console.log(data)
                        dispatch(
                          DeclineLeave({
                            comment: data?.comments,
                            requisitionId: item?.id,
                            rejectionType:ApprovalData.RejectedByHR,
                        

                          })
                        )?.then((res) => {
                            console.log(data)
                          closeModal();
                          dispatch(GetAllLeaveRequest(apiData));
                        });
                      },
                    },
                  });
                },
              },

            
            ]}
          </TableActions>)}
      
        </td>
        </tr>
      ))}
    </>
  );
}

