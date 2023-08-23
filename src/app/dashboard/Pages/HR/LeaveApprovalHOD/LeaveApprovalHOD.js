import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import { CalendarFilter, FilterButton } from "../../../Components/Search/Search";
import PageStyle from "../../../Components/Layout/PageLayout";
import { GetByDepartment,ApproveLeave,DeclineLeave, GetAllLeaveRequest } from "../../../../../utils/redux/HR/HRSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProDropFilter, SearchFilter } from "../../../Components/Search/Search";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import  ApprovalData from '../ApprovalConstants/data'
import { useApprovals } from "../../Fleets/Accident/useApprovals";

const LeaveApprovalHOD = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState(0);

 


  const { get_department,isLoading } = useSelector((state) => state?.hr);
//   console.log(ApprovalData);
const navigate = useNavigate()
  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,

  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetByDepartment(apiData));
  }, []);

  const actionButton = (
    <>
      <CTAButtons onClick={() => navigate(`${URL.Add_Leave}`)}>
        Add Leave
      </CTAButtons>
    </>
  );

  const filterBy = [
    {
      name: "All",
      filter: 0,
    },
    {
      name: "Pending",
      filter: 1,
    },
    {
      name: "ApprovedByHOD",
      filter: 2,
    },
    {
      name: "RejectedByHOD",
      filter: 3,
    },
  ];
  return (
    <PageStyle
    title={"Leave Approval Management(H.O.D)"}
    hasBack={false}
    action={actionButton}
    isMain={true}
  >
    <div className={DashboardStyle.dashboard_filter}>
      <SearchFilter />
      {/* <div className={DashboardStyle.dashboard_filters}> */}
      <ProDropFilter
        filter={filter}
        setFilter={setFilter}
        name={"Status"}
        filterBy={filterBy}
      />
      {/* <CalendarFilter name="Select Date Range"/> */}
      <FilterButton  />
 
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
          <LeaveAppTable
            data={get_department}
            isLoading={isLoading}
            apiData={apiData}
            
          />

          {get_department?.result?.map((item) => (
            // console.log(item)
            <LeaveAppTable {...item} isLoading={isLoading} />
          ))}
        </tbody>
      </Table>
    </div>

    <Pagination
      last_page={get_department?.totalPages}
      present_page={get_department?.currentPage}
      totalRows={get_department?.totalRows}
      pageSize={pageSize}
      setPageSize={(page) => setPageSize(page)}
      click={(page) => setPageNumber(page)}
    />
  </PageStyle>
  )
};

export default LeaveApprovalHOD;


const LeaveAppTable = ({data,apiData})=>{
    const { openModal, closeModal } = useApprovals({});

    const navigate = useNavigate();
    const dispatch = useDispatch()
    // if (isLoading === true) {
  
    //   return <p>Loading...</p>;
    // }
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
                    : item?.approvalStatus === "ApprovedByHR"
                    ? "#DCFFC9"
                    : item?.approvalStatus === "RejectedByHR"
                    ? "#FBE6E7"
                    : "",
                color:
                  item?.approvalStatus === "Pending"
                    ? "#815103"
                    : item?.approvalStatus === "ApprovedByHR"
                    ? "#0F6308"
                    : item?.approvalStatus === "RejectedByHR"
                    ? "#8A002B"
                    : "",
              }}
            >
              {" "}
              {item?.approvalStatus}
            </span>
</td>
  <td>{item?.approvalStatus ==="RejectedByHR" ?(
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
                            approvalType:ApprovalData.ApprovedByHOD,


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
                            rejectionType:ApprovalData.RejectedByHOD,
                        

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
            {/* <td>{item?.approvalStatus === "Pending" || item?.approvalStatus == "Declined" ?(     <TableActions hasChildren={true} url={`${item?.id}/view`}>
                  {[
                    {
                      name: "Edit Requisition",
                      action: () =>
                        navigate(`${item?.id}/edit`, {
                          state: item,
                        }),
                    },
  
                  
                  ]}
                </TableActions>) : ( <TableActions hasChildren={true} url={`${item?.id}/view`}>
                  {[
                    // {
                    //   name: "Edit Requisition",
                    //   action: () =>
                    //     navigate(`${item?.id}/edit`, {
                    //       state: item,
                    //     }),
                    // },
  
                  
                  ]}
                </TableActions>)}
            
              
            </td> */}
          </tr>
        ))}
      </>
    );
}