import RouteLayout from "../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../Components/Layout/PageLayout";
import { CTAButtonsAlt } from "../../../../../global/components/Buttons/buttons";
import { useState } from "react";

const AvailableRoleData = [
  {
    id: 100,
    title: "Initiator",
  },
  {
    id: 200,
    title: "Reviewer",
  },
  {
    id: 300,
    title: "Authorizer",
  },
  {
    id: 400,
    title: "Approval",
  },
];
const InitiatorAccess = [
  {
    id: "in1",
    title: "list user department IN",
  },
  {
    id: "in2",
    title: "list user department IN",
  },
  {
    id: "in3",
    title: "list user department IN",
  },
  {
    id: "in4",
    title: "list user department IN",
  },
];
const ReviewerAccess = [
  {
    id: "re1",
    title: "list user department RE",
  },
  {
    id: "re2",
    title: "list user department RE",
  },
  {
    id: "re3",
    title: "list user department RE",
  },
  {
    id: "re4",
    title: "list user department RE",
  },
];
const AuthorizerAccess = [
  {
    id: "au1",
    title: "list user department AU",
  },
  {
    id: "au2",
    title: "list user department AU",
  },
  {
    id: "au3",
    title: "list user department AU",
  },
  {
    id: "au4",
    title: "list user department AU",
  },
];
const ApprovalAccess = [
  {
    id: "ap1",
    title: "list user department AP",
  },
  {
    id: "ap2",
    title: "list user department AP",
  },
  {
    id: "ap3",
    title: "list user department AP",
  },
  {
    id: "ap4",
    title: "list user department AP",
  },
];

function RoleComp() {
  return (
    <div className="inline-flex justify-center items-center gap-2">
      <div className="flex justify-center items-center text-3xl ">
        <input type="checkbox" className="form-checkbox w-6 h-6" />
      </div>
      <div>list user department</div>
    </div>
  );
}

export default function ManageRoles() {
  const [visible, setVisible] = useState(100);
  const roledata =
    visible === 100
      ? InitiatorAccess
      : visible === 200
      ? ReviewerAccess
      : visible === 300
      ? AuthorizerAccess
      : visible === 400
      ? ApprovalAccess
      : "";
  return (
    <RouteLayout>
      <PageLayout hasBack={true}>
        <section className="bg-white p-6 flex flex-col">
          <div className="flex justify-between items-center items- mb-6">
            <div className="text-2xl font-bold text-[#305F32]">
              Manage Roles
            </div>
            <div className="flex gap-4 justify-center items-center">
              <CTAButtonsAlt
                onClick={() => {
                  /*navigate(URL.CostCentre)*/
                }}
              >
                Create Custom Rule
              </CTAButtonsAlt>
            </div>
          </div>
          <div className="flex gap-10">
            <aside>
              <div className="mb-4 text-xl font-bold">Available Role</div>
              <div className="flex flex-col gap-4 justify-start">
                {AvailableRoleData.map((role) => (
                  <button key={role.id} onClick={() => setVisible(role.id)}>
                    <div
                      className={`text-start ${
                        visible === role.id ? "font-medium text-xl" : ""
                      }`}
                    >
                      {role.title}
                    </div>
                  </button>
                ))}
              </div>
            </aside>
            <hr className="bg-[#305F32] w-[0.8px] h-auto opacity-50" />
            <main className="gap-4 flex flex-col">
              <div className="text-xl font-bold">Role Access</div>
              <div className="">
                <div className="flex flex-col justify-center items-center gap-2">
                  {roledata.map((data) => (
                    <>
                      <div key={data.id} className="flex gap-4">
                        <div className="flex justify-center items-center text-3xl ">
                          <input
                            type="checkbox"
                            className="form-checkbox w-6 h-6"
                          />
                        </div>
                        <div>{data.title}</div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
