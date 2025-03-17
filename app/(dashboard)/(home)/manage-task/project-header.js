"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectHeader = ({ assignment }) => {
  const data = [
    {
      text: "assigned date",
      date: "24 June 2023",
    },
    {
      text: "Due Date",
      date: "09 Dec 2023",
    },
    {
      text: "Total Hours",
      date: "09 Dec 2023",
    },
    {
      text: "Total Person",
      date: "09 Dec 2023",
    },
  ];
  const users = [
    {
      name: "Nick Jonas",
      value: "userid1",
      // image: avatar1,
      lastMessage: "How are you?",
      isUserActive: true,
    },
    {
      name: "Fahim",
      value: "userid2",
      // image: avatar2,
      lastMessage: "Are you okay?",
      isUserActive: false,
    },
    {
      name: "Nayeem",
      value: "userid3",
      // image: avatar3,
      lastMessage: "",
      isUserActive: true,
    },
    {
      name: "Iftekhar",
      value: "userid4",
      // image: avatar4,
      lastMessage: "Is everything fine?",
      isUserActive: false,
    },
  ];
  return (
    <>
      <CardHeader className="flex-row items-center" style={{ marginTop:'-30px' }}>
      </CardHeader>
      <CardContent className="border-b border-default-200 p-2 pt-0" style={{ marginTop:'10px' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="text-sm font-medium text-default-950 truncate">
                {" "}
                {assignment.title} - {assignment.course}
              </div>
              <div className="space-x-3 rtl:space-x-reverse ">
                <Badge
                  color={
                    assignment.priority === "High"
                      ? "warning"
                      : assignment.priority === "Medium"
                      ? "info"
                      : "success"
                  }
                  variant="soft"
                >
                  {assignment.priority}
                </Badge>
                <Badge
                  color={
                    assignment.status === "In Progress"
                      ? "info"
                      : assignment.status === "Pending"
                      ? "warning"
                      : "success"
                  }
                  variant="soft"
                >
                  {assignment.status}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-default-600 w-full  mt-1">
              {assignment.description}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6 justify-between w-full">
            <div className="flex flex-wrap items-center gap-2 lg:gap-6">
                <div
                  className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]"
                >
                  <div className="text-sm font-medium text-default-500 capitalize">
                    Assigned Date
                  </div>
                  <div className="text-sm font-medium text-default-900">
                    {assignment.assignedDate}
                  </div>
                </div>

                <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500 capitalize">
                  Due Date
                </div>
                <div className="text-sm font-medium text-default-900">
                  {assignment.dueDate}
                </div>
              </div>
              <div className="border border-dashed border-default-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]">
                <div className="text-sm font-medium text-default-500 capitalize">
                  Total Hours
                </div>
                <div className="text-sm font-medium text-default-900">
                  {assignment.totalHours}
                </div>
              </div>
              </div>

                <div className="flex space-x-3">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center space-x-2 px-3"
                        onClick={() => console.log(`Downloading ${assignment.title}`)}
                    >
                        <Icon icon="mdi:download" className="w-5 h-5 text-default-600" />
                        <span className="text-sm font-medium">Download</span>
                    </Button>

                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center space-x-2 px-3"
                        onClick={() => console.log(`Uploading ${assignment.title}`)}
                    >
                        <Icon icon="mdi:upload" className="w-5 h-5 text-default-600" />
                        <span className="text-sm font-medium">Upload</span>
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ProjectHeader;
