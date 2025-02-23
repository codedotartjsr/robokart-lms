"use client";
// import { useSession, signIn, signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

import { useEffect, useState } from "react";
import AddBlock from "../common/add-block";
import { useRouter } from "next/navigation";

const LogoutFooter = ({ menus }) => {
  const [userData, setUserData] = useState(null);
  // const { data: session } = useSession();

  const router = useRouter();

   // ✅ Fetch user data from localStorage on mount
   useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = async () => {
    // await signOut({ callbackUrl: "/en" }); // Redirect to login after logout
    localStorage.removeItem("authToken"); // Clear token from storage
    localStorage.clear();
    router.replace("/");
  };

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      {/* <AddBlock /> */}

      <div className=" bg-default-50 dark:bg-default-200 items-center flex gap-3  px-4 py-2 mt-5">
        <div className="flex-1">
          <div className=" text-default-700 font-semibold text-sm capitalize mb-0.5 truncate">
            {/* {session?.user?.name} */}
            Robokart ({capitalizeFirstLetter(userData?.role)})
          </div>
          <div className=" text-xs text-default-600  truncate">
            {/* {session?.user?.email} */}
            {userData?.email ?? "Admin"}
          </div>
        </div>
        <div className=" flex-none">
          <button
            type="button"
            // onClick={() => signOut()}
            onClick={handleLogout}
            className="  text-default-500 inline-flex h-9 w-9 rounded items-center  dark:bg-default-300 justify-center dark:text-default-900"
          >
            <Icon
              icon="heroicons:arrow-right-start-on-rectangle-20-solid"
              className=" h-5 w-5"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutFooter;
