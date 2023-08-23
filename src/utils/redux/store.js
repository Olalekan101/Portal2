import { configureStore } from "@reduxjs/toolkit";
import fleetReducer from "./Fleet/FleetSlice";
import AppReducer from "./Auth/AuthSlice";
import vendorReducer from "./Vendor/VendorSlice";
import GlobalReducer from "./Global/GlobalSlice";
import assetReducer from "./Assets/AssetSlice";
import procurementReducer from "./Procurement/ProcurementSlice";
import assetSetUpReducer from "./AssetsSetUp/AssetSetUpSlice";
import consummableReducer from "./Consumables/ConsumablesSlice";
import permissionReducer from "./Permission/PermissionSlice";
import consummableSetUpReducer from "./ConsummableSetUp/ConsummableSetUpSlice";
import hrReducer from "./HR/HRSlice";
import reportReducer from "./Report/ReportSlice";
import hr from "./HR/HRSlice";
import CostCenterSlice from "./Finance/CostCenterSlice/CostCenterSlice";
import AssetNBVSlice from "./Finance/AssetNBVSlice/AssetNBVSlice";
import PayrollSlice from "./Finance/PayrollSlice/PayrollSlice";

const store = configureStore({
  reducer: {
    global: GlobalReducer,
    auth: AppReducer,
    vendor: vendorReducer,
    assets: assetReducer,
    assetSetUp: assetSetUpReducer,
    consummableSetUp: consummableSetUpReducer,
    consumable: consummableReducer,
    procurement: procurementReducer,
    permissions: permissionReducer,
    hr: hrReducer,
    fluelRequest: fleetReducer,
    fleet: fleetReducer,
    report: reportReducer,
    hr: hr,
    costCenterService: CostCenterSlice,
    assetStore: AssetNBVSlice,
    costCenter: CostCenterSlice,
    payrollStore: PayrollSlice,
  },
});

export default store;
