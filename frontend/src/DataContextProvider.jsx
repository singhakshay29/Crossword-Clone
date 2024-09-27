/* eslint-disable react/prop-types */
import axios from 'axios';
import {useEffect, useState} from "react";
import { allbooks } from '../Api';
import {AuthContext, DataContext} from './Context';



const DataContextProvider = ({ children }) =>{
    const [books,setBooks]=useState([]);

    function getBookData(){
        const storedData = localStorage.getItem("booksMela");
        if(storedData){
            setBooks(JSON.parse(storedData));
        }else{
            axios
        .get(allbooks)
        .then((response) => {
          setBooks(response.data.data);
          localStorage.setItem("booksMela", JSON.stringify(
            response.data.data
          ));
        })
        .catch((error) => {
            console.log('Error fetching book data:', error);
        });
        }

    }

    useEffect(()=>{
        getBookData();
    },[])

    return(
        <DataContext.Provider value={{books}}>
            {children}
        </DataContext.Provider>
    )
}

const AuthContextProvider=({children})=>{
    const [loginUser,]=useState(true);
    
    return(
        <AuthContext.Provider value={{loginUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {DataContextProvider,AuthContextProvider};