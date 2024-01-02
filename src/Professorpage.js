import { Outlet} from "react-router-dom";
import React from 'react';

const Professorpage = () => {
    return ( 
        <div className="professor-page">
            <h2> Welcome to the professor page</h2>
            {/* Rest of the child component content */}
             <main>
                <Outlet/>
            </main>
        </div>


     );
}
 
export default Professorpage;