import RouteLayout from "../../../../../Components/Layout/RouteLayout";
import {
  CTAButtons,
  CTAButtonsAlt,
} from "../../../../../../global/components/Buttons/buttons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { URL } from "../../../../../../../utils/routes";
import "../style.css";
import { lazy } from "react";

const MonthlyCooperationDeduction = lazy(() =>
  import(
    "../CooperativeManagementCompReviewer/Components/MonthlyCooperationDeduction"
  )
);
const QuarterlyCooperationDeduction = lazy(() =>
  import(
    "../CooperativeManagementCompReviewer/Components/QuarterlyCooperationDeduction"
  )
);

export default function PaymentSetupHOD() {
  const navigate = useNavigate();

  // table switch
  const [table, setTable] = useState(true);
  const [model, setModel] = useState(false);

  return (
    <RouteLayout>
      <section className="bg-white p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-[#305F32]">
            Cooperative Management Approval
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-sm ml-10 -mb-1 z-10 ">
            <div
              onClick={() => setTable(true)}
              className={`border-2 p-2  rounded-t-md font-bold select-none cursor-pointer ${
                table
                  ? "border-[#305F32]/50 bg-white border-b-white"
                  : "bg-gray-400/40 border-gary-400 text-base  font-normal"
              }`}
            >
              Monthly Cooperation Deduction
            </div>
            <div
              onClick={() => setTable(false)}
              className={` p-2 border-2 rounded-t-md select-none cursor-pointer ${
                table
                  ? "bg-gray-400/40"
                  : " p-2 border-[#305F32]/50 rounded-t-md border-b-white font-bold  bg-white"
              }`}
            >
              Quarterly Cooperation Deduction
            </div>
          </div>
          <div className="">
            {table ? (
              <MonthlyCooperationDeduction />
            ) : (
              <QuarterlyCooperationDeduction />
            )}
          </div>
        </div>
      </section>
    </RouteLayout>
  );
}
