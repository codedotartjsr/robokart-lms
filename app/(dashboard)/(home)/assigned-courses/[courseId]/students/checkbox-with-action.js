// "use client";

// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// // import { users } from "./data";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// const CheckboxWithAction = () => {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const users = [
//     {
//       id: 1,
//       name: "Shikar Dhawan",
//       title: "Laravel Developer",
//       email: "shikar@gmail.com",
//       role: "approved",
//       avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     },
//     {
//       id: 2,
//       name: "Yuvraj Singh",
//       title: "Front-end Developer",
//       email: "yuvraj@gmail.com",
//       role: "pending",
//       avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     },
//     {
//       id: 3,
//       name: "MS Dhoni",
//       title: "Back-end Developer",
//       email: "dhoni@gmail.com",
//       role: "approved",
//       avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//     },
//     {
//       id: 4,
//       name: "Ravindra Jadega",
//       title: "WordPress Developer",
//       email: "jadega@gmail.com",
//       role: "approved",
//       avatar: "https://randomuser.me/api/portraits/men/4.jpg",
//     },
//     {
//       id: 5,
//       name: "Zaheer Khan",
//       title: "Software Engineer",
//       email: "zaheer@gmail.com",
//       role: "rejected",
//       avatar: "https://randomuser.me/api/portraits/men/5.jpg",
//     },
//   ];  

//   const handleSelectAll = (event) => {
//     if (selectedRows?.length === users?.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(users.map((row) => row.id));
//     }
//   };

//   const handleRowSelect = (id) => {
//     const updatedSelectedRows = [...selectedRows];
//     if (selectedRows.includes(id)) {
//       updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
//     } else {
//       updatedSelectedRows.push(id);
//     }
//     setSelectedRows(updatedSelectedRows);
//   };

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           {/* <TableHead>
//             <Checkbox
//               checked={selectedRows.length === users.length || "indeterminate"}
//               onCheckedChange={handleSelectAll}
//             />
//           </TableHead> */}

//           {/* <TableHead className=" font-semibold">
//             {selectedRows.length === users.length ? (
//               <div className=" flex gap-2">
//                 <Button
//                   size="xs"
//                   variant="outline"
//                   className=" text-xs "
//                   color="secondary"
//                 >
//                   Bulk edit
//                 </Button>
//                 <Button
//                   size="xs"
//                   variant="outline"
//                   className=" text-xs "
//                   color="destructive"
//                 >
//                   Delete all
//                 </Button>
//               </div>
//             ) : (
//               "Teacher Name"
//             )}
//           </TableHead> */}
//           <TableHead>S. No.</TableHead>
//           <TableHead>Teacher Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Assign Courses</TableHead>
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {users.map((item, index) => (
//           <TableRow
//             key={item.email}
//             className="hover:bg-muted"
//             data-state={selectedRows.includes(item.id) && "selected"}
//           >
//             {/* <TableCell>
//               <Checkbox
//                 checked={selectedRows.includes(item.id)}
//                 onCheckedChange={() => handleRowSelect(item.id)}
//               />
//             </TableCell> */}
//             <TableCell>{index+1}</TableCell>
//             <TableCell className="  font-medium  text-card-foreground/80">
//               <div className="flex gap-3 items-center">
//                 {/* <Avatar className=" rounded-full">
//                   <AvatarImage src={item.avatar} />
//                   <AvatarFallback>AB</AvatarFallback>
//                 </Avatar> */}
//                 {/* <Avatar className=" rounded-full">
//                   <AvatarImage src={row?.original?.user.avatar} />
//                   <AvatarFallback>AB</AvatarFallback>
//                 </Avatar> */}
//                 <span className=" text-sm   text-card-foreground">
//                   {item.name}
//                 </span>
//               </div>
//             </TableCell>

//             {/* <TableCell>{item.title}</TableCell> */}
//             <TableCell>{item.email}</TableCell>
//             <TableCell>
//               {/* <Badge
//                 variant="soft"
//                 color={
//                   (item.role === "admin" && "default") ||
//                   (item.role === "member" && "success") ||
//                   (item.role === "owner" && "info") ||
//                   (item.role === "editor" && "warning")
//                 }
//                 className=" capitalize"
//               >
//                 {item.role}
//               </Badge> */}
//               <Badge
//                 variant="soft"
//                 color={
//                   (item.role === "pending" && "default") ||
//                   (item.role === "approved" && "success") ||
//                   (item.role === "owner" && "info") ||
//                   (item.role === "rejected" && "warning")
//                 }
//                 className=" capitalize"
//               >
//                 {item.role}
//               </Badge>
//             </TableCell>

//             <TableCell>Assigned Courses</TableCell>

//             <TableCell className="flex justify-end">
//               <div className="flex gap-3">
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   color="secondary"
//                   className="h-7 w-7"
//                 >
//                   <Icon icon="heroicons:pencil" className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   className="h-7 w-7"
//                   color="secondary"
//                 >
//                   <Icon icon="heroicons:eye" className=" h-4 w-4" />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   className=" h-7 w-7"
//                   color="secondary"
//                 >
//                   <Icon icon="heroicons:trash" className=" h-4 w-4" />
//                 </Button>
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default CheckboxWithAction;






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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

import { useParams, useRouter } from "next/navigation";

const CheckboxWithAction = ({ course }) => {
  const [selectedRows, setSelectedRows] = useState([]);

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
          <TableHead>Student Name</TableHead>
          <TableHead>Email</TableHead>
          {/* <TableHead>Status</TableHead> */}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* {users.map((item, index) => ( */}
        {course.students.length === 0 ? (
          // If no students exist, display a message row
          <tr>
            <td colSpan={5} className="text-left text-gray-500 pl-4 pt-4 pb-4">No students assigned to this course.</td>
          </tr>
        ) : (
          // If students exist, display each student
        course.students.map((student, index) => (
          <TableRow
            key={student.id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(student.id) && "selected"}
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
                {/* <Avatar className="rounded-full">
                  <AvatarImage src={student.image} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                {/* <Avatar className=" ring-1 ring-dark ring-offset-[3px]  ring-offset-background">
                    <AvatarFallback className=" bg-info/10  text-info">FK</AvatarFallback>
                </Avatar> */}
                <Avatar className="ring-1 ring-dark ring-offset-[3px] ring-offset-background h-[25px] w-[25px]">
                    <AvatarFallback className="bg-info/10 text-info">
                        {student.name
                        ? student.name
                            .split(" ")                    // Split the name by space
                            .map((word) => word.charAt(0)) // Get the first letter of each word
                            .slice(0, 2)                   // Limit to two letters (e.g., first and last name)
                            .join("")
                            .toUpperCase()                 // Convert to uppercase
                        : "N/A"}
                    </AvatarFallback>
                </Avatar>

                <span className=" text-sm   text-card-foreground">
                    {student.name}
                </span>
              </div>
            </TableCell>

            {/* <TableCell>{item.title}</TableCell> */}
            <TableCell>{student.email}</TableCell>
            {/* <TableCell> */}
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
              {/* <Badge
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
              </Badge> */}
              {/* <Badge
                variant="soft"
                color={student.role === "approved" ? "success" : student.role === "pending" ? "default" : "warning"}
                className="capitalize"
              >
                {student.role}
              </Badge>
            </TableCell> */}

            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                {/* <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button> */}
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
        ))
    )}
      </TableBody>
    </Table>
  );
};

export default CheckboxWithAction;


