import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { data, oldPrice, discountValue } = location.state || {};
  
  useEffect(()=>{
    window.scroll(0,0);
  },[])

  return (
    <div className="mt-60 ml-8">
      <div className="flex cursor-pointer text-sm font-medium pr-4 my-4">
        <Link to="/">
          <p>Home</p>
        </Link>
        <FaCaretRight className="mt-1 ml-2 font-bold " />
        <p>{data?.title}</p>
      </div>
      <div className="flex">
        <div className="flex justify-center border-2 border-solid h-[6rem] p-2 w-[8rem]">
          <img className="h-full w-auto object-contain" src={data?.imgUrl} />
        </div>
        <div className=" h-[60rem] ml-8 w-[60rem]">
          <img className=" w-[40rem] object-contain" src={data?.imgUrl} />
        </div>
        <div className="ml-8">
          <div className="  font-semibold text-3xl  ">{data?.title}</div>
          <div className="mt-1 text-lg  text-blue-700 hover:text-blue-800">
            {data?.author}
          </div>
          <div className="flex mt-8 ">
            <h3 className="font-montserrat font-bold text-3xl ">
              {data?.price}
            </h3>
            <h3 className="font-montserrat text-slate-600 pt-3 ml-2 line-through">
              {oldPrice.toFixed(2)}
            </h3>
            <h3 className="font-montserrat text-green-600 pt-3 ml-2">
              {discountValue}
            </h3>
          </div>
          <div className="text-sm  text-slate-600 mt-2">
            (Inclusive of all taxes)
          </div>
          <div className="border-solid border-2 cursor-pointer w-16 h-10 items-center rounded flex mt-4">
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ marginLeft: "10px", cursor: "pointer", fontSize: 18 }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="border-solid border-2 cursor-pointer items-center justify-center w-48 h-12 rounded flex mt-8 text-sm hover:bg-black hover:text-white">
            ADD TO BAG
          </div>
          <div className="text-3xl mt-10">Description</div>
          <div className="mt-4">
            The remarkable next novel from {data?.author}, the author of #1 New
            York Times bestseller The Midnight Library, with more than nine
            million copies sold worldwide
          </div>
        </div>
      </div>
    </div>
  );
}
