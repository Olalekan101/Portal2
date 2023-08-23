let OptionDropDown = ({data, onChoose, closeDropDown})=> {
    

    return (
        <div className="optionBox border-solid border border-green-100 overflow-scroll h-40">
        {
            data.length> 0?
            data.map((item, i) =>{
                // console.log({item})
                return (
                <div key={i} onClick={()=> { onChoose(item); }}>
                    <p className="option w-full p-2 my-1 text-green-600 font-[600] border-b border-green-100" >{item.accountName}</p>
                </div>)
            })
            :
            <p className="p-4 text-green-500 ">No results seen, Search for an Employee...</p>
        }
        </div>
    )
}

export default OptionDropDown;