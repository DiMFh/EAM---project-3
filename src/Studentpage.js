import { Outlet} from "react-router-dom";
import Header from "./Header";
import LoginForm from './LoginForm';
import React from 'react';

const Studentpage = () => {
    const currentPage = "student-page";
    return ( 
        <div className="student-page">
            


            
            {/* <LoginForm showHeader={false}> */}
            <Header currentPage={currentPage} />
            {/* Rest of the child component content */}
             {/* </LoginForm>   */}
             <main>
                <Outlet/>
            </main>
        </div>


     );
}
 
export default Studentpage;