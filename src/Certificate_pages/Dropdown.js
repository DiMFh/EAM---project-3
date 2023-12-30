import { Outlet } from "react-router-dom";
import "./Certificaterequest.css"

const Dropdown = () => {
    return ( 
        <div className="up-arrow">
        <div className="arrow-container">
          <div className="arrow-up"></div>
        </div>
        <Outlet/>
        </div>
     );
}
 
export default Dropdown;