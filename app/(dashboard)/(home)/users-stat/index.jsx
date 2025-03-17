"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import UsersDataTable from "./users-data-table";
import { useEffect, useState } from "react";
import config from "@/config/config";

const UsersStat = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/v1/course/getAllCourse`);
        const json = await response.json();
        if (json.success) {
          const transformedData = json.data.map(course => ({
            id: course._id,
            category: course.title,
            count: course.description,
            createdAt: new Date(course.createdAt).toLocaleDateString("en-US")
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
        <UsersDataTable users={courses} />
      </CardContent>
    </Card>
  );
};

export default UsersStat;