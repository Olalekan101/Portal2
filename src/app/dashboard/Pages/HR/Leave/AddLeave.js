import React, { useState, useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
  FormTextArea,
  PerfectFileUpload,
} from "../../../Components/Forms/InputTemplate";
import { GetAllEmployees } from "../../../../../utils/redux/HR/HRSlice";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

import {
  GetLeaveTypes,
  UpdateLeaveRequest,
  CreateLeaveRequest,
} from "../../../../../utils/redux/HR/HRSlice";
import { FiPlus } from "react-icons/fi";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import { toast } from "react-toastify";

const AddLeave = () => {
  const location = useLocation()?.state;
  const [leaveItems, setLeaveItems] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [leaveDocument, setLeaveDocument] = useState(location?.documents || []);

  const dispatch = useDispatch();
  const { leave_types, isLoadingLeave, all_employees } = useSelector(
    (state) => state.hr
  );
  //console.log(leaveItems)

  useEffect(() => {
    dispatch(GetLeaveTypes({ pageNumber: 1, perPage: 10 }));
  }, []);

  // const GetDepartmentId = (id) => {
  //   if (typeof id == "undefined" || id == "0") {
  //     return;
  //   }
  // }
  const defaultData = {
    leaveTypeId: location?.leaveTypeId,
    startDate: location?.startDate,
    endDate: location?.endDate,
    reason: location?.reason,
  };
  const formMethods = useForm({
    defaultValues: defaultData,

    mode: "all",
  });
  const {
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;

  const { id } = useParams();
  const navigate = useNavigate();
  const submit = (data) => {
    const fileData = new FormData();
    const key = Object.keys(data);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, data[key]);
    });

    leaveDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });
    const formData = {
      ...data,
      leaveName: leaveItems?.title,
      // employeeName:
      //   deptItems?.firstName +
      //   " " +
      //   deptItems?.otherName +
      //   " " +
      //   deptItems?.surname,
    };

        // console.log(formData);
        // return
    location
      ? dispatch(UpdateLeaveRequest(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            navigate(`../${res?.payload?.responseObject?.Id}/edit`);
          }
        })
      : dispatch(CreateLeaveRequest(formData))?.then((res) => {
          if (res?.payload?.successful === true) {
            reset();
            // console.log('created')
            navigate(`../${res?.payload?.responseObject?.Id}/view`);
          }
        });
  };

  return (
    <PageLayout title={location ? "Edit Leave" : " Add Leave"} hasBack={true}>
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Leave <br /> Information
            </h4>

            <div className={DashboardStyle.inputs_group}>
              <div>
                {/* <FormSelect
                  title={"Employee Name"}
                  camelCase={"employeeId"}
                  placeholder="select leave type"
                  array={all_employees?.result?.map((department, index) => (
                    <option key={index} value={department?.id}>
                      {department?.firstName +
                        " " +
                        department?.otherName +
                        " " +
                        department?.surname}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      // GetDepartmentId(+e.target.value);
                      const isFound = all_employees?.result?.find(
                        (x) => +e.target.value === x?.id
                      );

                      setDeptItems(isFound);
                    },
                  }}
                /> */}

                <FormSelect
                  title={"Leave Type"}
                  camelCase={"leaveTypeId"}
                  placeholder={"select leave type"}
                  isOptional={false}
                  array={leave_types?.data?.map((requestor, index) => (
                    <option key={index} value={+requestor?.Id}>
                      {requestor?.title}
                    </option>
                  ))}
                  moreRegister={{
                    onChange: (e) => {
                      const isFound = leave_types?.data?.find(
                        (x) => +e.target.value === x?.Id
                      );
                      setLeaveItems(isFound);
                    },
                  }}
                />
              </div>
              <div>
                <FormInput
                  title={"Start Date"}
                  camelCase={"startDate"}
                  placeholder={"enter leave start date"}
                  isOptional={false}
                  type={"date"}
                  //    value={get_fleet?.responseObject?.fleetName}
                />
                <FormInput
                  title={"End Date"}
                  camelCase={"endDate"}
                  placeholder={"enter leave end date"}
                  isOptional={false}
                  type={"date"}
                />
              </div>
              <div>
                <FormTextArea
                  title={"Leave Reason"}
                  camelCase={"reason"}
                  placeholder={"select"}
                  isOptional={true}
                  rowsLines={4}
                />
              </div>
            </div>
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Uploads supporting <br /> document
            </h4>
            <div className={DashboardStyle.inputs_group_no_grid}>
              <div>
                <FormSelect
                  title={
                    <>
                      File Name <sup style={{ color: "red" }}>*</sup>
                    </>
                  }
                  camelCase={"fileName"}
                  placeholder={"select document"}
                  isOptional={true}
                  array={
                    <>
                      <option value={"TinCertificate"}>TIN Certificate</option>
                      <option value={"CacCertificate"}>CAC Certificate</option>
                    </>
                  }
                />

                <PerfectFileUpload
                  setFile={setUploadFile}
                  file={uploadFile}
                  title={""}
                  isOptional={false}
                  camcelCase={"stuff"}
                  handleChange={(cac) => {
                    setUploadFile(cac);
                  }}
                />
                <div
                  style={{
                    color: "var(--primary-color)",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: "5px",
                  }}
                  onClick={() => {
                    if (uploadFile && getValues("fileName") !== "") {
                      setLeaveDocument([
                        ...leaveDocument,
                        {
                          file: uploadFile,
                          fileName: getValues("fileName"),
                        },
                      ]);

                      setUploadFile(null);
                      setValue("fileName", "");
                    } else toast.error("File Name or File can not be empty");
                  }}
                >
                  <FiPlus />
                  <p>Add Another</p>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>Uploaded</h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {leaveDocument?.length === 0 ? (
                <p>No Record Available</p>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>File Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>
                            <TableActionsDownload />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </div>
          </section>
          <div className={DashboardStyle.button_cage}>
            <SupportButtons
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              Save as Draft
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              className={DashboardStyle?.button_cage_weight}
            >
              {isLoadingLeave ? "Submitting.." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
};

export default AddLeave;
