import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormSelect,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CreateProcQuotation,
  GetSingleProcRequisitions,
  UpdateProcQuotation,
} from "../../../../../utils/redux/Procurement/ProcurementSlice";
import Table from "../../../Components/Table/Table";
import { TableActionsDownload } from "../../../Components/Misc/Actions";
import FormUploadComponent from "../../../Components/Forms/FormUploadComponent";
import {
  FormatDateTime,
  GetSearchParams,
  removeListData,
} from "../../../../../utils/functions/ResourceFunctions";
import { GetLocalStorage } from "../../../../../utils/functions/GetLocalStorage";
import { GetSingleVendor } from "../../../../../utils/redux/Vendor/VendorSlice";

function AddQuotation() {
  const { id } = useParams();
  const { fullName, category, emailAddress } = GetLocalStorage();
  useEffect(() => {
    // dispatch(GetSingleVendor(id));
    !location?.procurementRequisitionId &&
      dispatch(GetSingleProcRequisitions(id));
    category === 1 &&
      dispatch(
        GetSingleVendor({
          emailAddress: emailAddress,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  const location = useLocation()?.state;

  const { vendor } = useSelector((x) => x);

  console.log(location);

  const { isSubmitting, proc_req_data } = useSelector(
    (state) => state?.procurement
  );

  const proc_req = proc_req_data?.responseObject || location;

  const [uploadFile, setUploadFile] = useState(null);
  const [vendorDocument, setVendorDocument] = useState(
    location?.supportingDocument || []
  );

  console.log(location?.initiator?.toString());

  const defaultData = {
    Brand_auto: 1,
    Brand: location?.brand,
    Specification: location?.specification,
    UnitPrice: location?.unitPrice,
    Quantity: proc_req?.quantity,
    DeliveryCost: location?.deliveryCost,
    Waranty: location?.waranty?.toLowerCase(),
    TotalPrice: location?.totalPrice,
    SupportIncluded: location?.supportIncludedId,
    DeliverySchedule: FormatDateTime(location?.deliverySchedule, "yyyy-MM-DD"),
    vendorName: fullName,
    VendorId:
      category !== 1
        ? GetSearchParams("vendor") || location?.initiator?.toString() || ""
        : vendor?.all_vendors?.responseObject?.id || "",
  };
  const navigate = useNavigate();

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = formMethods;

  console.log(location?.procurementRequisitionId, id);

  const submit = (data) => {
    const dataValue = {
      ...data,
      ProcurementRequisitionId: location?.procurementRequisitionId
        ? location?.procurementRequisitionId
        : id,
      QuotationId: id,
      quantity: data?.quantity || location?.quantity,
      vendorName: data?.vendorName || "",
      VendorId:
        data?.VendorId || vendor?.all_vendors?.responseObject?.id || 88499,
    };
    const fileData = new FormData();
    const key = Object.keys(dataValue);

    key?.forEach((key, index) => {
      fileData.append(`${key}`, dataValue[key]);
    });

    const removedVendorDocument = vendorDocument
      ?.map((x) => x)
      ?.filter((x) => "file" in x);

    removedVendorDocument.forEach((element, index) => {
      fileData.append(
        `uploadDocuments[${index}].file`,
        element?.file,
        element?.fileName
      );
      fileData.append(`uploadDocuments[${index}].fileName`, element?.fileName);
    });

    location?.procurementRequisitionId
      ? dispatch(UpdateProcQuotation(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${id}/view`);
          }
        })
      : dispatch(CreateProcQuotation(fileData))?.then((res) => {
          if (res?.payload?.successful === true) {
            navigate(`../${res?.payload?.responseObject?.id}/view`);
          }
        });
  };

  const documentList = [
    {
      name: "CAC Certificate",
      value: "CacCertificate",
    },

    {
      name: "TIN Certificate",
      value: "TinCertificate",
    },
  ];

  const watchUnitPrice = watch("UnitPrice");
  const watchQuantity = proc_req?.quantity;
  const watchDelivery = watch("DeliveryCost");

  useEffect(() => {
    const value = +watchUnitPrice * +watchQuantity + +watchDelivery;
    setValue("TotalPrice", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUnitPrice, watchQuantity, watchDelivery]);

  if (!proc_req) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout
      title={location ? "Update Quotation" : "Add Quotation"}
      hasBack={true}
    >
      <FormProvider {...formMethods}>
        <FormTemplate handleSubmit={handleSubmit(submit)}>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Requisition <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Requisition Type:</p>
                  <h4>
                    {proc_req?.procurementType || proc_req?.requisitionType}
                  </h4>
                </div>
                <div>
                  <p>Asset Type:</p>
                  <h4>
                    {proc_req?.procurementType || proc_req?.requisitionType}
                  </h4>
                </div>
                <div>
                  <p>Asset Name:</p>
                  <h4>{proc_req?.assetName}</h4>
                </div>
              </div>
              <div>
                <div>
                  <p>Description:</p>
                  <h4>{proc_req?.description}</h4>
                </div>
                <div>
                  <p>Quantity:</p>
                  <h4>{proc_req?.quantity}</h4>
                </div>
                <div>
                  <p>Requisition Expiry Date</p>
                  <h4>{FormatDateTime(proc_req?.requisitionExpiryDate)}</h4>
                </div>
                <div></div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Your Quotation
            </h4>
            <div className={DashboardStyle.inputs_group}>
              <div>
                <FormInput
                  title={"Brand"}
                  camelCase={"Brand"}
                  placeholder={"Enter Brand"}
                  defaultValue={proc_req?.assetBrand}
                  // isOptional={true}
                />
                <FormInput
                  title={"Specification"}
                  camelCase={"Specification"}
                  placeholder={"Enter Specification"}
                  defaultValue={
                    proc_req?.assetSpecification || proc_req?.description
                  }
                  // isOptional={true}
                />
              </div>

              <div>
                <FormInput
                  title={"Unit Price"}
                  camelCase={"UnitPrice"}
                  placeholder={"Enter Unit Price"}
                />
                <FormInput
                  title={"Quantity"}
                  camelCase={"Quantity"}
                  disabled={true}
                  isOptional={true}
                  // placeholder={"Enter City"}
                  defaultValue={proc_req?.quantity}
                />
              </div>
              <div>
                <FormInput
                  title={"Delivery Cost"}
                  camelCase={"DeliveryCost"}
                  placeholder={"Enter Delivery Cost"}
                />
                <FormSelect
                  title={"Warranty"}
                  camelCase={"Waranty"}
                  placeholder={"Enter Waranty"}
                  array={
                    <>
                      <option value="quarterly">Quarterly</option>
                    </>
                  }
                />
              </div>
              <div>
                <FormInput
                  title={"Total Quote"}
                  camelCase={"TotalPrice"}
                  placeholder={"Enter Total Price"}
                  disabled={true}
                />
                <FormSelect
                  title={"Support Included"}
                  camelCase={"SupportIncluded"}
                  placeholder={"Enter City"}
                  array={
                    <>
                      <option value={1}>Yes</option>
                      <option value={2}>No</option>
                    </>
                  }
                />
              </div>
              <div>
                <FormInput
                  title={"Delivery Schedule"}
                  camelCase={"DeliverySchedule"}
                  placeholder={"Enter Delivery Schedule"}
                  type={"date"}
                />
                {category === 1 ? (
                  <FormInput
                    title={"Vendor"}
                    camelCase={"vendorName"}
                    // defaultValue={fullName}
                    disabled={true}
                    isOptional={true}
                  />
                ) : (
                  <FormSelect
                    title={"Vendor"}
                    camelCase={"VendorId"}
                    placeholder={"Vendor"}
                    array={
                      <>
                        {proc_req?.vendors?.map((x) => (
                          <option
                            value={x?.id}
                            // selected={
                            //   GetSearchParams("vendor") === x?.id?.toString() &&
                            //   true
                            // }
                          >
                            {x?.name}
                          </option>
                        ))}
                      </>
                    }
                  />
                )}
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents Upload
            </h4>
            <FormUploadComponent
              documentList={documentList}
              uploadFile={uploadFile}
              setUploadFile={setUploadFile}
              setVendorDocument={setVendorDocument}
              vendorDocument={vendorDocument}
            />
          </section>

          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Documents <br /> Uploads
            </h4>
            <div
              className={` ${DashboardStyle.labels_group} ${DashboardStyle.labels_group_downloads} `}
            >
              {vendorDocument?.length === 0 ? (
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
                    {vendorDocument?.map?.((x, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{x?.fileName}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {x?.file?.type?.split("/")[1]}
                          </td>
                          <td>
                            <TableActionsDownload
                              actions={() =>
                                removeListData({
                                  value: index,
                                  list: vendorDocument,
                                  setList: setVendorDocument,
                                })
                              }
                            />
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
              Cancel
            </SupportButtons>
            <ActionButtons
              disabled={!isValid}
              width={"auto"}
              className={DashboardStyle?.button_cage_weight}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </ActionButtons>
          </div>
        </FormTemplate>
      </FormProvider>
    </PageLayout>
  );
}

export default AddQuotation;
