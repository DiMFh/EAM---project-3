function determineCurrentPage() {
    const path = window.location.pathname;
  
    if (path === "/") {
      return "home";
    } else if (path === "/sections") {
      return "sections";
    } else if (path === "/register") {
      return "register";
    } else if (path === "/login") {
      return "login";
    } else if (path === "/certificate") {
        return "certificate";
    } else {
      // Handle other pages as needed
      return "other";
    }
  }
  
  export default determineCurrentPage;

// import { useLocation } from "react-router-dom";

// function determineCurrentPage(location) {
//   const { pathname } = location;

//   if (pathname === "/") {
//     return "home";
//   } else if (pathname === "/sections") {
//     return "sections";
//   } else if (pathname === "/register") {
//     return "register";
//   } else if (pathname === "/login") {
//     return "login";
//   } else if (pathname.startsWith("/certificate")) {
//     return "certificate";
//   } else {
//     // Handle other pages as needed
//     return "other";
//   }
// }

// export default determineCurrentPage;