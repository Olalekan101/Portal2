import { URL } from "../../../../utils/routes";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiFolderPlus,
  FiSettings,
} from "react-icons/fi";
import { RiPulseLine } from "react-icons/ri";
import { DEFINED_PERMISSIONS } from "../../../../utils/const";

export const sidebar = [
  {
    iconIMG: ({ top }) => <FiHome size={"1.4rem"} style={{ marginTop: top }} />,
    iconTag: "Dashboard",
    iconLink: "/dashboard",
    linkEnd: true,
    linkPermissions: "",
  },
  {
    iconIMG: ({ top }) => (
      <FiUsers size={"1.4rem"} style={{ marginTop: top }} />
    ),
    iconTag: "Vendors",
    iconLink: URL?.Vendors,
    linkEnd: false,
    linkPermissions: DEFINED_PERMISSIONS.VendorManager,
    hasSubLinks: false,
  },

  {
    iconIMG: ({ top }) => (
      <FiFolderPlus size={"1.4rem"} style={{ marginTop: top }} />
    ),
    iconTag: "Procurement",
    iconLink: URL?.Procurement,
    linkEnd: false,
    linkPermissions: DEFINED_PERMISSIONS.ProcurementRequisitionDashboard,
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Requisition",
        subUrl: URL?.Procurement + "/" + URL?.Requisition_Management,
        linkPermissions: DEFINED_PERMISSIONS.ProcurementRequisitionDashboard,
      },
      {
        sublink: "Quotation",
        subUrl: URL?.Procurement + "/" + URL?.Quotation_Management,
        linkPermissions: DEFINED_PERMISSIONS.ProcurementRequisitionDashboard,
      },
      {
        sublink: "Delivery",
        subUrl: URL?.Procurement + "/" + URL?.Delivery,
        linkPermissions: DEFINED_PERMISSIONS.ProcurementRequisitionDashboard,
      },
    ],
  },
  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Assets",
    iconLink: URL?.Assets,
    linkEnd: false,
    linkPermissions: DEFINED_PERMISSIONS.AssetView,
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Asset Acquisition",
        subUrl: URL?.Assets + "/" + URL?.Acquisition,
        linkPermissions: DEFINED_PERMISSIONS.AssetAcquisitionView,
      },
      {
        sublink: "Asset Allocation",
        subUrl: URL?.Assets + "/" + URL?.Allocation,
        linkPermissions: DEFINED_PERMISSIONS.AssetAllocationView,
      },
      {
        sublink: "Asset Requisition",
        subUrl: URL?.Assets + "/" + URL?.Requisition,
        linkPermissions: DEFINED_PERMISSIONS.AssetRequisitionView,
      },
      {
        sublink: "Asset Monitoring",
        subUrl: URL?.Assets + "/" + URL?.Monitoring,
        // linkPermissions: DEFINED_PERMISSIONS.AssetView,
      },
      {
        sublink: "Asset Auctioning",
        subUrl: URL?.Assets + "/" + URL?.Auctioning,
        linkPermissions: DEFINED_PERMISSIONS.AssetAuctionView,
      },
      {
        sublink: "Auctioning (Bidding)",
        subUrl: URL?.Assets + "/" + URL?.AuctionBidding,
        linkPermissions: DEFINED_PERMISSIONS.AssetBidView,
      },
    ],
  },
  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Consumable Mgt",
    iconLink: URL?.Consumables,
    linkEnd: false,
    linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Acquisition",
        subUrl: URL?.Consumables + "/" + URL?.Consumable_Acqusition,
        linkPermissions: DEFINED_PERMISSIONS.ConsumableView,
      },
      {
        sublink: "Allocation",
        subUrl: URL?.Consumables + "/" + URL?.Consumable_Allocation,
        linkPermissions: DEFINED_PERMISSIONS.ConsumableAllocationView,
      },
      {
        sublink: "Requisition",
        subUrl: URL?.Consumables + "/" + URL?.Consumable_Requsition,
        linkPermissions: DEFINED_PERMISSIONS.ConsumableRequisitionView,
      },
    ],
  },

  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Asset Setup",
    iconLink: URL?.AssetSetUp,
    linkEnd: false,
    linkPermissions: "AssetView",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Asset Register",
        subUrl: URL?.AssetSetUp + "/" + URL?.AssetRegister,
        linkPermissions: "Request_Asset",
      },
      {
        sublink: "Categories",
        subUrl: URL?.AssetSetUp + "/" + URL?.Categories,
        linkPermissions: "",
      },
      {
        sublink: "Budget",
        subUrl: URL?.AssetSetUp + "/" + URL?.Budget,
        linkPermissions: "",
      },
      {
        sublink: "Asset Depreciation & Net Book Value",
        subUrl: URL?.AssetSetUp + "/depreciation",
        linkPermissions: "",
      },
    ],
  },

  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Store & Inventory Setup",
    iconLink: URL?.ConsummableSetUp,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Consumable Register",
        subUrl: URL?.ConsummableSetUp + "/" + URL?.ConsummbaleRegister,
        linkPermissions: "",
      },
      {
        sublink: "Categories",
        subUrl: URL?.ConsummableSetUp + "/" + URL?.ConsummableCategories,
        linkPermissions: "",
      },
    ],
  },
  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Fleet Management",
    iconLink: URL?.Fleets,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Fleets",
        subUrl: URL?.Fleets + "/" + URL?.Fleet_Management,
        linkPermissions: "",
      },
      {
        sublink: "Fuel Requisition",
        subUrl: URL?.Fleets + "/" + URL?.Requisition,
        linkPermissions: "",
      },
      {
        sublink: "Fuel Payment",
        subUrl: URL?.Fleets + "/" + URL?.Fuel_Payment,
        linkPermissions: "",
      },
      {
        sublink: "Driver Activity",
        subUrl: URL?.Fleets + "/" + URL?.Driver_Activity,
        linkPermissions: "",
      },
      {
        sublink: "Vehicle Maintenance Requisition",
        subUrl: URL?.Fleets + "/" + URL?.Vehicle_Maintenance,
        linkPermissions: "",
      },
      {
        sublink: "Accident Report",
        subUrl: URL?.Fleets + "/" + URL?.Accident_Report,
        linkPermissions: "",
      },
      {
        sublink: "Generate Report",
        subUrl: URL?.Fleets + "/" + URL?.Generate_Report,
        linkPermissions: "",
      },
      {
        sublink: "Document Set-Up",
        subUrl: URL.Fleets + "/" + URL.Vehicle_Document_SetUp,
        linkPermissions: "",
      },
    ],
  },

  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "HR Services",
    iconLink: URL?.HR,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Leave Request",
        subUrl: URL.HR + "/" + URL.Leave_Requisition,
        linkPermissions: "",
      },
      {
        sublink: "Leave Approval (HR)",
        subUrl: URL.HR + "/" + URL.Leave_Approval,
        linkPermissions: "",
      },
      {
        sublink: "Leave Approval(HOD)",
        subUrl: URL.HR + "/" + URL.Leave_HOD,
        linkPermissions: "",
      },
      {
        sublink: "Training",
        subUrl: URL?.HR + "/" + URL?.Training,
        linkPermissions: "",
      },
    ],
  },

  {
    //     iconIMG: <HiHome />,
    iconTag: "Relationship",
    iconLink: URL?.Relationship,
    linkEnd: false,
    linkPermissions: "",
  },

  {
    iconIMG: () => <RiPulseLine />,
    iconTag: "Reports",
    iconLink: URL?.Reports,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: false,
    // subLinks: [
    //   {
    //     sublink: "Generate Reports",
    //     subUrl: URL?.Reports + "/" + URL?.Generate_Report,
    //     linkPermissions: "",
    //   },
    //   {
    //     sublink: "Report Configuration",
    //     subUrl: URL?.Reports + "/" + URL?.Report_configuration,
    //     linkPermissions: "",
    //   },
    //   {
    //     sublink: "Report Scheduler",
    //     subUrl: URL?.Reports + "/" + URL?.Report_scheduler,
    //     linkPermissions: "",
    //   },
    // ],
  },
  {
    iconIMG: (rest) => <FiBriefcase size={"1.4rem"} {...rest} />,
    iconTag: "Finance",
    iconLink: URL.finance,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "Payroll Auto-Run",
        subUrl: URL.finance + "/" + URL.PayrollAutorun,
        linkPermissions: "",
      },
      {
        sublink: "Payment",
        subUrl: URL.finance + "/" + URL.Payment,
        linkPermissions: "",
      },
      // {
      //   sublink: "Payment Setup HOD",
      //   subUrl: URL.finance + "/" + URL.PaymentSetupHOD,
      //   linkPermissions: "",
      // },
      {
        sublink: "Payment Setup",
        subUrl: URL.finance + "/" + URL.PaymentSetup,
        linkPermissions: "",
      },
      {
        sublink: "Payment Service",
        subUrl: URL.finance + "/" + URL.PaymentService,
        linkPermissions: "",
      },
      {
        sublink: "Cost Centre Service",
        subUrl: URL.finance + "/" + URL.CostCentre,
        linkPermissions: "",
      },
      {
        sublink: "Cost Centre Expenses",
        subUrl: URL.finance + "/" + URL.CostCenterExpenses,
        linkPermissions: "",
      },
      {
        sublink: "Company Fund",
        subUrl: URL.finance + "/" + URL.CompanyFund,
        linkPermissions: "",
      },
      {
        sublink: "Budget Import",
        subUrl: URL.finance + "/" + URL.BudgetImport,
        linkPermissions: "",
      },
      {
        sublink: "Cooperative Setup",
        subUrl: URL.finance + "/" + URL.CooperativeSetup,
        linkPermissions: "",
      },
      {
        sublink: "Cooperative Management",
        subUrl: URL.finance + "/" + URL.CooperativeManagement,
        linkPermissions: "",
      },
    ],
  },
  {
    iconIMG: ({ top }) => (
      <FiSettings size={"1.4rem"} style={{ marginTop: top }} />
    ),
    iconTag: "Settings",
    iconLink: URL?.Settings,
    linkEnd: false,
    linkPermissions: "",
    hasSubLinks: true,
    subLinks: [
      {
        sublink: "User Access Setup",
        subUrl: URL?.Settings + "/" + URL?.Permissions,
        linkPermissions: DEFINED_PERMISSIONS.PermissionManager,
      },
    ],
  },
];
