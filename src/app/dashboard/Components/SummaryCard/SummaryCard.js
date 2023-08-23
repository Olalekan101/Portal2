import React from "react";

const SummaryCard = ({ summaryData }) => {
  // console.log(summaryData);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${summaryData?.length},1fr)`,
        gap: "20px",
      }}
      className="w-full my-3"
    >
      {summaryData &&
        summaryData?.map((data, index) => (
          <div
            key={index}
            className="relative border border-slate-300 rounded-md shadow p-5 bg-white"
          >
            <h1 className="text-slate-500 text-xs mb-3">{data[0]}</h1>
            <div className="inline-block">
              <p className="text-3xl font-semibold">
                {data[1] ? data[1] : "-"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SummaryCard;
