import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/FinancePageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter } from "../../../Components/Search/Search";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { TableActions } from "../../../Components/Misc/ActionsModVersion";
import "./style.css";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import { FiEdit2, FiEye, FiTrash } from "react-icons/fi";
import { GetCostClasses } from "../../../../../utils/redux/Finance/CostCenterSlice/CostCenterSlice";

function CostCenterClass() {
  // table state
  const tableData = useSelector((state) => state?.costCenter?.CostCenterClass);

  // Filter states
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**Data Fetching */
  useEffect(() => {
    dispatch(GetCostClasses({ pageSize, pageNumber }));
  }, [dispatch, pageNumber, pageSize, search]);

  // Action Button at the top of screen
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate(`../${URL.CostCenterClassSetup}`);
        }}
      >
        Create Class
      </CTAButtons>
    </>
  );

  // Table Headers format:
  const headerSetter = () => {
    return [
      { title: "Class Name", key: "name" },
      { title: "Actions", key: null },
    ];
  };
  let currentHeaders = headerSetter();

  // Format for "More Options" buttons:
  let mockRowOptions = [
    {
      name: "View",
      icon: <FiEye />,
      action: (rowData) => {
        console.log({ classID: rowData.id });
      },
    },
    {
      name: "Edit",
      icon: <FiEdit2 color="#946300" />,
      action: (id) => {
        /*navigate(`${id}/view`)*/
      },
    },
    { name: "Delete", icon: <FiTrash color="#E61B00" />, action: (id) => {} },
  ];

  return (
    <RouteLayout title={"Finance"}>
      <PageStyle
        title={"Class List"}
        hasBack={true}
        isMain={true}
        action={[actionButton]}
      >
        <div className={DashboardStyle.dashboard_filter}>
          <SearchFilter text={setSearch} />
        </div>
        <div className={DashboardStyle.dashboard_table_holder}>
          <Table>
            <thead>
              <tr>
                {currentHeaders.map((header, i) => (
                  <th
                    className={`!text-[#29382A] ${
                      header.title === "Actions" && "flex justify-end !pr-6"
                    }`}
                    key={i}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <RequestTable
                isLoading={false}
                data={tableData.pageItems}
                keys={currentHeaders.map((header) => header.key)}
                selectable={false}
                rowOptions={mockRowOptions}
              />
            </tbody>
          </Table>
        </div>

        <Pagination
          last_page={tableData?.totalNumberOfPages}
          present_page={tableData?.currentPage}
          totalRows={tableData?.pageItems?.length}
          pageSize={pageSize}
          setPageSize={(page) => setPageSize(page)}
          click={(page) => setPageNumber(page)}
        />
      </PageStyle>
    </RouteLayout>
  );
}

export default CostCenterClass;

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
            </td>
          )}
          {keys
            .filter((key) => key)
            .map((key, i) => (
              <td key={i}>{item[key]}</td>
            ))}
          <td>
            {
              // Different conditions for different state
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
                  <TableActions children={rowOptions} rowData={item} url={null}>
                    {rowOptions}
                  </TableActions>
                </div>
              )
            }
          </td>
        </tr>
      ))}
    </>
  );
}
