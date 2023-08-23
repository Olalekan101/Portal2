import React from "react";

export function ButtonNormal({ text, stylebtn = true }) {
  return (
    <button>
      <span
        className={` py-2 px-4 rounded-md focus:outline-none border-2 ${
          stylebtn
            ? "bg-white text-[#305F32] border-[#305F32] hover:bg-[#305F32] hover:text-white"
            : "bg-[#305F32] text-white hover:bg-white hover:text-[#305F32] hover:border-[#305F32]"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
