"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import ExpiredSessionModal from './ExpiredSessionModal';

const AuthWrapper = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      if (pathname !== "/") {
        router.replace("/");
      }
    }

    setCheckingAuth(false);
  }, [router, pathname]);

  const handleModalConfirm = () => {
    setShowModal(false);
    router.replace("/");
  };

  return (
    <>
      <ExpiredSessionModal isOpen={showModal} onConfirm={handleModalConfirm} />
      {!checkingAuth && !showModal && children}
      {checkingAuth && (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default AuthWrapper;