"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { users } from "./data";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const CheckboxWithAction = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const users = [
    {
      id: 1,
      name: "Shikar Dhawan",
      title: "Laravel Developer",
      email: "shikar@gmail.com",
      role: "approved",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Yuvraj Singh",
      title: "Front-end Developer",
      email: "yuvraj@gmail.com",
      role: "pending",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "MS Dhoni",
      title: "Back-end Developer",
      email: "dhoni@gmail.com",
      role: "approved",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Ravindra Jadega",
      title: "WordPress Developer",
      email: "jadega@gmail.com",
      role: "approved",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Zaheer Khan",
      title: "Software Engineer",
      email: "zaheer@gmail.com",
      role: "rejected",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];  

  const handleSelectAll = (event) => {
    if (selectedRows?.length === users?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((row) => row.id));
    }
  };

  const handleRowSelect = (id) => {
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead>
            <Checkbox
              checked={selectedRows.length === users.length || "indeterminate"}
              onCheckedChange={handleSelectAll}
            />
          </TableHead> */}

          {/* <TableHead className=" font-semibold">
            {selectedRows.length === users.length ? (
              <div className=" flex gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  className=" text-xs "
                  color="secondary"
                >
                  Bulk edit
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  className=" text-xs "
                  color="destructive"
                >
                  Delete all
                </Button>
              </div>
            ) : (
              "Teacher Name"
            )}
          </TableHead> */}
          <TableHead>S. No.</TableHead>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assign Courses</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((item, index) => (
          <TableRow
            key={item.email}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item.id) && "selected"}
          >
            {/* <TableCell>
              <Checkbox
                checked={selectedRows.includes(item.id)}
                onCheckedChange={() => handleRowSelect(item.id)}
              />
            </TableCell> */}
            <TableCell>{index+1}</TableCell>
            <TableCell className="  font-medium  text-card-foreground/80">
              <div className="flex gap-3 items-center">
                {/* <Avatar className=" rounded-full">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar> */}
                {/* <Avatar className=" rounded-full">
                  <AvatarImage src={row?.original?.user.avatar} />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar> */}
                <span className=" text-sm   text-card-foreground">
                  {item.name}
                </span>
              </div>
            </TableCell>

            {/* <TableCell>{item.title}</TableCell> */}
            <TableCell>{item.email}</TableCell>
            <TableCell>
              {/* <Badge
                variant="soft"
                color={
                  (item.role === "admin" && "default") ||
                  (item.role === "member" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "editor" && "warning")
                }
                className=" capitalize"
              >
                {item.role}
              </Badge> */}
              <Badge
                variant="soft"
                color={
                  (item.role === "pending" && "default") ||
                  (item.role === "approved" && "success") ||
                  (item.role === "owner" && "info") ||
                  (item.role === "rejected" && "warning")
                }
                className=" capitalize"
              >
                {item.role}
              </Badge>
            </TableCell>

            <TableCell>Assigned Courses</TableCell>

            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:eye" className=" h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CheckboxWithAction;




// "use client";

// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// // import Modal from "./modal"; // Ensure you have a Modal component
// import toast from "react-hot-toast";
// // import SessionData from './session-data';

// const CheckboxWithAction = () => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [sessionData, setSessionData] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [showSessionData, setShowSessionData] = useState(false); // Toggle state

//   const fetchUsers = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("authToken");

//     try {
//       const response = await fetch(
//         "https://em4wuex6mh.ap-south-1.awsapprunner.com/api/auth/therapist/patients", // Replace {{baseUrl}} with your actual base URL
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include Bearer token
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch users");

//       const data = await response.json();
//       // Map data to include necessary patient details
//       const mappedUsers = data.map((item) => ({
//         id: item.patient.id,
//         name: item.patient.name,
//         email: item.patient.email,
//         phone: item.patient.phone,
//       }));
//       setUsers(mappedUsers);
//       // toast.success("Users loaded successfully!");
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Error fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);
  
//   // const handleSelectAll = () => {
//   //   if (selectedRows.length === users.length) {
//   //     setSelectedRows([]);
//   //   } else {
//   //     setSelectedRows(users.map((row) => row.id));
//   //   }
//   // };

//   // const handleRowSelect = (id) => {
//   //   setSelectedRows((prev) =>
//   //     prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//   //   );
//   // };

//   const fetchSessionData = async (userId) => {
//     setLoading(true);
//     setSelectedUser(userId);

//     console.log("userId", userId);
    
  
//     const token = localStorage.getItem("authToken");
  
//     try {
//       const response = await fetch(
//         `https://em4wuex6mh.ap-south-1.awsapprunner.com/api/auth/therapist/patient/${userId}/tracking`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include Bearer token
//           },
//         }
//       );
  
//       if (!response.ok) throw new Error("Failed to fetch session data");
  
//       const data = await response.json();
//       setSessionData(data);
//       setShowSessionData(true);
//       toast.success("Session data loaded successfully!");
//     } catch (error) {
//       console.error("Error fetching session data:", error);
//       toast.error("Error fetching session data");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   // // If showSessionData is true, render only the SessionData component
//   // if (selectedUser && sessionData) {
//   //   return <SessionData data={sessionData} />;
//   // }

// //    // If showSessionData is true, render only the SessionData component
// //    if (showSessionData && sessionData) {
// //     return (
// //       <SessionData
// //         data={sessionData}
// //         onBack={() => setShowSessionData(false)} // Callback to show users
// //       />
// //     );
// //   }

//   return (
//     <div>
//     {/* <h2 className="text-lg font-medium mb-4">User List</h2> */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {/* <TableHead>
//               <Checkbox
//                 checked={selectedRows.length === users.length}
//                 onCheckedChange={handleSelectAll}
//               />
//             </TableHead> */}
//             <TableHead>Patient</TableHead>
//             {/* <TableHead>Title</TableHead> */}
//             <TableHead>Email</TableHead>
//             {/* <TableHead>Role</TableHead> */}
//             <TableHead>Phone</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {users.map((user) => (
//             <TableRow
//               key={user.id}
//               className="hover:bg-muted cursor-pointer"
//               onClick={() => fetchSessionData(user.id)}
//             >
//               {/* <TableCell>
//                 <Checkbox
//                   checked={selectedRows.includes(user.id)}
//                   onCheckedChange={() => handleRowSelect(user.id)}
//                 />
//               </TableCell> */}
//               <TableCell className="font-medium">{user.name}</TableCell>
//               {/* <TableCell>{user.title}</TableCell> */}
//               <TableCell>{user.email}</TableCell>
//               <TableCell>
//                 {/* <Badge variant="soft">{user.role}</Badge> */}
//                 {user.phone}
//               </TableCell>
//               <TableCell>
//                 <Button size="icon" variant="outline">
//                   <Icon icon="heroicons:eye" className="h-4 w-4" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CheckboxWithAction;
