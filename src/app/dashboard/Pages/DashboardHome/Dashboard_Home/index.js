import React, { useState, useEffect } from "react";
import {
  FiArchive,
  FiArrowDown,
  FiArrowUp,
  FiCheckSquare,
  FiChevronDown,
  FiEdit2,
  FiExternalLink,
  FiEye,
  FiThumbsDown,
  FiThumbsUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import DBStyle from "./Style/DBHome.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import { MoreButtons } from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router";
import { URL } from "../../../../../utils/routes";
import { Link, useSearchParams } from "react-router-dom";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { GetProcRequisitionDashboard } from "../../../../../utils/redux/Procurement/ProcurementSlice";
import { GetAssetAcquisitionDashboard } from "../../../../../utils/redux/Assets/AssetSlice";
import { useDispatch, useSelector } from "react-redux";

const pieData = [
  { name: "Initiated", value: 6 },
  { name: "Processing", value: 10 },
  { name: "Completed", value: 8 },
  { name: "Declined", value: 16 },
];
const pieColors = ["#0041AC", "#EAAC30", "#008A00", "#E61B00"];
const quick_links = [
  {
    name: "Add New Vendor",
    url: URL.Add_Vendor,
  },
  {
    name: "Add Asset Requisition",
    url: URL.Add_Requisitions,
  },
  {
    name: "Add Fuel Requisition",
    url: URL.Fuel_Requisition,
  },
  {
    name: "Add Procurement Requisition",
    url: URL.Procurement,
  },
  {
    name: "Add Maintenance Requisition",
    url: URL.Vehicle_Maintenance,
  },
];

function DashboardHome() {
  // const { fullName } = GetLocalStorage();
  const fullName = "Test";
  const [params, setParams] = useSearchParams({});
  const get_table_type = params.get("table_type");
  const dispatch = useDispatch();

  const { assetAcquisitionDashboard } = useSelector((state) => state?.assets);
  const { assetAcquisition, consumableAcquisition } =
    assetAcquisitionDashboard?.responseObject
      ? assetAcquisitionDashboard.responseObject
      : {};

  const { procurementRequisitionDashboard } = useSelector(
    (state) => state?.procurement
  );
  const procReqDashboard = procurementRequisitionDashboard?.responseObject;

  const tasksCount = [
    {
      number: "N/A",
      image: <FiUserCheck className={DBStyle.tasks_count_cards_icon} />,
      name: "Assigned to Me",
      url: "",
    },
    {
      number: procReqDashboard?.initiated.toString()
        ? procReqDashboard.initiated
        : "N/A",
      image: <FiCheckSquare className={DBStyle.tasks_count_cards_icon} />,
      name: "Initiated",
      url: "",
    },
    {
      number: procReqDashboard?.processing.toString()
        ? procReqDashboard.processing
        : "N/A",
      image: <FiArchive className={DBStyle.tasks_count_cards_icon} />,
      name: "Completed",
      url: "",
    },
    {
      number: procReqDashboard?.completed.toString()
        ? procReqDashboard.completed
        : "N/A",
      image: <FiUsers className={DBStyle.tasks_count_cards_icon} />,
      name: "Rejected",
      url: "",
    },
  ];

  useEffect(() => {
    dispatch(GetProcRequisitionDashboard());
    dispatch(GetAssetAcquisitionDashboard());
  }, []);

  return (
    <div className={DBStyle.DB_Layout}>
      <div className={DBStyle.salutation_group}>
        <div className={DBStyle.salutation}>
          <h3>Welcome, {`${fullName}`}</h3>
          <small>Last login date: April 29, 2019 13:00</small>
        </div>
        <div className={DBStyle.btn_outline_container}>
          <button className={DBStyle.btn_outline}>
            Today
            <FiChevronDown />
          </button>
        </div>
      </div>
      <div className={DBStyle.task_count}>
        {tasksCount?.map(({ name, url, image, number }, index) => (
          <div className={DBStyle.tasks_count_cards} key={index}>
            {image}
            <div>
              <p>{number}</p>
              <h5>{name}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className={DBStyle.service_card_container}>
        <div className={DBStyle.service_card}>
          <div className={DBStyle.service_card_head_green}>
            <h5>Vendor</h5>
            <div>108</div>
          </div>
          <div className={DBStyle.service_card_body}>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Processing</p>
                <div>45</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowUp /> 8%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Completed</p>
                <div>58</div>
              </div>
              <div className={DBStyle.service_item_right_negative}>
                <FiArrowDown /> 12%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Declined</p>
                <div>5</div>
              </div>
              <div className={DBStyle.service_item_right_negative}>
                <FiArrowDown /> 12%
              </div>
            </div>
          </div>
        </div>
        <div className={DBStyle.service_card}>
          <div className={DBStyle.service_card_head_orange}>
            <h5>Procurement Requisition</h5>
            <div>{procReqDashboard?.initiated}</div>
          </div>
          <div className={DBStyle.service_card_body}>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Initiated</p>
                <div>{procReqDashboard?.initiated}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowUp /> 10%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Processing</p>
                <div>{procReqDashboard?.completed}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowDown /> 8%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Completed</p>
                <div>{procReqDashboard?.completed}</div>
              </div>
              <div className={DBStyle.service_item_right_negative}>
                <FiArrowDown /> 12%
              </div>
            </div>
          </div>
        </div>
        <div className={DBStyle.service_card}>
          <div className={DBStyle.service_card_head_green}>
            <h5>Asset Acquisition</h5>
            <div>{assetAcquisition?.initiated}</div>
          </div>
          <div className={DBStyle.service_card_body}>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Initiated</p>
                <div>{assetAcquisition?.initiated}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowUp /> 10%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Processing</p>
                <div>{assetAcquisition?.processing}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowDown /> 8%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Completed</p>
                <div>{assetAcquisition?.completed}</div>
              </div>
              <div className={DBStyle.service_item_right_negative}>
                <FiArrowDown /> 12%
              </div>
            </div>
          </div>
        </div>
        <div className={DBStyle.service_card}>
          <div className={DBStyle.service_card_head_orange}>
            <h5>Consumable Acquisition</h5>
            <div>{consumableAcquisition?.initiated}</div>
          </div>
          <div className={DBStyle.service_card_body}>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Initiated</p>
                <div>{consumableAcquisition?.initiated}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowUp /> 10%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Processing</p>
                <div>{consumableAcquisition?.processing}</div>
              </div>
              <div className={DBStyle.service_item_right_positive}>
                <FiArrowDown /> 8%
              </div>
            </div>
            <div className={DBStyle.service_item}>
              <div className={DBStyle.service_item_left}>
                <p>Completed</p>
                <div>{consumableAcquisition?.completed}</div>
              </div>
              <div className={DBStyle.service_item_right_negative}>
                <FiArrowDown /> 12%
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageStyle className={DBStyle.ql} title={""} hasBack={false}>
        <h3 className={DashboardStyle.db_table_header}>Quick Links</h3>
        <div className={DBStyle.quick_links}>
          {quick_links?.map(({ name, url }, index) => (
            <Link to={url}>
              <div className={DBStyle.quick_link_cards} key={index}>
                <FiExternalLink
                  color={"#6E9170"}
                  className={DBStyle.quick_link_icon}
                />
                <p>{name}</p>
              </div>
            </Link>
          ))}
        </div>
      </PageStyle>
      <PageStyle className={DBStyle.db_tbl} title={""} hasBack={false}>
        <h3 className={DashboardStyle.db_table_header}>My Pending Task</h3>
        <div className={DashboardStyle.table_navs}>
          <Link
            to={"?table_type=pending_approvals"}
            className={`${DashboardStyle.table_navs_button}
           ${
             get_table_type === "pending_approvals" || get_table_type === null
               ? `${DashboardStyle.table_navs_button_isActive}`
               : ``
           }
         `}
          >
            <p>Pending Approvals</p>
            <div>
              <span>1</span>
            </div>
          </Link>
          <Link
            to={"?table_type=initiated_request"}
            className={`${DashboardStyle.table_navs_button}
            ${
              get_table_type === "initiated_request"
                ? `${DashboardStyle.table_navs_button_isActive}`
                : ``
            }
          `}
          >
            <p>Initial Requests</p>
            <div>
              <span>1</span>
            </div>
          </Link>
          <Link
            to={"?table_type=rejected"}
            className={`${DashboardStyle.table_navs_button} ${
              get_table_type === "rejected"
                ? `${DashboardStyle.table_navs_button_isActive}`
                : ``
            }`}
          >
            <p>Rejected</p>
            <div>
              <span>1</span>
            </div>
          </Link>
          <Link
            to={"?table_type=completed"}
            className={`${DashboardStyle.table_navs_button} ${
              get_table_type === "completed"
                ? `${DashboardStyle.table_navs_button_isActive}`
                : `${DashboardStyle.table_navs_button}`
            }
            
          `}
          >
            <p>Completed</p>
            <div>
              <span>1</span>
            </div>
          </Link>
        </div>
        <h4 className={DashboardStyle.db_table_alert}>
          You have 1 new requests pending your approval
        </h4>
        <div className={DashboardStyle.dashboard_table_holder}>
          <AcqTable />
        </div>
        <Pagination />
      </PageStyle>
      <PageStyle className={DBStyle.request_stat} title={""} hasBack={false}>
        <h3 className={DBStyle.request_stat_head}>Request statistics</h3>
        <div className={DBStyle.request_stat_body}>
          <div className={DBStyle.request_stat_chart}>
            <div className={DBStyle.request_stat_chart_text}>
              <p>Total Request</p>
              <div>30</div>
            </div>
            <div className={DBStyle.request_stat_stat}>
              <PieChart width={170} height={170}>
                <Pie
                  data={pieData}
                  cx={80}
                  cy={80}
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className={DBStyle.request_stat_items_container}>
            <div className={DBStyle.request_stat_items}>
              <div className={DBStyle.request_stat_item}>
                <span className={DBStyle.request_stat_item_completed}></span>
                <p>Completed</p>
                <div>
                  <p>4</p>
                  <p>20%</p>
                </div>
              </div>
              <div className={DBStyle.request_stat_item}>
                <span className={DBStyle.request_stat_item_processing}></span>
                <p>Processing</p>
                <div>
                  <p>4</p>
                  <p>20%</p>
                </div>
              </div>
            </div>
            <div className={DBStyle.request_stat_items}>
              <div className={DBStyle.request_stat_item}>
                <span className={DBStyle.request_stat_item_declined}></span>
                <p>Declined</p>
                <div>
                  <p>8</p>
                  <p>40%</p>
                </div>
              </div>
              <div className={DBStyle.request_stat_item}>
                <span className={DBStyle.request_stat_item_initiated}></span>
                <p>initiated</p>
                <div>
                  <p>23</p>
                  <p>15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageStyle>
    </div>
  );
}

export default DashboardHome;

function AcqTable({ isApprove, setIsApprove, isDecline, setIsDecline }) {
  const navigate = useNavigate();
  return (
    <Table>
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Request Type</th>
          <th>Submitted By</th>
          <th>Date Submitted</th>
          <th>Date Last Updated</th>
          <th>Last Updated by</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100000654327</td>
          <td>Vendor Onboarding </td>
          <td>Odunewu Idowu</td>
          <td>
            29/11/2022 <br /> 08:12:34 PM
          </td>
          <td>
            29/11/2022 <br /> 08:12:34 PM
          </td>
          <td>Odunewu Idowu</td>
          <td>
            <MoreButtons>
              <button
                onClick={() => setIsApprove(!isApprove)}
                className={DashboardStyle.more_action_button}
              >
                <FiThumbsUp color={"var(--success)"} /> <span>Approve</span>
              </button>
              <button
                onClick={() => setIsDecline(!isDecline)}
                className={DashboardStyle.more_action_button}
              >
                <FiThumbsDown color={"var(--error)"} /> <span>Decline</span>
              </button>
              <button
                onClick={() => navigate(URL.Add_Acquitions + "?type=edit")}
                className={DashboardStyle.more_action_button}
              >
                <FiEdit2 color={"var(--warning)"} />{" "}
                <span>Edit Asset Monitoring</span>
              </button>
              <button
                onClick={() => navigate(URL.View_Acquisition)}
                className={DashboardStyle.more_action_button}
              >
                <FiEye /> <span>View More Detail</span>
              </button>
            </MoreButtons>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
