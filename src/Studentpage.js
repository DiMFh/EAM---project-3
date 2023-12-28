import { Outlet} from "react-router-dom";
import Header from "./Header";

const Studentpage = () => {
    const currentPage = "student-page";
    return ( 
        <div className="studentpage">
            <Header currentPage={currentPage} />


            
        </div>


     );
}
 
export default Studentpage;