"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import moment from 'moment';

const ProjectHeader = ({ course }) => {
  const router = useRouter();

  const handleViewStudents = () => {
    router.push(`/assigned-courses/${newCourses.id}/students`);
  };

  const newCourses = {
      id: "1",
      students: [
          { name: "Alice Johnson"},
          { name: "Bob Smith"},
          { name: "Charlie Brown"},
          { name: "Charlie Champu"},
      ]
    }

    const handleModuleViewClick = (project) => {
      localStorage.setItem('selectedProject', JSON.stringify(project));
      router.push(`/total-courses/course-modules/?courseId=${project._id}`);
    }; 
    
    const handleCourseCompletionClick = (project) => {
      localStorage.setItem('selectedProject', JSON.stringify(project));
      router.push(`/total-courses/course-completion?courseName=${encodeURIComponent(project.title)}&courseId=${project._id}`);
    }; 

  return (
    <>
      <CardHeader className="flex-row items-center" style={{ marginTop:'-30px' }}>
      </CardHeader>
      <CardContent className="border-b border-default-200 p-0 pt-0" style={{ marginTop:'10px' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-none">
            <div className="h-[148px] w-[148px] rounded">
              <img
                // src={projectImage}
                src={course.image}
                alt={course.title}
                // alt="dashtail"
                className="w-full h-full object-cover rounded"
                width={148}
                height={148}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="text-xl font-medium text-default-950 truncate">
                {" "}
                {course.title}
              </div>
            </div>
            <div className="text-sm text-default-600 w-full  mt-1">
              {course.description}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6">
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                {/* <div className="text-sm font-medium text-default-500">Assigned Date</div> */}
                <div className="text-sm font-medium text-default-500">Created At</div>
                {/* <div className="text-sm font-medium text-default-900">{course.assignedDate}</div> */}
                <div className="text-sm font-medium text-default-900">{moment(course.createdAt).format('YYYY-MM-DD')}</div>
              </div>
              {/* <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Due Date</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.dueDate}</div> */}
                {/* <div className="text-sm font-medium text-default-900">25 jun 2025</div>
              </div> */}
              {/* <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Total Hours</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.totalHours}</div> */}
                {/* <div className="text-sm font-medium text-default-900">40 Hours</div>
              </div> */}
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px] cursor-pointer group" onClick={() => handleModuleViewClick(course)}>
                <div className="text-sm font-medium text-default-500">Modules</div>
                <div className="text-sm font-medium text-default-900 group-hover:text-blue-500">click to view</div>
              </div>
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px] cursor-pointer group" onClick={() => handleCourseCompletionClick(course)}>
                <div className="text-sm font-medium text-default-500">Course Completion</div>
                <div className="text-sm font-medium text-default-900 group-hover:text-blue-500">click to view</div>
              </div>
              {/* <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Total Students</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.totalPersons}</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.students.length}</div> */}
                {/* <div className="text-sm font-medium text-default-900">7</div>
              </div> */}

              {/* Clickable Avatar Group */}
              {/* {course.students.length > 0 && ( */}
              {/* {newCourses.students.length > 0 && (
                <div className="flex items-center justify-between cursor-pointer" onClick={handleViewStudents}>
                  <AvatarGroup max={3} total={newCourses.students.length}>
                    {newCourses.students.map((student, index) => (
                      <Avatar
                        key={index}
                        className="ring-1 ring-background ring-offset-[2px] ring-offset-background"
                      >
                        <AvatarFallback>
                          {student.name
                            ? student.name
                                .split(" ")                    // Split name into words
                                .map((word) => word.charAt(0))  // Get the first letter of each word
                                .slice(0, 2)                    // Limit to two letters (e.g., initials)
                                .join("")
                                .toUpperCase()                  // Convert to uppercase initials
                            : "N/A"}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span className="text-blue-500 text-sm font-medium hover:underline ml-3">View All</span>
                </div>
              )} */}

            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ProjectHeader;
