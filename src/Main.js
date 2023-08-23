import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  // BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { URL } from "./utils/routes";
// import PageLoader from "./app/dashboard/Components/Loader/Loader";
import { LoggedInRoute, ProtectedRoutes } from "./utils/ProtectedRoutes";

import ViewAccidentReport from "./app/dashboard/Pages/Fleets/Accident/ViewAccidentReport";
import ViewMaintenanceRequisition from "./app/dashboard/Pages/Fleets/Maintenance/ViewMaintenanceRequisition";
import { getMyPermissions } from "./utils/functions/GetMyPermissions";
import { DEFINED_PERMISSIONS } from "./utils/const";

import ViewFleet from "./app/dashboard/Pages/Fleets/AllFleets/ViewFleet";
import CostCenterServiceSetup from "./app/dashboard/Pages/Finance/CostCenter/Setup";
import CostCenterDetails from "./app/dashboard/Pages/Finance/CostCenter/Details";
import CostCenterClass from "./app/dashboard/Pages/Finance/CostCenter/Class";
import CostCenterClassSetup from "./app/dashboard/Pages/Finance/CostCenter/ClassSetup";

import CostCenterExpensesDetails from "./app/dashboard/Pages/Finance/CostCenterExpenses/Details";

const CostCenter = lazy(() =>
  import("./app/dashboard/Pages/Finance/CostCenter")
);
const CostCenterExpenses = lazy(() =>
  import("./app/dashboard/Pages/Finance/CostCenterExpenses")
);
const PayrollAutorun = lazy(() =>
  import("./app/dashboard/Pages/Finance/PayrollAutoRun/PayrollAutoRun")
);

const PayrollRun = lazy(() =>
  import("./app/dashboard/Pages/Finance/PayrollAutoRun/pages/PayrollRun")
);

const ViewStaffRemunerations = lazy(() =>
  import("./app/dashboard/Pages/Finance/PayrollAutoRun/pages/ViewStaff")
);

const Payment = lazy(() =>
  import("./app/dashboard/Pages/Finance/Payment/Payment")
);
const PaymentSetup = lazy(() =>
  import("./app/dashboard/Pages/Finance/PaymentSetup/Payment-Setup")
);
const PaymentSetupHOD = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/PaymentSetup/Payment-Setup-HOD/Payment-Setup-HOD"
  )
);
const ManageRoles = lazy(() =>
  import("./app/dashboard/Pages/Finance/PaymentSetup/Manage-Roles/Manage-Roles")
);
const CooperativeSetup = lazy(() =>
  import("./app/dashboard/Pages/Finance/CooperativeSetup/Cooperative-Setup")
);
const CooperativeComponent = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeSetup/CooperativeComponent/Cooperative-Component"
  )
);
const CreateCooperativeComponent = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeSetup/CooperativeComponent/CreateCooperativeComponent/CreateCooperativeComponent"
  )
);
const CooperativeSetupDetails = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeSetup/CooperativeSetupDetails/CooperativeSetupDetails"
  )
);
const BudgetImport = lazy(() =>
  import("./app/dashboard/Pages/Finance/BudgetImport/BudgetImport")
);
const BudgetImportDetails = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/BudgetImport/BudgetImportDetails/BudgetImportDetails"
  )
);
const CooperativeManagement = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagement"
  )
);
const CooperativeManagementApproval = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementApproval/CooperativeManagementApproval"
  )
);
const CooperativeManagementReviewer = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementReviewer/CooperativeManagementReviewer"
  )
);
const CooperativeManagementComponent = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementComponent/CooperativeManagementComponent"
  )
);
const CooperativeManagementCompApproval = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementComponent/CooperativeManagementCompApproval/CooperativeManagementCompApproval"
  )
);
const CooperativeManagementCompReviewer = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementComponent/CooperativeManagementCompReviewer/CooperativeManagementCompReviewer"
  )
);
const CooperativeManagementDetails = lazy(() =>
  import(
    "./app/dashboard/Pages/Finance/CooperativeManagement/CooperativeManagementComponent/CooperativeManagementDetails/CooperativeManagementDetails"
  )
);

const Showcase = lazy(() => import("./app/showcase"));
const Home = lazy(() => import("./app/auth"));
const Login = lazy(() => import("./app/auth/Login"));
const ForgotPassword = lazy(() => import("./app/auth/ForgotPasswordPro"));
const ResetPassword = lazy(() => import("./app/auth/ResetPasswordPro"));
const SignUp = lazy(() => import("./app/auth/SignUp"));
const EmailConfirm = lazy(() => import("./app/auth/EmailConfirmation"));
const Dashboard = lazy(() => import("./app/dashboard"));
const DashboardHome = lazy(() => import("./app/dashboard/Pages/DashboardHome"));
const Onboarding = lazy(() => import("./app/dashboard/Onboarding.js"));
const Assets = lazy(() => import("./app/dashboard/Pages/Assets"));

const VehicleMaintenance = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/AllMaintenanceRequisitions")
);
const VehicleMaintenanceRequsition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/AddRequisition")
);
const EditVehicleMaintenanceRequsition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Maintenance/EditMaintenanceRequisition")
);
const AccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/AllAccidentReport")
);
const AddAccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/AddAccidentReport")
);
const EditAccidentReport = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Accident/EditAccidentReport")
);
// const Vendors = lazy(() => import("./app/dashboard/Pages/Vendors"));
const VendorsMgt = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management")
);
const VendorsHome = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/Vendor")
);
const AddVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/AddVendor")
);

const CreateVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/CreateVendor")
);

const EditVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/EditVendor")
);

const AppraiseVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/AppraiseVendor")
);
const ViewVendor = lazy(() =>
  import("./app/dashboard/Pages/Vendors/Management/ViewVendors")
);

const Procurement = lazy(() => import("./app/dashboard/Pages/Procurement"));
const ProcDeliveryHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Delivery")
);
const ProcQuotationHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation")
);
const ProcQuotationAdd = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation/AddQuotation")
);
const ProcQuotationView = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Quotation/ViewQuotation")
);

const ProcRequisitionHome = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition")
);
const ProcRequisitionAdd = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition/AddRequisition")
);
const ProcRequisitionView = lazy(() =>
  import("./app/dashboard/Pages/Procurement/Requisition/ViewRequisition")
);
const Acquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/Acquisition")
);
const AddAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/AddNewAcquisition")
);
const ViewAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Acquisition/ViewAcquisition")
);

const Allocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/Allocation")
);
const AddAllocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/AddNewAllocation")
);
const ViewAllocation = lazy(() =>
  import("./app/dashboard/Pages/Assets/Allocation/ViewAllocation")
);

const Monitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/Monitoring")
);
const AddMonitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/AddNewMonitoring")
);
const ViewMonitoring = lazy(() =>
  import("./app/dashboard/Pages/Assets/Monitoring/ViewMonitoring")
);

const AuctioningBidding = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning (Bidding)/AuctioningBidding")
);

// const AddAuctioningBidding = lazy(() =>
//   import("./app/dashboard/Pages/Assets/Auctioning (Bidding)/AddNewAuctioning")
// );
const ViewAuctioningBidding = lazy(() =>
  import(
    "./app/dashboard/Pages/Assets/Auctioning (Bidding)/ViewAuctioningBidding"
  )
);

const Auctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/Auctioning")
);
const AddAuctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/AddNewAuctioning")
);
const ViewAuctioning = lazy(() =>
  import("./app/dashboard/Pages/Assets/Auctioning/ViewAuctioning")
);

const AssetRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/Requisition")
);
const AssetDepreciation = lazy(() =>
  import(
    "./app/dashboard/Pages/AssetsSetUp/AssetDepreciation/AssetDepreciation"
  )
);
const AddRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/AddNewRequisition")
);
const ViewAssetRequisition = lazy(() =>
  import("./app/dashboard/Pages/Assets/Requisition/ViewRequisition")
);

const AssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/AssetRegister")
);
const AddAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/AddAssetRegister")
);
const ViewAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/ViewAssetRegister")
);
const EditAssetRegister = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/AssetRegister/EditAssetRegister")
);
const Categories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/Categories")
);
const AddCategories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/AddNewCategories")
);
const ViewCategories = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Categories/ViewCategories")
);

const ConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/ConsummableRegister"
  )
);
const AddConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/AddConsummableRegister"
  )
);
const ViewConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/ViewConsummableRegister"
  )
);
const EditConsummablesRegister = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableRegister/EditConsummableRegister"
  )
);
const ConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/ConsummableCategories"
  )
);
const AddConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/AddNewConsummableCategories"
  )
);
const ViewConsummablesCategories = lazy(() =>
  import(
    "./app/dashboard/Pages/ConsummableSetUp/ConsummableCategories/ViewConsummableCategories"
  )
);

const Budget = lazy(() =>
  import("./app/dashboard/Pages/AssetsSetUp/Budget/Budget")
);

const ConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/Acquisition")
);
const AddConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/AddNewAcquisition")
);
const ViewConsumableAcquisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Acquisition/ViewAcquisition")
);

const ConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/Allocation")
);
const AddConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/AddNewAllocation")
);
const ViewConsumableAllocation = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Allocation/AddNewAllocation")
);

const ConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/Requisition")
);
const AddConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/AddNewRequisition")
);
const ViewConsumableRequisition = lazy(() =>
  import("./app/dashboard/Pages/Consumables/Requisition/ViewRequisition")
);
//hr
const HR = lazy(() => import("./app/dashboard/Pages/HR"));
//fleet
const Fleet = lazy(() => import("./app/dashboard/Pages/Fleets"));
const Fleets = lazy(() => import("./app/dashboard/Pages/Fleets/AllFleets"));
// const ViewFleet = lazy(() => import("./app/dashboard/Pages/Fleets/AllFleets/ViewFleet"))
const Requisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/Requisition")
);
const AddFuelRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/AddNewFuelRequisition")
);
const ViewRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/ViewFuelRequisition")
);
const EditRequisition = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Requisition/EditRequisition")
);
const FuelPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/FuelPayment")
);
const AddFuelPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/AddNewFuelPayment")
);
const ViewPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/ViewPayment")
);
const EditPayment = lazy(() =>
  import("./app/dashboard/Pages/Fleets/Payment/EditPayment")
);
const DriverActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/DriverActivity")
);
const AddActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/AddActivity")
);
const EditActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/EditActivity")
);
const ViewDriverActivity = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/ViewDriverActivity")
);
const AllDriverActivities = lazy(() =>
  import("./app/dashboard/Pages/Fleets/DriverActivities/AllDriverActivities")
);

const Permissions = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions")
);

const CreateStaff = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions/CreateStaff")
);

const EditStaffPermission = lazy(() =>
  import("./app/dashboard/Pages/Settings/Permissions/EditStaffPermissions")
);

const ReportIndex = lazy(() => import("./app/dashboard/Pages/Reports/index"));
const ReportsAdd = lazy(() => import("./app/dashboard/Pages/Reports/add"));
/*
const GenerateReports = lazy(() =>
  import("./app/dashboard/Pages/Reports/GenerateReports")
);

const ReportConfiguration = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration")
);

const ReportConfigurationDetails = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration/details")
);

const ReportConfigurationAdd = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportConfiguration/add")
);

const ReportScheduler = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportScheduler")
);

const AddReportScheduler = lazy(() =>
  import("./app/dashboard/Pages/Reports/ReportScheduler/addSchedule")
);
*/

const LeaveRequisition = lazy(() =>
  import("./app/dashboard/Pages/HR/Leave/LeaveRequistion")
);
const AddLeave = lazy(() => import("./app/dashboard/Pages/HR/Leave/AddLeave"));

const ViewLeave = lazy(() =>
  import("./app/dashboard/Pages/HR/Leave/ViewLeave")
);

const EditLeave = lazy(() =>
  import("./app/dashboard/Pages/HR/Leave/EditLeave")
);

const LeaveMain = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveMainPage/LeaveMain")
);
const LeaveApprovalHOD = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveApprovalHOD/LeaveApprovalHOD")
);
const LeaveApproval = lazy(() =>
  import("./app/dashboard/Pages/HR/LeaveApproval/LeaveApproval")
);

const RSALinking = lazy(() =>
  import("./app/dashboard/Pages/HR/RSALinking/RSALinking")
);

const RSAApproval = lazy(() =>
  import("./app/dashboard/Pages/HR/RSAApproval/RSAApproval")
);

function Main() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const userPermissions = getMyPermissions();
  console.log(
    "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n my permissions na ",
    userPermissions
  );
  return (
    <>
      <Suspense>
        <Routes location={background || location}>
          <Route path={URL.Home} element={<Home />} />
          <Route path={URL.ResetPassword} element={<ResetPassword />} />
          <Route element={<LoggedInRoute />}>
            <Route path={URL.Login} element={<Login />} />
            <Route path={URL.ForgotPassword} element={<ForgotPassword />} />
            <Route path={URL.SignUp} element={<SignUp />} />
            <Route path={URL.Email_Verified} element={<EmailConfirm />} />
          </Route>
          <Route path={"/showcase"} element={<Showcase />} />
          {userPermissions.includes(DEFINED_PERMISSIONS.Vendor) && (
            <>
              <Route path={URL.Vendors} element={<p>Vendors</p>} />
              {userPermissions.includes(DEFINED_PERMISSIONS.VendorCreate) && (
                <Route element={<ProtectedRoutes />}>
                  <Route path={URL.Onboarding} element={<Onboarding />} />
                </Route>
              )}
            </>
          )}
          <Route path={URL.Procurement} element={<p>Procurement</p>} />
          {userPermissions.includes(DEFINED_PERMISSIONS.AssetView) && (
            <Route path={URL.Assets} element={<Assets />}>
              <Route path={URL.Acquisition} element={<Acquisition />} />
              <Route path={URL.Add_Acquitions} element={<AddAcquisition />} />
              <Route
                path={URL.View_Acquisition}
                element={<ViewAcquisition />}
              />
            </Route>
          )}
          <Route path={URL.Reports} element={<p>Reports</p>} />
          <Route path={URL.Inventory} element={<p>Inventory</p>} />
          <Route path={URL.HR} element={<p>HR</p>} />
          <Route path={URL.Relationship} element={<p>Relationship</p>} />

          {/* <Route element={<ProtectedRoutes />}>
            <Route path={URL.Dashboard} element={<Dashboard />}>
            <Route index element={<DashboardHome />} /> */}

          <Route element={<ProtectedRoutes />}>
            <Route path={URL.Dashboard} element={<Dashboard />}>
              <Route index element={<DashboardHome />} />

              {userPermissions.includes(DEFINED_PERMISSIONS.Vendor) && (
                <Route path={URL.Vendors} element={<VendorsMgt />}>
                  <Route index element={<VendorsHome />} />
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.VendorCreate
                  ) && (
                    <>
                      <Route path={URL.Add_Vendor} element={<AddVendor />} />
                      <Route
                        path={URL.Create_Vendor}
                        element={<CreateVendor />}
                      />
                    </>
                  )}
                  <Route
                    path={`:id/${URL.View_Vendor}`}
                    element={<ViewVendor />}
                  />
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.VendorManager
                  ) && (
                    <>
                      <Route path={`:id/edit`} element={<EditVendor />} />

                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.VendorManager
                      ) && (
                        <Route
                          path={`:id/appraise/:type`}
                          element={<AppraiseVendor />}
                        />
                      )}
                    </>
                  )}
                </Route>
              )}

              <Route path={URL.Procurement} element={<Procurement />}>
                <Route index element={<Outlet />} />
                {userPermissions.includes(
                  DEFINED_PERMISSIONS.QuotationView
                ) && (
                  <Route
                    path={URL.Quotation_Management}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<ProcQuotationHome />} />
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.QuotationAdd
                    ) && (
                      <>
                        <Route
                          path={":id/add"}
                          element={<ProcQuotationAdd />}
                        />
                        <Route
                          path={":id/edit"}
                          element={<ProcQuotationAdd />}
                        />
                      </>
                    )}
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.QuotationView
                    ) && (
                      <>
                        <Route
                          path={`:id/view`}
                          element={<ProcQuotationView />}
                        />
                      </>
                    )}
                  </Route>
                )}
                {userPermissions.includes(
                  DEFINED_PERMISSIONS.ProcurementRequisitionDashboard
                ) && (
                  <Route path={URL.Requisition_Management} element={<Outlet />}>
                    <Route index element={<ProcRequisitionHome />} />
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.ProcurementRequisitionDashboard
                    ) && (
                      <>
                        <Route path={"add"} element={<ProcRequisitionAdd />} />
                        <Route
                          path={":id/edit"}
                          element={<ProcRequisitionAdd />}
                        />
                      </>
                    )}
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.ProcurementRequisitionView
                    ) && (
                      <Route
                        path={`:id/view`}
                        element={<ProcRequisitionView />}
                      />
                    )}
                  </Route>
                )}
                {userPermissions.includes(DEFINED_PERMISSIONS.DeliveryView) && (
                  <>
                    <Route path={URL.Delivery} element={<Outlet />}>
                      <Route index element={<ProcDeliveryHome />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.DeliveryView
                      ) && (
                        <>
                          <Route
                            path={"add"}
                            element={<ProcRequisitionAdd />}
                          />
                          <Route
                            path={":id/edit"}
                            element={<ProcRequisitionAdd />}
                          />
                        </>
                      )}

                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.DeliveryView
                      ) && (
                        <Route
                          path={`:id/view`}
                          element={<ProcRequisitionView />}
                        />
                      )}
                    </Route>
                    <>
                      <Route path={`:id/edit`} element={<EditVendor />} />
                      <Route
                        path={`:id/appraise/:type`}
                        element={<AppraiseVendor />}
                      />
                    </>
                  </>
                )}
              </Route>

              {userPermissions.includes(DEFINED_PERMISSIONS.ConsumableView) && (
                <Route path={URL.Consumables} element={<Procurement />}>
                  <Route index element={<Outlet />} />
                  <Route
                    path={URL.Consumable_Acqusition}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<ConsumableAcquisition />} />
                    {userPermissions.includes(
                      DEFINED_PERMISSIONS.ConsumableAdd
                    ) && (
                      <Route
                        path={"add"}
                        element={<AddConsumableAcquisition />}
                      />
                    )}
                    <Route
                      path={`:id/view`}
                      element={<ViewConsumableAcquisition />}
                    />
                  </Route>

                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ConsumableAllocationView
                  ) && (
                    <Route
                      path={URL.Consumable_Allocation}
                      element={<Outlet />}
                    >
                      <Route index element={<ConsumableAllocation />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableAllocationAdd
                      ) && (
                        <Route
                          path={"add"}
                          element={<AddConsumableAllocation />}
                        />
                      )}
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableAllocationView
                      ) && (
                        <Route
                          path={`:id/view`}
                          element={<ViewConsumableAllocation />}
                        />
                      )}
                    </Route>
                  )}
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.ConsumableRequisitionView
                  ) && (
                    <Route
                      path={URL.Consumable_Requsition}
                      element={<Outlet />}
                    >
                      <Route index element={<ConsumableRequisition />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.ConsumableRequisitionAdd
                      ) && (
                        <Route
                          path={"add"}
                          element={<AddConsumableRequisition />}
                        />
                      )}
                      <Route
                        path={`:id/view`}
                        element={<ViewConsumableRequisition />}
                      />
                    </Route>
                  )}
                </Route>
              )}
              {userPermissions.includes(DEFINED_PERMISSIONS.AssetView) && (
                <Route path={URL.AssetSetUp} element={<Procurement />}>
                  <Route index element={<Outlet />} />
                  <Route
                    path={URL.AssetRegister}
                    element={<Outlet action={() => console.log("lll")} />}
                  >
                    <Route index element={<AssetRegister />} />

                    <Route path={"add"} element={<AddAssetRegister />} />
                    <Route path={`:id/view`} element={<ViewAssetRegister />} />
                    <Route path={`:id/edit`} element={<EditAssetRegister />} />
                  </Route>
                  {userPermissions.includes(
                    DEFINED_PERMISSIONS.AssetCategoryView
                  ) && (
                    <Route path={URL.Categories} element={<Outlet />}>
                      <Route index element={<Categories />} />
                      {userPermissions.includes(
                        DEFINED_PERMISSIONS.AssetCategoryAdd
                      ) && <Route path={"add"} element={<AddCategories />} />}
                      <Route path={`:id/view`} element={<ViewCategories />} />
                    </Route>
                  )}

                  <Route path={URL.Budget} element={<Budget />} />
                </Route>
              )}
              <Route path={URL.ConsummableSetUp} element={<Procurement />}>
                <Route index element={<Outlet />} />
                <Route
                  path={URL.ConsummbaleRegister}
                  element={<Outlet action={() => console.log("lll")} />}
                >
                  <Route index element={<ConsummablesRegister />} />
                  <Route path={"add"} element={<AddConsummablesRegister />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewConsummablesRegister />}
                  />
                  <Route
                    path={`:id/edit`}
                    element={<EditConsummablesRegister />}
                  />
                </Route>
                <Route path={URL.ConsummableCategories} element={<Outlet />}>
                  <Route index element={<ConsummablesCategories />} />
                  <Route path={"add"} element={<AddConsummablesCategories />} />
                  <Route
                    path={`:id/view`}
                    element={<ViewConsummablesCategories />}
                  />
                </Route>
                <Route path={URL.Budget} element={<Budget />} />
              </Route>

              {/* <Route path={URL.Procurement} element={<p>Procurement</p>} /> */}
              {userPermissions.includes(DEFINED_PERMISSIONS.AssetManager) && (
                <Route path={URL.Assets} element={<Assets />}>
                  <Route index element={<Acquisition />} />
                  <Route path={URL.Acquisition} element={<Outlet />}>
                    <Route index element={<Acquisition />} />
                    <Route
                      path={URL.Add_Acquitions}
                      element={<AddAcquisition />}
                    />
                    <Route
                      path={`:id/${URL.View_Acquisition}`}
                      element={<ViewAcquisition />}
                    />
                  </Route>
                  <Route path={URL.Allocation} element={<Outlet />}>
                    <Route index element={<Allocation />} />
                    <Route path={"add"} element={<AddAllocation />} />
                    <Route path={`:id/view`} element={<ViewAllocation />} />
                  </Route>
                  <Route path={URL.Requisition} element={<Outlet />}>
                    <Route index element={<AssetRequisition />} />
                    <Route path={"add"} element={<AddRequisition />} />
                    <Route
                      path={`:id/view`}
                      element={<ViewAssetRequisition />}
                    />
                  </Route>
                  <Route path={URL.Monitoring} element={<Outlet />}>
                    <Route index element={<Monitoring />} />
                    <Route path={"add"} element={<AddMonitoring />} />
                    <Route path={`:id/view`} element={<ViewMonitoring />} />
                  </Route>
                  <Route path={URL.Auctioning} element={<Outlet />}>
                    <Route index element={<Auctioning />} />
                    <Route path={"add"} element={<AddAuctioning />} />
                    <Route path={`:id/view`} element={<ViewAuctioning />} />
                  </Route>
                  <Route path={URL.AuctionBidding} element={<Outlet />}>
                    <Route index element={<AuctioningBidding />} />
                    <Route path={"add"} element={<AddAuctioning />} />
                    <Route
                      path={`:id/view`}
                      element={<ViewAuctioningBidding />}
                    />
                  </Route>
                </Route>
              )}
              <Route path={URL.Fleets} element={<Fleet />}>
                <Route index element={<Outlet />} />
                <Route path={URL.Fleet_Management} element={<Outlet />}>
                  <Route index element={<Fleets />} />
                  <Route path={`:id/view`} element={<ViewFleet />} />
                </Route>
                <Route path={URL.Requisition} element={<Outlet />}>
                  <Route index element={<Requisition />} />
                  <Route
                    path={URL.Add_Requisitions}
                    element={<AddFuelRequisition />}
                  />
                  <Route path={`:id/edit`} element={<EditRequisition />} />
                  <Route path={`:id/view`} element={<ViewRequisition />} />
                </Route>
                <Route path={URL.Fuel_Payment} element={<Outlet />}>
                  <Route index element={<FuelPayment />} />
                  <Route path={"add"} element={<AddFuelPayment />} />
                  <Route path={`:id/edit`} element={<EditPayment />} />
                  <Route path={`:id/view`} element={<ViewPayment />} />
                </Route>
                <Route path={URL.Driver_Activity} element={<Outlet />}>
                  <Route index element={<DriverActivity />} />
                  <Route path={"add"} element={<AddActivity />} />
                  <Route path={`:id/edit`} element={<EditActivity />} />
                  <Route path={`:id/view`} element={<ViewDriverActivity />} />
                  <Route
                    path={URL.All_DriverActivity}
                    element={<AllDriverActivities />}
                  />
                </Route>
                <Route path={URL.Vehicle_Maintenance} element={<Outlet />}>
                  <Route index element={<VehicleMaintenance />} />
                  <Route
                    path={"add"}
                    element={<VehicleMaintenanceRequsition />}
                  />
                  <Route
                    path={":id/edit"}
                    element={<EditVehicleMaintenanceRequsition />}
                  />
                  <Route
                    path={`:id/view`}
                    element={<ViewMaintenanceRequisition />}
                  />
                </Route>
                <Route path={URL.Accident_Report} element={<Outlet />}>
                  <Route index element={<AccidentReport />} />
                  <Route path={"add"} element={<AddAccidentReport />} />
                  <Route path={":id/edit"} element={<EditAccidentReport />} />
                  <Route path={`:id/view`} element={<ViewAccidentReport />} />
                </Route>
              </Route>

              <Route path={URL.Reports} element={<Outlet />}>
                <Route index element={<ReportIndex />} />
                <Route path={"add"} element={<ReportsAdd />} />
                <Route
                  path={"edit/:id"}
                  element={<ReportsAdd isEdit={true} />}
                />
                {/*
                  <Route
                      path={URL.Generate_Report}
                      element={<GenerateReports/>}
                  />
                  <Route path={URL.Report_configuration} element={<Outlet/>}>
                    <Route index element={<ReportConfiguration/>}/>
                    <Route path={"add"} element={<ReportConfigurationAdd/>}/>
                    <Route
                        path={":id"}
                        element={<ReportConfigurationDetails/>}
                    />
                  </Route>
                  <Route path={URL.Report_scheduler} element={<Outlet/>}>
                    <Route index element={<ReportScheduler/>}/>
                    <Route path={"add"} element={<AddReportScheduler/>}/>
                  </Route>
                  */}
              </Route>
              <Route path={URL.Inventory} element={<p>Inventory</p>} />
              <Route path={URL.HR} element={<HR />}>
                <Route index element={<Outlet />} />
                {/* <Route path={URL.Training} element={<Outlet />}>
                  <Route index element={<Training />} />
                  <Route path={"add"} element={<AddTrainingRequisition />} />

                  <Route path={":id/edit"} element={<EditAccidentReport />} />
                  <Route path={`:id/view`} element={<ViewAccidentReport />} />
                </Route>
             */}
                <Route index element={<LeaveRequisition />} />
                <Route path={URL.Leave_Requisition} element={<Outlet />}>
                  <Route index element={<LeaveRequisition />} />

                  <Route path={URL.Add_Leave} element={<AddLeave />} />
                  <Route path={":id/edit"} element={<EditLeave />} />

                  <Route path={`:id/view`} element={<ViewLeave />} />
                </Route>
                <Route path={URL.Leave_Approval} element={<Outlet />}>
                  <Route index element={<LeaveApproval />} />
                </Route>
                <Route path={URL.Leave_HOD} element={<Outlet />}>
                  <Route index element={<LeaveApprovalHOD />} />
                </Route>
              </Route>
              <Route path={URL.Relationship} element={<p>Relationship</p>} />
              <Route path={URL.Settings} element={<Outlet />}>
                {userPermissions.includes(
                  DEFINED_PERMISSIONS.PermissionManager
                ) && (
                  <>
                    <Route path={URL.Permissions} element={<Outlet />}>
                      <Route index element={<Permissions />} />
                      <Route
                        path={URL.Create_Staff}
                        element={<CreateStaff />}
                      />
                      <Route
                        path={`${URL.Edit_Staff}/:id`}
                        element={<CreateStaff isEdit={true} />}
                      />
                      <Route
                        path={`${URL.Edit_Staff_Permissions}/:id`}
                        element={<EditStaffPermission isEdit={true} />}
                      />
                    </Route>
                  </>
                )}
              </Route>
              <Route path={URL.finance} element={<Outlet />}>
                {/* {userPermissions.includes(
                  DEFINED_PERMISSIONS.FinanceManager
                ) && ( */}

                <Route path={URL.CostCentre} element={<Outlet />}>
                  <Route index element={<CostCenter />} />
                  <Route
                    path={URL.CostCenterSetup}
                    element={<CostCenterServiceSetup />}
                  />
                  <Route
                    path={URL.CostCenterClass}
                    element={<CostCenterClass />}
                  />
                  <Route
                    path={URL.CostCenterClassSetup}
                    element={<CostCenterClassSetup />}
                  />
                  <Route path={`:id/view`} element={<CostCenterDetails />} />
                </Route>
                <Route path={URL.CostCenterExpenses} element={<Outlet />}>
                  <Route index element={<CostCenterExpenses />} />
                  <Route
                    path={`:id/view`}
                    element={<CostCenterExpensesDetails />}
                  />
                </Route>
                <Route path={URL.PayrollAutorun} element={<Outlet />}>
                  <Route index element={<PayrollAutorun />} />
                  {/* <Route
                      path={URL.Create_Staff}
                      element={<CreateStaff />}
                    /> */}
                </Route>
                <Route path={`${URL.PayrollAutorun}/payroll`}>
                  <Route index element={<PayrollRun />} />
                </Route>
                <Route path={`${URL.PayrollAutorun}/view-staff`}>
                  <Route index element={<ViewStaffRemunerations />} />
                </Route>
                <Route path={URL.Payment} element={<Outlet />}>
                  <Route index element={<Payment />} />
                </Route>
                <Route path={URL.PaymentSetup} element={<Outlet />}>
                  <Route index element={<PaymentSetup />} />
                </Route>
                <Route path={URL.PaymentSetupHOD} element={<Outlet />}>
                  <Route index element={<PaymentSetupHOD />} />
                </Route>
                <Route path={URL.ManageRoles} element={<Outlet />}>
                  <Route index element={<ManageRoles />} />
                </Route>
                <Route path={URL.CooperativeSetup} element={<Outlet />}>
                  <Route index element={<CooperativeSetup />} />
                </Route>
                <Route path={URL.CooperativeComponent} element={<Outlet />}>
                  <Route index element={<CooperativeComponent />} />
                </Route>
                <Route
                  path={URL.CreateCooperativeComponent}
                  element={<Outlet />}
                >
                  <Route index element={<CreateCooperativeComponent />} />
                </Route>
                <Route path={URL.CooperativeSetupDetails} element={<Outlet />}>
                  <Route index element={<CooperativeSetupDetails />} />
                </Route>
                <Route path={URL.BudgetImport} element={<Outlet />}>
                  <Route index element={<BudgetImport />} />
                </Route>
                <Route path={URL.BudgetImportDetails} element={<Outlet />}>
                  <Route index element={<BudgetImportDetails />} />
                </Route>
                <Route path={URL.CooperativeManagement} element={<Outlet />}>
                  <Route index element={<CooperativeManagement />} />
                </Route>
                <Route
                  path={URL.CooperativeManagementReviewer}
                  element={<CooperativeManagementReviewer />}
                >
                  <Route index element={<CooperativeManagement />} />
                </Route>
                <Route
                  path={URL.CooperativeManagementApproval}
                  element={<Outlet />}
                >
                  <Route index element={<CooperativeManagementApproval />} />
                </Route>
                <Route
                  path={URL.CooperativeManagementComponent}
                  element={<Outlet />}
                >
                  <Route index element={<CooperativeManagementComponent />} />
                </Route>
                <Route
                  path={URL.CooperativeManagementCompApproval}
                  element={<Outlet />}
                >
                  <Route
                    index
                    element={<CooperativeManagementCompApproval />}
                  />
                </Route>
                <Route
                  path={URL.CooperativeManagementCompReviewer}
                  element={<Outlet />}
                >
                  <Route
                    index
                    element={<CooperativeManagementCompReviewer />}
                  />
                </Route>
                <Route
                  path={URL.CooperativeManagementDetails}
                  element={<Outlet />}
                >
                  <Route index element={<CooperativeManagementDetails />} />
                </Route>
                {/* )} */}
              </Route>
              <Route path={"*"} element={<p>Not Found</p>} />
              <Route
                path={`/dashboard/Asset-Setup/depreciation`}
                element={<Outlet />}
              >
                <Route index element={<AssetDepreciation />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default Main;
