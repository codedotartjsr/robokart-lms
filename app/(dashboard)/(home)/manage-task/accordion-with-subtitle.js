// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion";
//   import ProjectHeader from "./project-header";
  
//   const AccordionSubtitle = () => {
//     return (
//       <Accordion type="single" collapsible className="w-full  space-y-3.5">
//         <AccordionItem value="item-1">
//           <AccordionTrigger>
//             <div className="flex flex-col  text-start">
//               <div>Accordion 1</div>
//               <div className=" text-xs  text-default-600  mt-1">
//                 Press to expand
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent>
//             {/* Lemon drops chocolate cake gummies carrot cake chupa chups muffin
//             topping. Sesame snaps icing marzipan gummi bears macaroon dragée
//             danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
//             gummi bears marshmallow pastry pie. */}
//             <ProjectHeader />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-2">
//           <AccordionTrigger>
//             <div className="flex flex-col  text-start">
//               <div>Accordion 2</div>
//               <div className=" text-xs  text-default-600  mt-1">
//                 Press to expand
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent>
//             Lemon drops chocolate cake gummies carrot cake chupa chups muffin
//             topping. Sesame snaps icing marzipan gummi bears macaroon dragée
//             danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
//             gummi bears marshmallow pastry pie.
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-3">
//           <AccordionTrigger>
//             <div className="flex flex-col  text-start">
//               <div>Accordion 3</div>
//               <div className=" text-xs  text-default-600  mt-1">
//                 Press to expand
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent>
//             Lemon drops chocolate cake gummies carrot cake chupa chups muffin
//             topping. Sesame snaps icing marzipan gummi bears macaroon dragée
//             danish caramels powder. Bear claw dragée pastry topping soufflé. Wafer
//             gummi bears marshmallow pastry pie.
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     );
//   };
  
//   export default AccordionSubtitle;




"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProjectHeader from "./project-header"; // Displays assignment details

const AccordionSubtitle = () => {
  // Sample Assignments Data
  const courses = [
    {
      courseName: "Web Development with React",
      assignments: [
        {
          id: 1,
          title: "React Components and Props",
          description: "Learn how to build reusable components in React and pass data using props.",
          assignedDate: "01 Feb 2025",
          dueDate: "10 Feb 2025",
          totalHours: "6 Hours",
          assignedTo: [
            { name: "John Doe", image: "/images/students/student1.jpg" },
            { name: "Alice Smith", image: "/images/students/student2.jpg" },
          ],
          status: "In Progress",
          priority: "High",
        },
        {
          id: 5,
          title: "State Management with Redux",
          description: "Understand how to manage state using Redux in large applications.",
          assignedDate: "12 Feb 2025",
          dueDate: "22 Feb 2025",
          totalHours: "8 Hours",
          assignedTo: [
            { name: "Michael Brown", image: "/images/students/student9.jpg" },
          ],
          status: "Pending",
          priority: "Medium",
        },
      ],
    },
    {
      courseName: "Database Management",
      assignments: [
        {
          id: 2,
          title: "Database Normalization",
          description: "Understand normalization techniques and how to structure relational databases efficiently.",
          assignedDate: "05 Feb 2025",
          dueDate: "15 Feb 2025",
          totalHours: "8 Hours",
          assignedTo: [
            { name: "Sophia Brown", image: "/images/students/student4.jpg" },
          ],
          status: "Pending",
          priority: "Medium",
        },
        {
          id: 6,
          title: "SQL Query Optimization",
          description: "Optimize SQL queries for better performance and efficiency.",
          assignedDate: "10 Feb 2025",
          dueDate: "18 Feb 2025",
          totalHours: "7 Hours",
          assignedTo: [
            { name: "David Johnson", image: "/images/students/student10.jpg" },
          ],
          status: "In Progress",
          priority: "High",
        },
      ],
    },
    {
      courseName: "Data Science with Python",
      assignments: [
        {
          id: 3,
          title: "Python for Data Analysis",
          description: "Explore how to manipulate and analyze data using Pandas and NumPy in Python.",
          assignedDate: "07 Feb 2025",
          dueDate: "17 Feb 2025",
          totalHours: "10 Hours",
          assignedTo: [
            { name: "Emma Taylor", image: "/images/students/student6.jpg" },
          ],
          status: "Completed",
          priority: "Low",
        },
      ],
    },
    {
      courseName: "Cybersecurity Essentials",
      assignments: [
        {
          id: 4,
          title: "Cybersecurity Fundamentals",
          description: "Understand basic security principles and how to protect systems from attacks.",
          assignedDate: "10 Feb 2025",
          dueDate: "20 Feb 2025",
          totalHours: "5 Hours",
          assignedTo: [
            { name: "Liam Martinez", image: "/images/students/student8.jpg" },
          ],
          status: "In Progress",
          priority: "High",
        },
      ],
    },
  ];  

    return (
      <Accordion type="single" collapsible className="w-full space-y-3.5">
        {courses.map((course, index) => (
          <AccordionItem key={index} value={`course-${index}`}>
            {/* Course Name as Accordion Title */}
            <AccordionTrigger>
              <div className="flex flex-col text-start">
                {/* <div className="font-medium text-lg">{course.courseName}</div> */}
                <div>{course.courseName}</div>
                <div className="text-xs text-default-600 mt-1">
                  Click to view assignments
                </div>
              </div>
            </AccordionTrigger>
  
            {/* Assignments Inside Accordion */}
            <AccordionContent>
              {course.assignments.map((assignment) => (
                <ProjectHeader key={assignment.id} assignment={assignment} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  
  export default AccordionSubtitle;