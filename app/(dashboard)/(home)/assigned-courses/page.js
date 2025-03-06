"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card-snippet";
import ProjectHeader from "./project-header"; // Displays assignment details
// import avatar1 from "@/public/images/avatar/avatar-7.jpg";
// import avatar2 from "@/public/images/avatar/avatar-2.jpg";
// import avatar3 from "@/public/images/avatar/avatar-3.jpg";
// import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import projectImage from "@/public/images/projects/project-1.png";

const AccordionPage = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const userData = localStorage.getItem('user');
            if (!userData) {
                toast.error("User data not found.");
                return;
            }

            const user = JSON.parse(userData);
            const teacherId = user._id;

            try {
                const response = await fetch(`https://xcxd.online:8080/api/v1/teacher/coursesOfTeacher/${teacherId}`);
                const data = await response.json();

                if (response.ok) {
                    setAssignedCourses(data.data.courses || []);
                } else {
                    throw new Error(data.message || "Failed to fetch courses");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                toast.error(error.message || "An error occurred while fetching courses.");
            }
        };

        fetchCourses();
    }, []);

  // const assignedCourses = [
  //   {
  //     id: "1",
  //     title: "Mathematics 101",
  //     description: "Introduction to Algebra and Geometry.",
  //     // image: "/images/courses/math.png",projectImage
  //     image: projectImage,
  //     priority: "High",
  //     status: "In Progress",
  //     assignedDate: "10 Jan 2024",
  //     dueDate: "20 Mar 2024",
  //     totalHours: "40 Hours",
  //     totalPersons: 3,
  //     students: [
  //       { name: "Alice Johnson"},
  //       { name: "Bob Smith"},
  //       { name: "Charlie Brown"},
  //       { name: "Charlie Champu"},
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Physics Fundamentals",
  //     description: "Basics of Newtonian Mechanics.",
  //     image: projectImage,
  //     priority: "Medium",
  //     status: "Ongoing",
  //     assignedDate: "15 Jan 2024",
  //     dueDate: "30 Apr 2024",
  //     totalHours: "50 Hours",
  //     totalPersons: 4,
  //     students: [
  //       { name: "David Lee"},
  //       { name: "Eve Adams"},
  //     ],
  //   },
  // ];

  return (
    <div className="grid grid-cols-1 gap-5 pt-4">
      <Card title="Your Assigned Courses">
        <p className="text-sm text-default-400 dark:text-default-600 mb-4">
        Below is a list of your assigned courses with details about each course and the students assigned to them.
        </p>
        {/* <AccordionSubtitle /> */}
        {/* <ProjectHeader /> */}
        {/* {assignedCourses.map((course, index) => (
          <ProjectHeader key={index} course={course} />
        ))} */}
        {assignedCourses.length > 0 ? assignedCourses.map((course, index) => (
            <ProjectHeader key={index} course={course} />
        )) : (
            <p className="text-sm text-gray-500">No courses assigned.</p>
        )}
      </Card>
    </div>
  );
};

export default AccordionPage;
