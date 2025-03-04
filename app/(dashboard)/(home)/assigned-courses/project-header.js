"use client";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@iconify/react";
// import projectImage from "@/public/images/projects/project-1.png";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Popover,
//   PopoverClose,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { X } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import { faker } from "@faker-js/faker";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import avatar1 from "@/public/images/avatar/avatar-7.jpg";
// import avatar2 from "@/public/images/avatar/avatar-2.jpg";
// import avatar3 from "@/public/images/avatar/avatar-3.jpg";
// import avatar4 from "@/public/images/avatar/avatar-4.jpg";
// import avatar5 from "@/public/images/avatar/avatar-5.jpg";
// import avatar6 from "@/public/images/avatar/avatar-6.jpg";
// import avatar7 from "@/public/images/avatar/avatar-7.jpg";
// import avatar8 from "@/public/images/avatar/avatar-8.jpg";
// import avatar9 from "@/public/images/avatar/avatar-9.jpg";
// import avatar10 from "@/public/images/avatar/avatar-10.jpg";
// import avatar11 from "@/public/images/avatar/avatar-11.jpg";

import { useRouter } from "next/navigation";

const ProjectHeader = ({ course }) => {

  console.log("course", course); 
  
  const router = useRouter();

  const handleViewStudents = () => {
    // Navigate to the new page with course ID
    // router.push(`/assigned-courses/${course.id}/students`);
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
      // router.push('/total-school'); // Navigate to the /total-school page
      router.push(`/total-courses/course-modules/?courseId=${project._id}`);
    }; 
    
    const handleCourseCompletionClick = (project) => {
      localStorage.setItem('selectedProject', JSON.stringify(project));
      // router.push('/total-school'); // Navigate to the /total-school page
      // router.push(`/total-courses/course-completion/?courseName=${project.title}/?courseId=${project._id}`);
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
                {/* Dashtail - Admin Template */}
                {course.title}
              </div>
              {/* <div className="space-x-3 rtl:space-x-reverse ">
                <Badge color="warning" variant="soft">
                  {" "}
                  {course.priority}
                </Badge>
                <Badge color="info" variant="soft">
                  {" "}
                  {course.status}
                </Badge>
              </div> */}
            </div>
            <div className="text-sm text-default-600 w-full  mt-1">
              {/* Create a Brand logo design for a DashTail Admin. Logo should be
              match our dashboard theme. */}
              {course.description}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6">
              {/* {data.map((item, index) => (
                <div
                  key={index}
                  className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]"
                >
                  <div className="text-sm font-medium text-default-500 capitalize">
                    {item.text}
                  </div>
                  <div className="text-sm font-medium text-default-900">
                    {item.date}
                  </div>
                </div>
              ))} */}
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Assigned Date</div>
                {/* <div className="text-sm font-medium text-default-900">{course.assignedDate}</div> */}
                <div className="text-sm font-medium text-default-900">15 feb 2025</div>
              </div>
              {/* <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Due Date</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.dueDate}</div> */}
                {/* <div className="text-sm font-medium text-default-900">25 jun 2025</div>
              </div> */}
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Total Hours</div>
                {/* <div className="text-sm font-medium text-default-900">{course.totalHours}</div> */}
                <div className="text-sm font-medium text-default-900">40 Hours</div>
              </div>
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px] cursor-pointer" onClick={() => handleModuleViewClick(course)}>
                <div className="text-sm font-medium text-default-500">Modules</div>
                <div className="text-sm font-medium text-default-900">view</div>
              </div>
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px] cursor-pointer" onClick={() => handleCourseCompletionClick(course)}>
                <div className="text-sm font-medium text-default-500">Course Completion</div>
                <div className="text-sm font-medium text-default-900">view</div>
              </div>
              {/* <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500">Total Students</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.totalPersons}</div> */}
                {/* <div className="text-sm font-medium text-default-900">{course.students.length}</div> */}
                {/* <div className="text-sm font-medium text-default-900">7</div>
              </div> */}
              {/* {project?.assign?.length > 0 && (
                <div>
                  <AvatarGroup max={3} total={project.assign.length}>
                    {project.assign?.map((user, index) => (
                      <Avatar
                        key={index}
                        className=" ring-1 ring-background ring-offset-[2px]  ring-offset-background"
                      >
                        <AvatarImage src={user?.image?.src} />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )} */}
              {/* Assigned Students */}
              {/* {course.students.length > 0 && (
                <div>
                  <AvatarGroup max={3} total={course.students.length}>
                    {course.students.map((student, index) => (
                      <Avatar
                        key={index}
                        className="ring-1 ring-background ring-offset-[2px] ring-offset-background"
                      >
                        <AvatarImage src={student.image.src} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )} */}

              {/* {course.students.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer">
                      <AvatarGroup max={3} total={course.students.length}>
                        {course.students.map((student, index) => (
                          <Avatar
                            key={index}
                            className="ring-1 ring-background ring-offset-[2px] ring-offset-background"
                          >
                            <AvatarImage src={student.image.src} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-default-900 mb-2">
                        Assigned Students
                      </div>
                      {course.students.map((student, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.image.src} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-default-700">{student.name}</div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )} */}

              {/* Clickable Avatar Group */}
              {/* {course.students.length > 0 && ( */}
              {newCourses.students.length > 0 && (
                <div className="flex items-center justify-between cursor-pointer" onClick={handleViewStudents}>
                  {/* <AvatarGroup max={3} total={course.students.length}> */}
                  <AvatarGroup max={3} total={newCourses.students.length}>
                    {/* {course.students.map((student, index) => ( */}
                    {newCourses.students.map((student, index) => (
                      <Avatar
                        key={index}
                        className="ring-1 ring-background ring-offset-[2px] ring-offset-background"
                      >
                        {/* <AvatarImage src={student.image.src} alt={student.name} /> */}
                        {/* <AvatarFallback>{student.name.charAt(0)}</AvatarFallback> */}
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
              )}

            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ProjectHeader;
