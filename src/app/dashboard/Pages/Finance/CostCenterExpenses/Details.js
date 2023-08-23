import React, { useEffect} from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/FinancePageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router";
import { GetSingleFuelRequest,ApproveFuelRequest,DeclineFuelRequest} from "../../../../../utils/redux/Fleet/FleetSlice";
import { PageActions,TableActionsDownload } from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import { useApprovals } from "../../Fleets/Requisition/RequisitionApproval/useApproval";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import styleJS from "./styleJS";
import ProgressDiv from "../../../Components/Misc/ProgressBar";
import { BackButtons } from "../../../../global/components/Buttons/buttons";
import { IoArrowBackOutline } from "react-icons/io5";

function CostCenterDetails() {
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "all",
  });
  const {
    handleSubmit,
  } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };
  const dispatch = useDispatch();
  const getRequest = useSelector((state) => state?.fleet);
  const { get_request, isLoading } = getRequest;
  const request = get_request?.responseObject;
  console.log(request)

  const {id} = useParams() 
  useEffect(()=>{
    /**Call Details Endpoint with ID from Params */
    // dispatch(GetSingleFuelRequest(id))
 
  },[id])
 
  let backBtn = (
    <div>
      <button onClick={() => navigate(-1)} className={`rounded-lg border-solid border-[1px] border-[#A0BDA2] p-4 py-3 flex space-x-[10px] text-[#4B664C] text-[13px] font-[600]`}>
        <IoArrowBackOutline className={`text-[20px]`} />
        <p>Back</p>
      </button>
    </div>
  )

  const { openModal,closeModal } = useApprovals({});
  return (
    <RouteLayout>
        <PageLayout title={"Cost Center Expense Details"} backBtn={backBtn} >
        <FormProvider {...formMethods}>
            <FormTemplate className={DashboardStyle.view_app_components} handleSubmit={handleSubmit(submit)}>
            <section  style={{
                backgroundColor: "#F8FBF8",
                border: "1px solid #D9E9DA",
                borderRadius: "8px",
                }} className={DashboardStyle.form_section}>
                <h4 className={DashboardStyle.form_section_title}>
                    Basic<br/> Information
                </h4>
                <div className={DashboardStyle.labels_group}>
                <div>
                    <div>
                        <p>Individual:</p>
                        <h4>{request?.employee || "Victor Akiti"}</h4>
                    </div>
                    <div>
                        <p>Prosition:</p>
                        <h4>{"Software Engineer"}</h4>
                    </div>
                    <div>
                        <p>Department:</p>
                        <h4>{"Information Technology"}</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Branch</p>
                        <h4>{request?.branch || "Head Office"}</h4>
                    </div>
                    <div>
                        <p>Limit:</p>
                        <h4>{request?.limit || FormatCurrency(631000)}</h4>
                    </div>
                    <div>
                        <p>Duration:</p>
                        <h4>{request?.duration || "Monthly"}</h4>
                    </div>
                </div>
                </div>
            </section>
            <section  style={{
                backgroundColor: "#F8FBF8",
                border: "1px solid #D9E9DA",
                borderRadius: "8px",
                }} className={DashboardStyle.form_section}>
                <h4 className={DashboardStyle.form_section_title}>
                    Financial<br/> Information
                </h4>
                <div className={DashboardStyle.labels_group}>
                <div>
                    <div>
                        <p>Total Amount:</p>
                        <h4>{request?.limit || FormatCurrency(800000)}</h4>
                    </div>
                    <div>
                        <p>Amount Expended:</p>
                        <h4>{request?.limit || FormatCurrency(631000)}</h4>
                    </div>
                    <div>
                        <p>Amount Left:</p>
                        <h4>{request?.limit || FormatCurrency(262740)}</h4>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Amount Left %:</p>
                        <h4>{request?.branch || <ProgressDiv percent={30} />}</h4>
                    </div>
                    <div>
                        <p>Status:</p>
                        <h4 className={`text-pink-600 !font-[500]`}>{request?.status || "Unpaid"}</h4>
                    </div>
                </div>
                </div>
            </section>
            <section className={`flex justify-end space-x-2 mt-10`}>
                <button onClick={()=>{}} className={`${styleJS.details.editActionButton} bg-[#305F32] !border-radius-[12px] !border-none !text-white !h-[45px] !pt-4`}>
                    Paid
                </button>
                <button onClick={()=>{}} className={`${styleJS.details.editActionButton} bg-[#CA024F] !border-radius-[12px] !border-none !text-white !h-[45px] !pt-4`}>
                    Unpaid
                </button>
            </section>
            </FormTemplate>
        </FormProvider>
        </PageLayout>
    </RouteLayout>
  );
}

export default CostCenterDetails;