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
    } else {
      // Handle other pages as needed
      return "other";
    }
  }
  
  export default determineCurrentPage;