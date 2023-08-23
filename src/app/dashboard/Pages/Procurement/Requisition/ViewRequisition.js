import React, { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import {
  ApproveProcRequsition,
  DeclineProcRequsition,
  DeleteProcRequsition,
  GetSingleProcRequisitions,
  NotifyProcRequsition,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import Table from "../../../Components/Table/Table";
import { useApprovals } from "../../Vendors/VendorApprovals/useApprovals";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewProcRequisition() {
  const navigate = useNavigate();

  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();

  const data = useSelector((state) => state?.procurement);
  const vendor = data?.proc_req_data?.responseObject;

  const { id } = useParams();

  useEffect(() => {
    // dispatch(GetSingleVendor(id));
    dispatch(GetSingleProcRequisitions(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({});

  return (
    <PageLayout title={"Requisition Details"} hasBack={true}>
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Approve Requisition",
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
                        ApproveProcRequsition({
                          comment: data?.comments,
                          procurementRequsitionId: id,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcRequisitions(id));
                      });
                    },
                  },
                });
              },
              permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionApproval
            },
            {
              name: "Decline Requisition",
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Suspend",
                      color: "red",
                    },
                    title: "Suspend Account",
                    submitData: (data) => {
                      dispatch(
                        DeclineProcRequsition({
                          comment: data?.comments,
                          procurementRequsitionId: id,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcRequisitions(id));
                      });
                    },
                  },
                });
              },
              permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionApproval
            },

            {
              name: "Delete Requisition",
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Delete",
                      color: "red",
                    },
                    isDelete: true,
                    isDeleteHero: "",
                    isDeleteSupport:
                      "Are you sure you want to delete this requisition? This action cannot be undone.",
                    title: "Delete Asset Requisition",
                    submitData: (data) => {
                      dispatch(
                        DeleteProcRequsition({
                          comment: data?.comments,
                          id: +id,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        if (res?.payload?.successful === true) {
                          closeModal();
                          // dispatch(GetSingleProcRequisitions(id));
                          navigate("../");
                        }
                      });
                    },
                  },
                });
              },
              permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionApproval
            },
            {
              name: "Notify Vendors",
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Notify",
                      // color: "red",
                    },
                    isOther: true,
                    isDeleteHero: "",
                    isOtherSupport:
                      "Are you sure you want to notify vendors about this requisition?",
                    title: "Notify Vendors",
                    submitData: (data) => {
                      dispatch(
                        NotifyProcRequsition({
                          comment: data?.comments,
                          procurementRequsitionId: id,
                          emailTrigger: true,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleProcRequisitions(id));
                      });
                    },
                  },
                });
              },
            },

            {
              name: "Update Requisition",
              action: () => {
                navigate(`../${id}/edit`, { state: vendor });
              },
              permissions: !DEFINED_PERMISSIONS.ProcurementRequisitionAdd
            },
            {
              name: "Submit Quotation",
              action: () => {
                navigate(`/dashboard/procurement/quotation/${id}/add`, {
                  state: vendor,
                });
              },
              permissions: !DEFINED_PERMISSIONS.QuotationAdd
            },
          ]}
        </PageActions>
      </div>
      <FormProvider {...formMethods}>
        <FormTemplate
          className={DashboardStyle.view_app_components}
          handleSubmit={handleSubmit(submit)}
        >
          <section
            style={{
              backgroundColor: "#F8FBF8",
              border: "1px solid #D9E9DA",
              borderRadius: "8px",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Process <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Initiated By:</p>
                    <h4>{vendor?.initiatorName}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>{FormatDateTime(vendor?.dateCreated, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Created By:</p>
                    <h4>{vendor?.initiatorName}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>{FormatDateTime(vendor?.dateCreated, "ll")}</h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Last Reviewed:</p>
                    <h4>{vendor?.lastReveiwed?.lastReviewedBy}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      gap: "0.6rem",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ marginBottom: "0px" }}>Date:</p>
                    <h4>
                      {FormatDateTime(vendor?.lastReveiwed?.lastReveiwedByDate)}
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{vendor?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
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
                    {vendor?.registrationStatus}
                  </h4>
                </div>
                <div>
                  <button className={DashboardStyle.view_more_action_button}>
                    <span>Preview Stage</span>{" "}
                    <FiExternalLink
                      className={DashboardStyle.view_more_action_button_icon}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section
            style={{
              borderTop: "unset",
            }}
            className={DashboardStyle.form_section}
          >
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Asset Name</p>
                  <h4>{vendor?.assetName}</h4>
                </div>
                <div>
                  <p>Procurement Type</p>
                  <h4>{vendor?.procurementType}</h4>
                </div>
                <div>
                  <p>Description</p>
                  <h4>{vendor?.description}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Unit Price</p>
                  <h4>{vendor?.unitPrice}</h4>
                </div>
                <div>
                  <p>Quantity</p>
                  <h4>{vendor?.quantity}</h4>
                </div>
                <div>
                  <p>Total Price</p>
                  <h4>{vendor?.totalPrice}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Beneficiary <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              {vendor?.beneficiaryEl?.map((x) => (
                <div>
                  <div>
                    <p>Beneficiary Name</p>
                    <h4>{x?.beneficiaryName}</h4>
                  </div>

                  <div>
                    <p>Department</p>
                    <h4>
                      {x?.department ||
                        `${!x?.branch ? "-" : x?.beneficiaryName}`}
                    </h4>
                  </div>
                  <div>
                    <p>Branch</p>
                    <h4>{x?.branch || x?.beneficiaryName}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Vendor <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {vendor?.vendors?.map((x) => (
                  <div
                    style={{
                      width: "210px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <GoPrimitiveDot color="var(--primary-color)" />
                    <h4>{x?.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Uploads
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Date Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendor?.documents?.map((x, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{x?.fileName}</td>
                      <td>{x?.fileType}</td>
                      <td>{FormatDateTime(x?.dateUploaded)}</td>
                      <td>
                        <TableActionsDownload url={x?.fileUrl} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default ViewProcRequisition;
