"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
// import UsersDataChart from "./users-data-chart";
import UsersDataTable from "./users-data-table";
import { useEffect, useState } from "react";

const UsersStat = () => {
  // State to store the fetched course data
  const [courses, setCourses] = useState([]);

  const data = [
    {
      id: 1,
      category: "Mathematics",
      count: "12",
    },
    {
      id: 2,
      category: "Science",
      count: "15",
    },
    {
      id: 3,
      category: "English",
      count: "10",
    },
    {
      id: 4,
      category: "History",
      count: "8",
    },
    {
      id: 5,
      category: "Art",
      count: "5",
    },
    {
      id: 6,
      category: "Mathematics",
      count: "12",
    },
    {
      id: 7,
      category: "Science",
      count: "15",
    },
    {
      id: 8,
      category: "English",
      count: "10",
    },
    {
      id: 9,
      category: "History",
      count: "8",
    },
    {
      id: 10,
      category: "Art",
      count: "5",
    },
    {
      id: 11,
      category: "Art",
      count: "5",
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/course/getAllCourse");
        const json = await response.json();
        if (json.success) {
          const transformedData = json.data.map(course => ({
            id: course._id,
            category: course.title,
            count: course.description,  // Assuming count is still needed
            createdAt: new Date(course.createdAt).toLocaleDateString("en-US")  // Format date
          }));
          setCourses(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
  
    fetchCourses();
  }, []);  
  
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900"> Courses </div>
            <span className="text-xs text-default-600">We need to bring learning to people instead of people to learning.</span>
          </div>
          <div className="flex-none flex items-center gap-1">
            <span className="text-4xl font-semibold text-primary">{courses.length}</span>
            <span className="text-2xl text-success">
              <Icon icon="heroicons:arrow-trending-up-16-solid" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        {/* <p className="text-xs font-medium text-default-800">User Per Minutes</p> */}
        {/* <UsersDataChart /> */}
        {/* <UsersDataTable users={data} /> */}
        <UsersDataTable users={courses} />
      </CardContent>
    </Card>
  );
};

export default UsersStat;