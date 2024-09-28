/* eslint-disable react/prop-types */
import {useState} from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import Card from "./Card";

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
         <h1 className="text-3xl m-10 mb-5 font-medium font-montserrat hover:text-[#FFA500]">{heading}</h1>
    </div>
    <Link to="/allbook" state={{data : data,heading:heading}}>
    <div className="flex cursor-pointer text-sm flex-row-reverse pr-4 mb-2"><FaCaretRight className="mt-1 font-bold" /> VIEW ALL  </div>
    </Link>
    <div className="flex overflow-hidden scroll-smooth  relative">
    <button
        onClick={handleBackS}
        className="absolute pt-24 "
      >
        {scrollPos !== 0 && <FaChevronLeft className=" text-3xl"  /> }
    
      </button>
    <button
        onClick={handleNextS}
        className=" absolute pt-24 right-0  "
      >
        {scrollPos !== data.length-6 && <FaChevronRight className=" text-3xl"  /> }
        
      </button>
    {data?.length > 0 && data.slice(scrollPos,scrollPos+7).map((item)=>(
      <>
       <Card item={item}/>
      </>
    ))}
    </div>

    </>
  )
}