import React, {useState,useEffect} from 'react';
import useApi from './hooks/api';


function Users(){
    const {data,loading,error,fetchData} = useApi();

    useEffect(()=> {
        fetchData("/users");
    },[])

    if(loading){
        return <h2>...loading</h2>
    }
    if(error){
        return <h2>{error}</h2>
    }

    return(
    <>
        <h2>User List</h2>
           {data.map((user)=> <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            </div>)}        
    
    </>
       
      
    )
    
}
export default Users;