/* eslint-disable react/prop-types */
import {useContext} from "react";
import { IoIosHeartEmpty } from "react-icons/io";
// import { IoIosHeart } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import {Link} from "react-router-dom";
import {AuthContext} from "../Context";


export default function Card({item}) {
  const {loginUser}=useContext(AuthContext);
  const discount = item?.discount ? item.discount : '(10%)';
  const discountValue = parseFloat(item?.discount?.match(/\d+/)) || 10;
  const priceValue = parseFloat(item?.price?.replace(/[₹,]/g, ''));
  const oldPrice = priceValue / (1 - discountValue / 100);
  
  return (
    <>
    < div className="flex flex-col w-48 mx-4 ">
    <div className="flex justify-center">
    <Link to={'/product'} state={{data:item,oldPrice:oldPrice,discountValue:discount}}>
        <img className="h-[250px] w-auto"  src={item?.imgUrl}/>
        </Link>
    </div>
        <div className="justify-center w-48 item-center font-montserrat">
            <div className="hover:font-bold">
            <div className="mt-4 text-center truncate text-sm ">{item?.title}</div>
            <div className="mt-1 text-xs text-center truncate text-blue-700 hover:text-blue-800">{item?.author}</div>
            </div>
        <div className="flex justify-center">
        <h3 className="font-montserrat">{item?.price}</h3>
        <LiaRupeeSignSolid  className="text-l mt-1 ml-2"/>
        <h3 className="font-montserrat text-slate-600 line-through">{oldPrice.toFixed(1)}</h3>
        <h3 className="font-montserrat text-green-600 ">{discount }</h3>
        </div>
        <div className="flex justify-center mt-2 ">
          {loginUser?(
            <>
             <Link to='/cart'>
            <div className="border w-28 border-slate-600 rounded text-center font-montserrat cursor-pointer hover:bg-black hover:text-white">Add to bag</div>
          </Link>
          <div className="cursor-pointer">
          <IoIosHeartEmpty className=" mx-2 text-2xl"/>
            {/* <IoIosHeart className=" mx-2 text-2xl text-rose-600"/> */}
            </div>
            </>
           
          ):(
            <>
            <Link to='/user/signin'>
            <div className="border w-28 border-slate-600 rounded text-center font-montserrat cursor-pointer hover:bg-black hover:text-white">Add to bag</div>
          </Link>
          <Link to='/user/signin'>
          <div className="cursor-pointer"><IoIosHeartEmpty className=" mx-2 text-2xl"/></div>
          </Link>
            </>
        
        )}
           
           
        </div>
        </div>
    </div>
    
    </>
  )
}
