"use client"
import DashboardPageView from "./page-view";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRoleBasedRedirect = (allowedRoles) => {
  const router = useRouter();
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const role = user.role; 
      
      if (!allowedRoles.includes(role)) {
        window.location.href = "/access-denied";
      }
    } else {
      router.push('/login');
    }
  }, [router]);
};

const Dashboard = () => {
  useRoleBasedRedirect(['superadmin', 'admin', 'project']);
  return <DashboardPageView />;
};

export default Dashboard;
