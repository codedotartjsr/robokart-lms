"use client";

import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import Link from "next/link";
import { useParams } from "next/navigation";

const courses = [
    {
      id: "1",
      title: "Mathematics 101",
      students: [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "approved", image: "/images/avatar/avatar-1.jpg" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "pending", image: "/images/avatar/avatar-2.jpg" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "approved", image: "/images/avatar/avatar-3.jpg" },
      ],
    },
    {
      id: "2",
      title: "Physics Fundamentals",
      students: [
        { id: 4, name: "David Lee", email: "david@example.com", role: "approved", image: "/images/avatar/avatar-4.jpg" },
        { id: 5, name: "Eve Adams", email: "eve@example.com", role: "rejected", image: "/images/avatar/avatar-5.jpg" },
      ],
    },
  ];

const TailwindUiTable = () => {

    const params = useParams();
  const { courseId } = params;

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <p>Course not found</p>;
  }
  
  return (
    <div className=" space-y-6">

      {/* <Card title="List of Students">
        <CheckboxWithAction />
      </Card> */}

      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="block text-lg font-medium">List of Students</span>
            <Link href="/assigned-courses" className="text-blue-500 text-sm hover:underline">
              &larr; Back to Courses
            </Link>
          </div>
        }
      >
        <h4 className="text-sm font-semibold text-gray-600 mb-4 -mt-2">{course.title}</h4>
        <CheckboxWithAction course={course} />
      </Card>

        {/* <Card
            title={
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-lg font-medium">List of Students</span>
                        <h4 className="text-sm font-semibold text-gray-600 pb-1 border-b-2 border-dotted border-gray-400">
                            {course.title}
                        </h4>
                    </div>
                    <Link href="/assigned-courses" className="text-blue-500 text-sm hover:underline">
                        &larr; Back to Courses
                    </Link>
                </div>
            }
        >
        <CheckboxWithAction course={course} />
        </Card> */}
    </div>
  );
};

export default TailwindUiTable;