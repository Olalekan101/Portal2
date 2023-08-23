import RouteLayout from "../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../Components/Layout/PageLayout";
import { BsCreditCardFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { URL } from "../../../../../../utils/routes";

const CardComp = ({ title, subtitle, link }) => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-8 border-[#DBD7D7] border-[2px] aspect-square max-w-[220px] rounded-md flex">
      <div className="flex flex-col justify-between gap-5 ">
        <div className="">
          <BsCreditCardFill className="text-xl text-[#305F32]" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="text-[16px] font-bold text-[#305F32]">{title}</div>
          <div className="text-[12px] text-black">{subtitle}</div>
        </div>
        <div className=" border-[#305F32] border-[2px] mt-auto rounded-md w-fit bg-white hover:opacity-50 ">
          <Link to={link}>
            <div className="px-7 py-1 text-[12px] bg-white flex justify-start">
              Open
            </div>
          </Link>

          {/* <button
            onClick={() => navigate(link)}
            className="px-7 py-1 text-[12px] bg-white flex justify-start"
          >
            Open
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default function CooperativeManagement() {
  return (
    <RouteLayout>
      <PageLayout>
        <section className="flex justify-start items-center gap-2">
          <CardComp
            title={"Cooperative Management Component Reviewer"}
            link={`/dashboard/finance/${URL.CooperativeManagementCompReviewer}`}
          />
          <CardComp
            title={"Cooperative Management Component Approval"}
            link={`/dashboard/finance/${URL.CooperativeManagementCompApproval}`}
          />
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
