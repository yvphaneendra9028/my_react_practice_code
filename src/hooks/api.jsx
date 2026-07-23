import React,{useState} from 'react';
import apiInstance from "../axios/axiosInstance";

function useApi(){
const[loading,setLoading] = useState(false);
const[error,setError] = useState('');
const[data,setData] = useState([]);

const fetchData=async(url)=> {
     try{
             const response=  await apiInstance.get(url);
            setData(response.data);
     }catch(error){
        console.log(error);
        setError(error.message);
     }
     finally{
        setLoading(false);
     }      
     
}

return {data,loading,error,fetchData};
}
export default useApi;