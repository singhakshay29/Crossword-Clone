import { GrSearch } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
  const [show,setShow]=useState(false);
  const [user,setUser]=useState(false);
  
  
  useEffect(()=>{
    const interval=setInterval(()=>{
      setShow(show=>!show);
    },2000)
    
    return ()=>clearInterval(interval);
  },[])
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
     <div className="flex bg-black h-8"></div>
     <div className="flex bg-[#FFE300] h-24">
      <div className="p-4">
        <img src="https://www.crossword.in/cdn/shop/files/crossword_logo_small_bc561912-757f-49bc-b641-bab1dfb66c4e_small.svg?v=1697460508" alt="Logo"/>
      </div>
      <div className="flex px-8 items-center w-full">
        <div className="w-5/6 px-16  flex ">
          <input className="w-full rounded h-10" type="text" placeholder="Search by Title,Author,ISBN" required></input>
          <div className="bg-black py-2 px-4 rounded h-10 w-14">
          <GrSearch className="text-white text-xl"/>
          </div>
        </div>
        <div className="flex w-1/6">
        <Link to="/user/signin">
        <div className="h-10 w-14" onMouseEnter={() => setUser(true)}  onMouseLeave={() => setUser(false)} >
          <RiUserLine className='text-3xl cursor-pointer'/>
          {user && (<div  className="bg-white w-24 h-10 rounded absolute cursor-pointer shadow-slate-300 shadow-lg">
            <text className="flex justify-center font-700 text-center items-center mt-2 hover:text-red-400">SIGN IN</text>
          </div>)}
          </div>
        </Link>
          
          
          <div className="h-10 w-14">
          <FaRegHeart  className=" text-3xl"/>
          </div>
          <div className="h-10 w-14">
          <HiOutlineShoppingBag className=" text-3xl"/>
          </div>
        </div>
      </div>
     </div>
     <div className="flex justify-center font-montserrat text-slate-600 text-xs font-bold">
  <ul className="flex space-x-4">
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      NEW & NOTEWORTHY
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      CROSSWORD RECOMMENDS
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      BOOKS
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      KIDS BOOKS
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      Young Adult
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      TOYS & GAMES
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      STATIONERY & GIFTS
    </li>
    <li className="p-4 list-none hover:text-black cursor-pointer border-b-2 border-transparent hover:border-black">
      SALE
    </li>
  </ul>
  </div>
  <div className="flex justify-center item-center font-montserrat font-bold bg-slate-100 h-8">
    {show ?(  <div className="text-[#444444]">15% off on Books 📚</div>):( <div className="text-[#444444]">🚚Free Shipping on orders above Rs.500</div>)} 
  </div>
 

    </div>
  )
}
