import React, { useState, useEffect } from "react";
import PageStyle from "../../../Components/Layout/FinancePageLayout";
import "./style.css";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import { Link } from "react-router-dom";
import { URL } from "../../../../../utils/routes";
import { useNavigate, Navigate } from "react-router-dom";
import { BsCreditCardFill } from "react-icons/bs";
import {
  MoreButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";

const CardData = [
  {
    title: "Payment",
    subtitle: "Help employees approve, initiate and  authorize payment.",
    link: URL.PaymentSetup,
  },
  {
    title: "Payment Setup",
    subtitle: "Help employees approve initiated payment.",
    link: `/dashboard/finance/${URL.PaymentSetup}`,
  },
  {
    title: "Payment Requisition",
    subtitle: "Help employees approve initiated payment.",
    link: URL.PaymentSetup,
  },
  {
    title: "Setup Approval Limit",
    subtitle: "Help employees approve initiated payment.",
    link: URL.PaymentSetup,
  },
  {
    title: "Cashbook",
    subtitle: "Help employees approve initiate and authorize payment.",
    link: URL.PaymentSetup,
  },
];

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

export default function Payment() {
  return (
    <RouteLayout>
      <section className="flex gap-2 flex-wrap">
        {CardData.map((data, index) => (
          <CardComp
            key={index}
            title={data.title}
            subtitle={data.subtitle}
            link={data.link}
          />
        ))}
      </section>
    </RouteLayout>
  );
}
