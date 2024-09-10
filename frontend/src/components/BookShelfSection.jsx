import {useState} from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
export default function BookShelfSection({data,heading}) {

  const [scrollPos, setScrollPos] = useState(0);
  const handleNextS = () => {
    setScrollPos((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackS = () => {
    setScrollPos((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
    <div className="flex justify-center text-center z-0">
         <h1 className="text-3xl m-10 font-medium font-montserrat hover:text-[#FFA500]">{heading}</h1>
    </div>
    <div className="flex overflow-auto scroll-smooth hover:overflow-scroll relative">
    <button
        onClick={handleBackS}
        className="absolute "
      >
    <FaChevronLeft className=" text-3xl"  />
      </button>
    <button
        onClick={handleNextS}
        className=" absolute right-0  "
      >
        <FaChevronRight className=" text-3xl"  />
      </button>
    {data?.length > 0 && data.slice(scrollPos,scrollPos+7).map((item)=>(
      <>
       < div className="flex flex-col w-44 mx-4">
        <img className="h-[250px] w-auto"  src={item?.imgUrl}/>
        {/* <div className="description rounded top-40 absolute p-2 bg-black z-20  font-montserrat flex flex-col justify-center w-[210px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out group-hover:scale-105 border-white border-2"> */}
        <div className="justify-center item-center font-montserrat">
            <div className="hover:font-bold">
            <div className="mt-4 text-center truncate text-sm ">{item?.title}</div>
            <div className="mt-1 text-xs text-center truncate text-blue-700 hover:text-blue-800">{item?.author}</div>
            </div>
        <div className="flex justify-center">
        <LiaRupeeSignSolid  className="text-l mt-1"/>
        <h3 className="font-montserrat">{item?.price}</h3>
        <LiaRupeeSignSolid  className="text-l mt-1 ml-2"/>
        <h3 className="font-montserrat text-slate-600 line-through">{item?.wasPrice}</h3>
        </div>
        <div className="flex justify-center mt-2 ">
            <div className="border w-28 border-slate-600 rounded text-center font-montserrat">Add to bag</div>
            <div><IoIosHeartEmpty className=" mx-2 text-2xl"/></div>
        </div>
        </div>
    </div>
      </>
    ))}
    </div>

    </>
  )
}