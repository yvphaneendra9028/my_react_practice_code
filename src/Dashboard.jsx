import React ,{Suspense,lazy , useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import UserSearch from "./UserSearch";
import Data_pagination from "./Data_pagination";
import Card from "./components/Card";
import User_crud from "./User_crud";
import ParentComponent from "./ParentComponent";
import ChangeTheme from "./ChangeTheme";
import MultiStepForm from "./multistepForm";
const Users = lazy(() => import("./Users"));
import { AuthContext } from "./hooks/AuthContext";
import ChildtoParentComponent from "./ChildtoParentComponent";


function Dashboard(){
   const handleLogout = async () => {
    try {
        await logout();
        navigate("/");
    } catch(error) {
        console.log(error);
    }
};

    const [childData, setChildData] = useState("");
    const receiveData = (data) => {
    setChildData(data);
    };

    return(

        <>

        <br/><br/>
     <h1>React Concepts</h1>


            <div className="card">

                <h2>Form Validation</h2>

                <Form />

            </div>



            <div className="card">

                <h2>Reusable API Hook</h2>

                <Suspense fallback={<h2>Loading Users...</h2>}>

                    <Users />

                </Suspense>

            </div>



            <div className="card">

                <h2>Debounce Hook</h2>

                <UserSearch />

            </div>



            <div className="card">

                <h2>Pagination Hook</h2>

                <Data_pagination />

            </div>



            <div className="card">

                <h2>Reusable Component</h2>


                <Card title="User Details">

                    <p>Name: Phaneendra</p>

                    <p>Email: test@gmail.com</p>

                </Card>


                <Card title="Product Details">

                    <p>
                        Product: Laptop
                    </p>

                </Card>


            </div>



            <div className="card">

                <User_crud />

            </div>



            <div className="card">

                <ParentComponent />

            </div>



            <div className="card">

                <ChangeTheme />

            </div>



            <div className="card">

                <MultiStepForm />

            </div>

            <div className="card">
                {childData && <p>Data from Child: {childData}</p>}
                <p>Create Child Component add useState hook and setData take a button write onclick function
                    and pass the data in the function as props.</p>
                    <p>Now in parent component take another useState hook and create function with props function and set data as parameter
                    and display the data in parent component . 
                </p>
                <ChildtoParentComponent sendDataToParent={receiveData}/>
            </div>
        </>
    )
}

export default Dashboard;