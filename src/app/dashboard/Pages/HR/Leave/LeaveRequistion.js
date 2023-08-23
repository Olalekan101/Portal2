import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  SearchFilter,
  ProDropFilter,
  FilterButton,
} from "../../../Components/Search/Search";
import { TableActions } from "../../../Components/Misc/Actions";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import PageStyle from "../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import {  GetMyLeaveRequest } from "../../../../../utils/redux/HR/HRSlice";
import { useSelector, useDispatch } from "react-redux";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";

const LeaveRequistion = () => {
  const [searchText, setSearchText] = useState("");
  const [disableStatus, setDisableStatus]= useState(false);
  const [userRole, setUserRole] = useState('')
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { get_myrequest, isLoading } = useSelector((state) => state.hr);
  console.log(get_myrequest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const data = GetLocalStorage();

  const apiData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    searchText: searchText,
  };
  useEffect(() => {
    dispatch(GetMyLeaveRequest(apiData));
  }, [pageNumber, pageSize, searchText]);


  let requisition = get_myrequest?.result;

  requisition = requisition?.filter((text) =>
    text?.leaveTypeName.toLowerCase().includes(searchText)
  );

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
      name: "Approved",
      filter: 2,
    },
    {
      name: "Declined",
      filter: 3,
    },
  ];

  return (
    <PageStyle
      title={"Leave Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={(searchText) => setSearchText(searchText)} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <FilterButton onClick={() => setFind(true)} name="" />
        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>Initiators Name</th>
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
              data={requisition}
              isLoading={isLoading}
              apiData={apiData}
            />

            {get_myrequest?.result?.map((item) => (
              // console.log(item)
              <LeaveTable {...item} isLoading={isLoading} />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={get_myrequest?.totalPages}
        present_page={get_myrequest?.currentPage}
        totalRows={get_myrequest?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setPageNumber(page)}
      />
    </PageStyle>
  );
};

export default LeaveRequistion;

function LeaveTable({ isLoading, data,apiData }) {

  const navigate = useNavigate();
  // if (isLoading === true) {

  //   return <p>Loading...</p>;
  // }
  return (
    <>
      {data?.map((item) => (
        <tr key={item?.id}>
          <td>{item?.initiatorName}</td>
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

          <td>{item?.approvalStatus === "Pending" || item?.approvalStatus == "RejectedByHR" ?(     <TableActions hasChildren={true} url={`${item?.id}/view`}>
                {[
                  {
                    name: "Edit Requisition",
                    action: () =>
                      navigate(`${item?.id}/edit`, {
                        state: item,
                      }),
                  },

                
                ]}
              </TableActions>) : ( <TableActions hasChildren={true} url={`${item?.id}/view`}></TableActions>)}
               
          
            
          </td>
        </tr>
      ))}
    </>
  );
}
