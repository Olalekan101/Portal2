import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { TableActions } from "../../../Components/Misc/Actions";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { SearchFilter, FilterButton, CalendarFilter2, ActionButton } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { FiCalendar } from "react-icons/fi";

import {
  GetAllDriverActivity,
  GetAllFleets,
} from "../../../../../utils/redux/Fleet/FleetSlice";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

const AllDriverActivity = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateSelected, setDateSelected] = useState(new Date());

  const {isLoading ,all_fleets,all_activity } = useSelector(
    (state) => state?.fleet
  );
  console.log(all_activity)
  let start =
  startDate === undefined ? "" : format(new Date(startDate), "yyyy-MM-dd");
let end =
  endDate === undefined ? "" : format(new Date(endDate), "yyyy-MM-dd");

let requisition = all_activity?.result;
requisition = requisition?.filter((row) => {
  if (!startDate || !endDate) {
    return true;
  }
  const rowDate = new Date(row.requisitionDate);
  return rowDate >= startDate && rowDate <= endDate;
});
  

  // useEffect(() => {
  //   // console.log("DATE FROM", dateFrom)
  //   console.log("DATE ", date)
  //   return () => {};
  // }, [date]);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiData = {
    pageNumber: pageNumber,
    perPage: perPage,
    startDate: start,
    endDate: end,
    search: search,
  };

  useEffect(() => {
    if (search !== null && search !== "" && search !== " ") {
      apiData["search"] = search;
    }
    dispatch(GetAllDriverActivity(apiData));
    dispatch(GetAllFleets({ pageNumber: 1, perPage: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, perPage, search,startDate, endDate]);

  requisition = requisition?.filter(
    (row) =>
      row.driverName.toLowerCase().includes(search.toLowerCase()) ||
      row.vehicleName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageStyle
      title={"All Driver Activities"}
      hasBack={false}
      action={ActionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={setSearch} />
         <div>
      <CalendarFilter2
          name="Select Date Range"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
         </div>
       
        <FilterButton name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Asset ID</th>
              <th>Driver Name</th>
              <th>Vehicle Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            <RequestTable
              isLoading={isLoading}
              data={all_activity}
            />
          </tbody>
        </Table>
      </div>

      <Pagination
        last_page={all_activity?.totalPages}
        present_page={all_activity?.currentPage}
        totalRows={all_activity?.totalRows}
        pageSize={perPage}
        setPerPage={(page) => setPerPage(page)}
        click={(page) => setPageNumber(page)}
      />
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      ></AppModalTemplate>
    </PageStyle>
  );
};

export default AllDriverActivity;

function RequestTable({ data, isLoadingActivity }) {
  return (
    <>
      {data?.result?.map((item, index) => {
        return (
          <tr key={item?.id}>
            <td>{item?.id}</td>
            <td>{item?.assetId}</td>
            <td>{item?.driverName}</td>
            <td>{item?.vehicleName}</td>
            <td>{item?.source}</td>
            <td>{item?.destination}</td>
            <td>{FormatDateTime(item?.dateOfAssignment, "ll")}</td>
            <td>
              <TableActions
                hasChildren={true}
                url={`${item?.id}/view`}
              ></TableActions>
            </td>
          </tr>
        );
      })}
    </>
  );
}
