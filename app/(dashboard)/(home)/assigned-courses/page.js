"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card-snippet";
import ProjectHeader from "./project-header"; 
import config from "@/config/config";

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
                const response = await fetch(`${config.API_BASE_URL}/v1/teacher/coursesOfTeacher/${teacherId}`);
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

  return (
    <div className="grid grid-cols-1 gap-5 pt-4">
      <Card title="Your Assigned Courses">
        <p className="text-sm text-default-400 dark:text-default-600 mb-4">
        Below is a list of your assigned courses with details about each course and the students assigned to them.
        </p>
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
