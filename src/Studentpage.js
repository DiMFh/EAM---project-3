import { Outlet} from "react-router-dom";
import React from 'react';

const Studentpage = () => {
    return ( 
        <div className="student-page">
            <h2> Welcome to the student page</h2>
            {/* Rest of the child component content */}
             <main>
                <Outlet/>
            </main>
        </div>


     );
}
 
export default Studentpage;