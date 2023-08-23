import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import {
  SearchFilter,
  ProDropFilter,
  CalendarFilter,
  FilterButton,
} from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetVendors } from "../../../../../utils/redux/Vendor/VendorSlice";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { ApproveModals } from "../../../Components/Modals/ApproveDeclineModals";
import {
  ApproveProcRequsition,
  DeclineProcRequsition,
  GetProcRequisitions,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { TableActions } from "../../../Components/Misc/Actions";
import {
  CheckBox,
  FormTemplate,
  RadioBox,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import PermissionCheck from "../../../../../utils/PermissionCheck";

function ProcRequisition() {
  const [date, setDate] = useState({});
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoadingVendors } = useSelector((state) => state?.vendor);
  const { all_proc_requisitions } = useSelector((state) => state?.procurement);
  const { comments, requestId } = useSelector((state) => state?.global);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiData = {
    filter: filter,
    pageSize: pageSize,
    currentPage: currentPage,
    searchText: searchText,
    stateDate: date?.from,
    endDate: date?.to,
    sort,
  };

  // console.log({ all_proc_requisitions });

  useEffect(() => {
    dispatch(GetProcRequisitions(apiData));
    // dispatch(
    //   GetVendors({
    //     filter: filter,
    //     pageSize: pageSize,
    //     currentPage: currentPage,
    //     sort,
    //   })
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find, pageSize, currentPage]);

  const actionButton = (
      <>
        <PermissionCheck>
          <CTAButtons onClick={() => navigate("add")}>Add Requisition</CTAButtons>
        </PermissionCheck>
      </>
  );

  const filterBy = [
    {
      name: "All",
      filter: 0,
    },
    {
      name: "Initiated",
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

  const sortBy = [
    {
      name: "Asset",
      filter: 0,
    },
    {
      name: "Consummable",
      filter: 1,
    },
  ];
  return (
    <PageStyle
      title={"Requisition Management"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <SearchFilter text={(searchText) => setSearchText(searchText)} />
        {/* <div className={DashboardStyle.dashboard_filters}> */}
        <ProDropFilter
          filter={sort}
          setFilter={setSort}
          name={"Requisition Type"}
          filterBy={sortBy}
        />
        <ProDropFilter
          filter={filter}
          setFilter={setFilter}
          name={"Status"}
          filterBy={filterBy}
        />
        <CalendarFilter
          date={(date) => setDate(date)}
          name="Select Date Range"
        />
        <FilterButton onClick={() => setFind(true)} name="" />
        {/* </div> */}
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <AcqTable
          data={all_proc_requisitions}
          isLoadingVendors={isLoadingVendors}
        />
      </div>
      <Pagination
        last_page={all_proc_requisitions?.totalPages}
        present_page={all_proc_requisitions?.currentPage}
        totalRows={all_proc_requisitions?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      />
      <ApproveModals
        declineAction={() =>
          dispatch(
            DeclineProcRequsition({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetVendors(apiData));
            }
          })
        }
        approvalAction={() =>
          dispatch(
            ApproveProcRequsition({
              requestId: requestId,
              comment: comments,
            })
          ).then((res) => {
            if (res?.payload?.successful === true) {
              dispatch(GetVendors(apiData));
            }
          })
        }
      />
    </PageStyle>
  );
}

export default ProcRequisition;

function AcqTable({ data, isLoadingVendors }) {
  const formMethods = useForm({
    mode: "all",
  });

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;

  console.log(watch());

  const s = (d) => {
    console.log({ d });
  };

  useEffect(() => {
    if (watch()?.all === false) {
      data?.result?.map?.((x) => setValue(`${x?.id}`, false));
    }
  }, [watch()?.all]);

  if (isLoadingVendors === true) {
    return <p>Loading...</p>;
  }
  return (
    <FormProvider {...formMethods}>
      <FormTemplate handleSubmit={handleSubmit(s)}>
        <Table>
          <thead>
            <tr>
              {/* <th>
                <CheckBox
                  // name={"all_manything"}
                  camelCase={"all"}
                  value={"all"}
                  group="all"
                  // isRequired={false}
                  moreRegister={{
                    onChange: (e) => {
                      // console.log(e.target)
                      // console.log("yyyy", e.target.value);
                      if (e.target.value === "all") {
                        data?.result?.map?.((x) =>
                          setValue(`${x?.id}`, `${x?.id}`)
                        );

                        // if (e.target.value !== "all") {
                        //   data?.result?.map?.((x) =>
                        //     setValue(`${x?.id}`, false)
                        //   );
                        // }
                      } else
                        data?.result?.map?.((x) => setValue(`${x?.id}`, false));
                    },
                  }}
                />
              </th> */}
              <th>Id</th>
              <th>Type</th>
              <th>Name</th>
              <th>Beneficiaries</th>
              <th>Specification</th>
              <th>Quantity</th>
              <th>Vendor Notified</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map?.((vendor) => (
              <tr key={vendor?.id}>
                {/* <td>
                  <CheckBox
                    name={""}
                    value={`${vendor?.id}`}
                    group={`${vendor?.id}`}
                    camelCase={`${vendor?.id}`}
                  />
                </td> */}
                <td>{vendor?.id}</td>
                <td>{vendor?.procurementType}</td>
                <td>{vendor?.assetName}</td>
                <td>{vendor?.beneficiaries}</td>
                <td>{vendor?.specification}</td>
                <td>{vendor?.quantity}</td>
                <td>{vendor?.vendors}</td>
                <td>{FormatDateTime(vendor?.dateCreated, "ll")}</td>
                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      borderRadius: "1rem",
                      fontSize: "0.875rem",
                      backgroundColor:
                        vendor?.registrationStatus === "Initiated"
                          ? "#FFF1CF"
                          : vendor?.registrationStatus === "Approved"
                          ? "#DCFFC9"
                          : vendor?.registrationStatus === "Declined"
                          ? "#FBE6E7"
                          : "",
                      color:
                        vendor?.registrationStatus === "Initiated"
                          ? "#815103"
                          : vendor?.registrationStatus === "Approved"
                          ? "#0F6308"
                          : vendor?.registrationStatus === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {" "}
                    {vendor?.registrationStatus}
                  </span>
                </td>
                <td>
                  <TableActions url={`${vendor?.id}/view`} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FormTemplate>
    </FormProvider>
  );
}
