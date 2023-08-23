import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  ApproveVendorAction,
  BlackListVendor,
  DeclineVendorAction,
  GetSingleVendor,
  SuspendVendorAction,
} from "../../../../../utils/redux/Vendor/VendorSlice";
// this
import { useNavigate, useParams } from "react-router";
import { FormatDateTime } from "../../../../../utils/functions/ResourceFunctions";
import Table from "../../../Components/Table/Table";
import {
  PageActions,
  TableActionsDownload,
} from "../../../Components/Misc/Actions";
import { useApprovals } from "../VendorApprovals/useApprovals";
import SetUpVendor from "./SetUpVendors";
import { DEFINED_PERMISSIONS } from "../../../../../utils/const";

function ViewVendor(props) {
  const navigate = useNavigate();
  const formMethods = useForm({
    mode: "all",
  });
  const { handleSubmit } = formMethods;

  const submit = (e) => {
    alert("clicked");
  };

  const dispatch = useDispatch();

  const { all_vendors, isLoading } = useSelector((state) => state?.vendor);
  const vendor = all_vendors?.responseObject;

  const { id } = useParams();

  useEffect(() => {
    dispatch(GetSingleVendor({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { openModal, closeModal } = useApprovals({});
  const [openSetUpModal, setOpenSetUpModal] = useState(false);
  return (
    <PageLayout title={"Vendor Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Setup Account",
              action: () => setOpenSetUpModal(!openSetUpModal),
            },
            {
              name: "Edit Details",
              condition:
                vendor?.registrationState === "Approved" ? true : false,
              action: () => navigate(`../${id}/edit`, { state: vendor }),
              permissions: DEFINED_PERMISSIONS.VendorCreate,
            },
            {
              name: "Approve Account",
              condition:
                vendor?.registrationState === "Declined" ||
                vendor?.registrationState === "Approved"
                  ? true
                  : false,
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Approve",
                      color: "",
                    },
                    isLoading: isLoading,
                    commentIsOptional: false,
                    title: "Approve Account",
                    submitData: (data) => {
                      dispatch(
                        ApproveVendorAction({
                          comment: data?.comments,
                          requestId: vendor?.requestId,
                          emailTrigger: data?.send,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleVendor({ id }));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.VendorApproval,
            },
            {
              name: "Suspend Account",
              condition:
                vendor?.registrationState !== "Initiated" ? true : false,
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Suspend",
                      color: "red",
                    },
                    commentIsOptional: false,
                    title: "Suspend Account",
                    submitData: (data) => {
                      dispatch(
                        SuspendVendorAction({
                          comment: data?.comments,
                          requestId: vendor?.requestId,
                          emailTrigger: data?.send,
                          isLoading: isLoading,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleVendor({ id }));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.VendorManager,
            },
            {
              name: "Decline Account",
              condition:
                vendor?.registrationState !== "Initiated" ? true : false,
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Decline",
                      color: "red",
                    },
                    // commentIsOptional: false,
                    title: "Decline Account",
                    submitData: (data) => {
                      dispatch(
                        DeclineVendorAction({
                          comment: data?.comments,
                          requestId: vendor?.requestId,
                          emailTrigger: data?.send,
                          isLoading: isLoading,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleVendor({ id }));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.VendorApproval,
            },
            {
              name: "Blacklist Account",
              condition: !vendor?.performance?.projectStartDate ? true : false,
              action: () => {
                openModal({
                  type: "suspend",
                  details: {
                    button: {
                      name: "Yes, Blacklist",
                      color: "red",
                    },
                    // commentIsOptional: false,
                    title: "Blacklist Account",
                    submitData: (data) => {
                      dispatch(
                        BlackListVendor({
                          comment: data?.comments,
                          requestId: vendor?.requestId,
                          emailTrigger: data?.send,
                          isLoading: isLoading,
                        })
                      )?.then((res) => {
                        closeModal();
                        dispatch(GetSingleVendor({ id }));
                      });
                    },
                  },
                });
              },
              permissions: DEFINED_PERMISSIONS.VendorManager,
            },
            {
              name: `${
                !vendor?.performance?.projectStartDate
                  ? "Appraise Vendor"
                  : "View Appraisal"
              }`,
              condition:
                vendor?.registrationState !== "Approved" ? true : false,
              action: () =>
                navigate(
                  `../${id}/appraise/${
                    !vendor?.performance?.projectStartDate ? "create" : "view"
                  }`,
                  { state: vendor }
                ),
              permissions: DEFINED_PERMISSIONS.VendorManager,
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
            <div className={DashboardStyle.labels_group_special}>
              <div>
                <div>
                  <p>Initiated By:</p>
                  <h4>{vendor?.initiatedBy || "-"}</h4>
                </div>
                <div>
                  <p>Process Type:</p>
                  <h4>Vendor Management</h4>
                </div>

                <div>
                  <p>Date Initiated:</p>
                  <h4>{FormatDateTime(vendor?.dateCreated, "ll")}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Level of Approval:</p>
                  <h4>{vendor?.levelsOfApproval || "-"}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      // backgroundColor:
                      //   vendor?.registrationState === "Initiated"
                      //     ? "#FFF1CF"
                      //     : vendor?.registrationState === "Approved"
                      //     ? "blue"
                      //     : vendor?.registrationState === "Declined"
                      //     ? "yellow"
                      //     : "",
                      color:
                        vendor?.registrationState === "Initiated"
                          ? "#815103"
                          : vendor?.registrationState === "Approved"
                          ? "#0F6308"
                          : vendor?.registrationState === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {vendor?.registrationState}
                  </h4>
                </div>
                <div>
                  <button
                    type="button"
                    className={DashboardStyle.view_more_action_button}
                  >
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
              Basic <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Business Name</p>
                  <h4>{vendor?.companyName || vendor?.businessName || "-"}</h4>
                </div>
                <div>
                  <p>Nature of Business</p>
                  <h4>{vendor?.businessNature || "-"}</h4>
                </div>
                <div>
                  <p>Vendor Type:</p>
                  <h4>{vendor?.vendorType || "-"}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Certificate of Registration</p>
                  <h4>{vendor?.rcNumber || "-"}</h4>
                </div>
                <div>
                  <p>Tax Identification</p>
                  <h4>{vendor?.taxIdentificationNumber || "-"}</h4>
                </div>
                <div>
                  <p>VAT Number</p>
                  <h4>{vendor?.valueAddedTax || "-"}</h4>
                </div>
              </div>

              <div style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <p>Service providing</p>
                  <div
                    style={{ border: "none", marginTop: "0" }}
                    className={DashboardStyle.inputs_checkbox_groups}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "0.9rem",
                      }}
                    >
                      {vendor?.serviceProvideAsset?.map((x) => (
                        <CheckMarks name={x?.service} />
                      ))}
                      {vendor?.serviceProvideConsumable?.map((x) => (
                        <CheckMarks name={x?.service} />
                      ))}{" "}
                      {/* <CheckMarks name="Asset subclass" isHeading={true} /> */}
                      {/* <CheckMarks name="" />
                      <CheckMarks name="" />
                      <CheckMarks name="" />
                      <CheckMarks name="" /> */}
                    </div>
                  </div>
                  {/* <h4>{vendor?.valueAddedTax}</h4> */}
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Contact <br /> Details
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Apartment Suite No.</p>
                  <h4>{vendor?.suiteNumber || "-"}</h4>
                </div>
                <div>
                  <p>Street Address</p>
                  <h4>{vendor?.address || "-"}</h4>
                </div>
                <div>
                  <p>City</p>
                  <h4>{vendor?.city || "-"}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Email Address</p>
                  <h4>{vendor?.email || "-"}</h4>
                </div>
                <div>
                  <p>Phone Number</p>
                  <h4>{vendor?.phoneNumber || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Additional <br /> Comments
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Comment:</p>
                  <h4>{vendor?.comment || "Nil"}</h4>
                </div>
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
                    <tr>
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
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Appraisal Setup
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Appraisal Duration</p>
                  <h4>{vendor?.appraisal?.appraisalDuration}</h4>
                </div>
                <div>
                  <p>Notification Date</p>
                  <h4>{FormatDateTime(vendor?.appraisal?.notificationDate)}</h4>
                </div>
                <div>
                  <p>Appraisal Date</p>
                  <h4>{FormatDateTime(vendor?.appraisal?.appraisalDate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>SLA Date</p>
                  <h4>{FormatDateTime(vendor?.appraisal?.slaDate)}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Appraisal Performance
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Evaluation Status</p>
                  <h4>{vendor?.performance?.evaluationStatus}</h4>
                </div>
                <div>
                  <p>Appraisal Duration</p>
                  <h4>
                    {FormatDateTime(vendor?.performance?.notificationDate)}
                  </h4>
                </div>
                <div>
                  <p>Due Date</p>
                  <h4>{FormatDateTime(vendor?.performance?.appraisalDate)}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Notification Date</p>
                  <h4>{FormatDateTime(vendor?.performance?.slaDate)}</h4>
                </div>
                <div>
                  <p>Project Start Date</p>
                  <h4>
                    {FormatDateTime(vendor?.performance?.projectStartDate)}
                  </h4>
                </div>
                <div>
                  <p>Project End Date</p>
                  <h4>{FormatDateTime(vendor?.performance?.projectEndDate)}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              User and Managing Department Setup
            </h4>
            <div
              style={{ padding: "1rem" }}
              className={DashboardStyle.inputs_group_no_grid}
            >
              <div className={DashboardStyle.inputs_checkbox_groups}>
                <div>
                  {" "}
                  <CheckMarks name="User Department" isHeading={true} />
                  {vendor?.userDepartment?.map((x, index) => (
                    <CheckMarks name={x?.name} key={index} />
                  ))}
                </div>
                <div>
                  {" "}
                  <CheckMarks name="Managing Department" isHeading={true} />
                  {vendor?.managingDepartment?.map((x, index) => (
                    <CheckMarks name={x?.name} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
      <SetUpVendor
        openModal={openSetUpModal}
        setOpenModal={setOpenSetUpModal}
        vendor={vendor}
      />
    </PageLayout>
  );
}

export default ViewVendor;

export function CheckMarks({ name, isHeading }) {
  return (
    <div className={DashboardStyle.checkbox_style}>
      <label
        style={{
          fontWeight: isHeading === true && "500",
          marginBottom: isHeading === true ? "40px" : "0.8rem",
        }}
        htmlFor=""
      >
        {isHeading !== true && (
          <span>
            <FiCheck />
          </span>
        )}
        {name || "-"}
      </label>
    </div>
  );
}
