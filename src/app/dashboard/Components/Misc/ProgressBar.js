import React, { useEffect } from 'react';

let ProgressDiv= ({percent, showTailLabel})=> {
    useEffect(()=>{

    }, [percent])
    return (
        <div className="w-full flex items-center">
            <div className="flex items-center bg-gray-200 border border-solid w-[80%] h-[10px] min-w-60 rounded-full">
                <div style={{width: `${percent}%`}} className={`rounded-full h-[10px] ${percent<40? "bg-red-500" : percent<60? "bg-orange-500" : percent<80? "bg-amber-500" : "bg-green-500"} `}></div>
            </div>
            {showTailLabel && <div><p className={`text-xs ml-2 ${percent<40? "text-red-500" : percent<60? "text-orange-500" : percent<80? "text-amber-500" : "text-green-500"}`}>{percent}%</p></div>}
        </div>
    )
}

export default ProgressDiv;