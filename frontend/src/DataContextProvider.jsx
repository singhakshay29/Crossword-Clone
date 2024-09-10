import axios from 'axios';
import {useEffect, useState} from "react";
import DataContext from "./DataContext"


const DataContextProvider = ({ children }) =>{
    const [books,setBooks]=useState([]);

    function getBookData(){
        const storedData = localStorage.getItem("booksMela");
        if(storedData){
            setBooks(JSON.parse(storedData));
        }else{
            axios
        .get('http://localhost:8081/book')
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

export default DataContextProvider;