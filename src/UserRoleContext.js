// UserRoleContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserRoleContext = createContext({
  userRole: 'public', // default value for userRole
  setUserRole: () => {} // noop function for setUserRole
});

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState( () => {
    // get the stored role from localStorage or default to 'public'
    const storedRole = localStorage.getItem('userRole');
    return storedRole || 'public';
  });

  useEffect( () => {
    // Update the localStorage when the UserRole changes
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const contextValue = React.useMemo( () => {
    return { userRole, setUserRole };
  }, [userRole]);

  return (
    <UserRoleContext.Provider value={contextValue}>
      {children}
    </UserRoleContext.Provider>
  );
};
