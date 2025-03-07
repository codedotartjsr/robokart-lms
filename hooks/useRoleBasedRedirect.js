"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRoleBasedRedirect = (allowedRoles) => {
  const router = useRouter();
  
  useEffect(() => {
    // Retrieve the user data from localStorage and parse it
    const userData = localStorage.getItem('usersws');
    if (userData) {
      const user = JSON.parse(userData);
      const role = user.role;  // Access the role from the parsed user object

      console.log("allowedRoles", allowedRoles);
      console.log("role", role);
      
      // Redirect if the role is not included in the allowedRoles array
      if (!allowedRoles.includes(role)) {
        router.push('/unauthorized');
      }
    } else {
      // Optionally handle cases where there is no user data (e.g., not logged in)
      router.push('/login');  // Redirect to a login page or similar
    }
  }, [router, allowedRoles]);
};

export default useRoleBasedRedirect;



// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const useRoleBasedRedirect = (allowedRoles) => {
//   const router = useRouter();
//   const [userRole, setUserRole] = useState('');
  
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//         const user = JSON.parse(userData);
//         setUserRole(user.role);
//       }

//     if (!allowedRoles.includes(userRole)) {
//       router.push('/unauthorized');
//     }
//   }, [router, allowedRoles]);
// };

// export default useRoleBasedRedirect;

// const useRoleBasedRedirect = (allowedRoles) => {
//   const router = useRouter();
//   useEffect(() => {
//     const role = localStorage.getItem('user'); // This is insecure as localStorage can be modified by the client.

//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const user = JSON.parse(userData);
//       setUserRole(user.role);
//       // redirectBasedOnRole(user.role); 
//     }
    
//     if (!allowedRoles.includes(role)) {
//       router.push('/unauthorized');
//     }
//   }, [router]);
// };

// const Dashboard = () => {
//   // const trans = await getDictionary(lang);
//   useRoleBasedRedirect(['superadmin', 'admin', 'project']); // Only allow these roles.
//   return <DashboardPageView />;
// };

// export default Dashboard;