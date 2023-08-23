import React, { useContext, useState } from "react";
import Modal from "../../../Components/Modals/modal.module.css";
import DashboardStyle from "../../../Styles/Dashboard.module.css";
import Action from "../../../Images/actions.svg";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  FormTemplate,
  FormTextArea,
  SlideCheckBox,
} from "../../../Components/Forms/InputTemplate";
import { useSearchParams } from "react-router-dom";
import { ModalContext } from "../../../../../utils/contexts/Modals/ModalContext";
import { useSelector } from "react-redux";
// this
export function ModalOps(props) {
  // const { isOpen, isLoading, details, setDetails, setIsOpen } = props;
  const { isOpen, closeModal, details, setDetails } = useContext(ModalContext);

  return (
    <>
      <AppModalTemplate
        padding={"1.75rem"}
        isOpen={isOpen}
        width={"340px"}
        closeFunction={() => closeModal()}
        zIndex={999}
      >
        <SuspendVendorTest
          closeModal={() => closeModal()}
          details={details}
          setDetails={setDetails}
        />
      </AppModalTemplate>
      {/* )} */}
    </>
  );
}

export function useApprovals() {
  const [isOpen, setIsOpen] = useState(false);

  const { openModal, closeModal } = useContext(ModalContext);

  return {
    Modal,
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
  };
}

function SuspendVendorTest({ closeModal, details }) {
  const {
    global,
    assets,
    vendor,
    procurement,
    assetSetUp,
    consumable,
    consummableSetUp,
    fleet,
    fluelRequest,
    report,
  } = useSelector((state) => state);

  const isLoading =
    assets?.isLoading ||
    assets?.isLoading ||
    vendor?.isLoading ||
    global?.isLoading ||
    procurement.isLoading ||
    assetSetUp?.isLoading ||
    consumable?.isLoading ||
    fleet?.isLoading ||
    consummableSetUp?.isLoading ||
    fluelRequest?.isLoading ||
    report?.isLoading;

  const formMethods = useForm({
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams({});

  const {
    submitData,
    button,
    title,
    isDelete,
    isDeleteSupport,
    isOther,
    isOtherSupport,
    sendIsOptional,
    commentIsOptional,
    isRating,
    isRatingSupport,
  } = details;

  const submit = ({ send, comments }) => {
    submitData({
      comments,
      send,
    });
  };

  if (isOther === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>
          <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
            {isOtherSupport}
          </p>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  if (isDelete === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>
          <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
            {isDeleteSupport}
          </p>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  if (isRating === true) {
    return (
      <>
        <div>
          <img className={Modal?.modal_action_img} src={Action} alt="action" />
          <h3 className={Modal?.modal_action_h3}>{title}</h3>

          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              {isRatingSupport}
              <div className={Modal.button_cage}>
                <SupportButtons
                  onClick={() => closeModal()}
                  className={Modal?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoading}
                  disabled={!isValid}
                  className={DashboardStyle?.button_cage_weight}
                  bg={button.color === "red" ? "#E61B00" : ""}
                >
                  {button.name}
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img className={Modal?.modal_action_img} src={Action} alt="action" />
        <h3 className={Modal?.modal_action_h3}>{title}</h3>
        <hr className={Modal?.modal_action_hr} />
        <FormProvider {...formMethods}>
          <FormTemplate handleSubmit={handleSubmit(submit)}>
            <FormTextArea
              title={"Comment"}
              camelCase={"comments"}
              placeholder={"Please enter comment"}
              type="textbox"
              className={Modal.input_modal}
              rowsLines={"5"}
              isOptional={commentIsOptional}
            />
            {sendIsOptional !== true && (
              <SendMail name={"Send notification to vendor"} />
            )}

            <div className={Modal.button_cage}>
              <ActionButtons
                isLoading={isLoading}
                disabled={commentIsOptional !== false && !isValid}
                className={DashboardStyle?.button_cage_weight}
                bg={button.color === "red" ? "#E61B00" : ""}
              >
                {button.name}
              </ActionButtons>
              <SupportButtons
                onClick={() => closeModal()}
                className={Modal?.button_cage_weight_without_border}
              >
                No, Cancel
              </SupportButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </div>
    </>
  );
}

export function SendMail({ name }) {
  return (
    <SlideCheckBox
      style={{
        margin: "1rem 0 0.75rem 0",
      }}
      isOptional={false}
      camelCase={"send"}
      name={name}
    />
  );
}
