import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import { FormTemplate } from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiEdit2, FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FormatDateTime,
} from "../../../../../utils/functions/ResourceFunctions";
import { PageActions } from "../../../Components/Misc/Actions";
import {
  GetAssetClass,
  GetSingleCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  CreateCategoryActions,
  CreateClassActions,
  CreateSubClassActions,
} from "./Categories";

function ViewCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm({
    //  defaultValues: defaultData,
    mode: "all",
  });
  const { handleSubmit } = formMethods;
  const { asset_class, category, single_category } = useSelector(
    (state) => state?.assetSetUp
  );


  const { asset_allocation } = useSelector((state) => state?.assets);
  const acq = asset_allocation?.responseObject;

  const [openAppModal, setOpenModal] = useState(false);
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);

  const submit = (e) => {};
  useEffect(() => {

    dispatch(
      GetAssetClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: id,
      })
    );

    dispatch(GetSingleCategories(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout title={"Categories Details"} hasBack={true}>
      {/* {<Modal />} */}
      <div className={DashboardStyle.app_view_controls}>
        <PageActions>
          {[
            {
              name: "Edit Details",
              action: () => {
                navigate(
                  `?modal_type=categories&isEdit=true&name=${single_category?.responseObject?.name}&des=${single_category?.responseObject?.description}&id=${id}`
                );
                setOpenModal(!openAppModal);
              },
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
                    <h4>{acq?.initiatedBy}</h4>
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
                    <h4>{FormatDateTime(acq?.dateCreated, "ll")}</h4>
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
                    <h4>{acq?.initiatedBy}</h4>
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
                    <h4>{FormatDateTime(acq?.dateCreated, "ll")}</h4>
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
                    <h4>{acq?.lastReveiwed?.lastReviewedBy}</h4>
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
                    <h4>{FormatDateTime(acq?.lastModified)}</h4>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p>Levels of Approval:</p>
                  <h4>{acq?.levelsOfApproval}</h4>
                </div>
                <div>
                  <p>Process Status</p>
                  <h4
                    style={{
                      color:
                        acq?.status === "Initiated"
                          ? "#815103"
                          : acq?.status === "Approved"
                          ? "#0F6308"
                          : acq?.status === "Declined"
                          ? "#8A002B"
                          : "",
                    }}
                  >
                    {acq?.status}
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
              Category <br /> Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              <div>
                <div>
                  <p>Category Name</p>
                  <h4>{single_category?.responseObject?.name}</h4>
                </div>
                <div>
                  <p>Description</p>
                  <h4>{single_category?.responseObject?.description || "-"}</h4>
                </div>
              </div>
            </div>
          </section>
          <section className={DashboardStyle.form_section}>
            <h4 className={DashboardStyle.form_section_title}>
              Asset Information
            </h4>
            <div className={DashboardStyle.labels_group}>
              {asset_class?.responseObject?.map((asset, index) => (
                <ChildrenView
                  openModal={openAppModal}
                  setOpenModal={setOpenModal}
                  asset={asset}
                  index={index}
                  category={category}
                />
              ))}
            </div>
          </section>
        </FormTemplate>
      </FormProvider>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openAppModal}
        setIsOpen={setOpenModal}
      >
        {getURLData("modal_type") === "class" && (
          <CreateClassActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
          />
        )}
        {getURLData("modal_type") === "sub_class" && (
          <CreateSubClassActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
          />
        )}
        {getURLData("modal_type") === "categories" && (
          <CreateCategoryActions
            category={category}
            isOpen={openAppModal}
            setIsOpen={setOpenModal}
          />
        )}
      </AppModalTemplate>
    </PageLayout>
  );
}

export default ViewCategories;

function ChildrenView({ asset, index, category, openModal, setOpenModal }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const classId = asset?.id;
  return (
    <>
      <div key={index}>
        <div>
          <p>Class Name:</p>
          <h4>
            {asset?.name}{" "}
            <FiEdit2
              size={"13px"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal(!openModal);
                navigate(
                  `?modal_type=class&category=${id}&class=${asset?.name}&classId=${classId}&isEdit=true`
                );
              }}
            />
          </h4>
        </div>
      </div>
      <div>
        {asset?.subClasses?.length === 0 && (
          <div>
            <p>Sub Class Name:</p>
            <h4>
              No Subclass Available{" "}
              {/* <FiEdit2
                size={"13px"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal(!openModal);
                  navigate(
                    `?modal_type=sub_class&category=${id}&class=${classId}&subClass=&isEdit=false`
                  );
                }}
              /> */}
            </h4>
          </div>
        )}
        {asset?.subClasses?.map((s, index) => (
          <div key={index}>
            <p>{index + 1}. Sub Class Name:</p>
            <h4>
              {s?.name}{" "}
              <FiEdit2
                onClick={() => {
                  setOpenModal(!openModal);
                  navigate(
                    `?modal_type=sub_class&category=${id}&class=${classId}&subClass=${s?.name}&subClassId=${s?.id}&isEdit=true`
                  );
                }}
                style={{ cursor: "pointer" }}
                size={"13px"}
              />
            </h4>
          </div>
        ))}
      </div>
    </>
  );
}
