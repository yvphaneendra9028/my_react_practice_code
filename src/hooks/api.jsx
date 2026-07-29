import React,{useState} from 'react';
import api from "../axios/api_global";

function useApi(){
const[loading,setLoading] = useState(false);
const[error,setError] = useState('');
const[data,setData] = useState([]);

const fetchData=async(url)=> {
     try{
             const response=  await api.get(url);
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