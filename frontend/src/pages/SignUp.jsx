import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState} from "react";
import axios from "axios";


export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    first:null,
    last:null,
    email:null,
    password:null,
  });
  const[error,setError]=useState(null);
  function inputDetails(e){
    setError(null);
    setUserDetails((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value
    })) 
  }
  
  const handleSignUp = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!userDetails.first || !userDetails.password || !userDetails.email) {
      console.log(userDetails);
      setError("All Fields must be filled");
    } else if (!userDetails.email.includes("@")) {
      setError("Email is invalid");
    } else {
      submittingDetails(userDetails);
    }
  };
  
  function submittingDetails(){
    const {first,last,email,password}=userDetails;
    console.log(first,last,email,password);
      axios.post('http://localhost:8081/user/signup',{
        first,last,email,password
      }).then(response => {
        console.log("Details submitted successfully:", response.data);
      })
      .catch(error => {
        console.error("There was an error submitting the details:", error);
      });
  }
    
  return (
    <>
    <Navbar/>
    <div className="flex">
        <div className="mt-56 w-1/2 ml-4">
            <img width="600px" height="300px" src="https://cdn.shopify.com/s/files/1/0648/3066/9017/files/SignIn_d042cc21-da30-4fa8-83ea-fbaac6e548e9.jpg?v=1689674498"/>
        </div>
        <div className="mt-56 w-1/2 items-center flex flex-col ">
        <div className="h-16 w-7/12 text-center border-b-2">
        <h1 className="font-montserrat text-2xl ">CREATE ACCOUNT</h1>
        </div>
            <h3 className="font-montserrat text-l m-2  mb-0 ">First Name</h3>
            <input className="border rounded w-7/12 h-10" name="first" onChange={(e)=>inputDetails(e)} value={userDetails.first} required></input>
            <h3 className="font-montserrat text-l m-2 mb-0 ">Last Name</h3>
            <input className="border rounded w-7/12 h-10" name="last" onChange={(e)=>inputDetails(e)} value={userDetails.last} required ></input>
            <h3 className="font-montserrat text-l m-2 mb-0 ">Email Id</h3>
            <input className="border rounded w-7/12 h-10" name="email" onChange={(e)=>inputDetails(e)} value={userDetails.email} required></input>
            <h3 className="font-montserrat text-l m-2 mb-0 ">Password</h3>
            <input className="border rounded w-7/12 h-10" name="password" onChange={(e)=>inputDetails(e)} value={userDetails.password} required></input>
            <div className="font-montserrat border rounded w-7/12 h-10 m-2 cursor-pointer bg-black text-white text-center pt-1 text-xl" onClick={()=>handleSignUp()}>SUBMIT</div>
            <div className=" font-montserrat"> 
              {error}
            </div>
            <Link to="/user/signin">
            <div className="cursor-pointer border-b-2 border-black w-7/12 text-center">Already User ?</div>
            </Link>
           
        </div>
    </div>
    </>
  )
}
