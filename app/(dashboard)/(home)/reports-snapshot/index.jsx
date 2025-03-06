"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsChart from "./reports-chart";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import DashboardSelect from "@/components/dasboard-select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const allUsersSeries = [
  {
    data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80],
  },
];
const conversationSeries = [
  {
    data: [80, 70, 65, 40, 40, 100, 100, 75, 60, 80],
  },
];
const eventCountSeries = [
  {
    data: [20, 70, 65, 60, 40, 60, 90, 75, 60, 40],
  },
];
const newUserSeries = [
  {
    data: [20, 70, 65, 40, 100, 60, 100, 75, 60, 80],
  },
];
const ReportsSnapshot = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const primary = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
    })`;
  const warning = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
    })`;
  const success = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success
    })`;
  const info = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info
    })`;

    const [counts, setCounts] = useState({
      students: 0,
      schools: 0,
      admins: 0,
      projects: 0,
      // courses: 0,
      teachers: 0
    });

    const [activeTab, setActiveTab] = useState("students");
  const [chartData, setChartData] = useState({});

  // const tabsTrigger = [
  //   {
  //     value: "all",
  //     text: "all user",
  //     total: "10,234",
  //     color: "primary",
  //   },
  //   {
  //     value: "event",
  //     text: "Event Count",
  //     total: "536",
  //     color: "warning",
  //   },
  //   {
  //     value: "conversation",
  //     text: "conversations",
  //     total: "21",
  //     color: "success",
  //   },
  //   {
  //     value: "newuser",
  //     text: "New User",
  //     total: "3321",
  //     color: "info",
  //   },
  // ];

  useEffect(() => {
    const fetchCounts = async () => {
      const urls = [
        "https://xcxd.online:8080/api/v1/student/getStudents",
        "https://xcxd.online:8080/api/v1/school",
        "https://xcxd.online:8080/api/v1/admin/getAllAdmin",
        "https://xcxd.online:8080/api/v1/project/getAllProject",
        "https://xcxd.online:8080/api/v1/course/getAllCourse",
        "https://xcxd.online:8080/api/v1/teacher/getAllTeacher"
      ];
      const requests = urls.map(url => fetch(url).then(res => res.json()));

      try {
        const results = await Promise.all(requests);
        setCounts({
          students: results[0].data.length,
          schools: results[1].data.length,
          admins: results[2].data.length,
          projects: results[3].data.length,
          // courses: results[4].data.length,
          teachers: results[5].data.length
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  console.log("counts", counts);
  

    // Function to fetch and process data
    const fetchData = async (url, category) => {
      try {
        const response = await fetch(url);
        const { data } = await response.json();
        const processedData = processChartData(data);
        setChartData(prev => ({ ...prev, [category]: processedData }));
      } catch (error) {
        console.error(`Error fetching data for ${category}:`, error);
      }
    };

    // Process chart data
  const processChartData = (data) => {
    const enrollmentCounts = data.reduce((acc, item) => {
      const date = new Date(item.createdAt).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});

    return [{ data: Object.entries(enrollmentCounts).map(([date, count]) => ({ x: date, y: count })) }];
  };

  useEffect(() => {
    fetchData("https://xcxd.online:8080/api/v1/student/getStudents", "students");
    fetchData("https://xcxd.online:8080/api/v1/teacher/getAllTeacher", "teachers");
    fetchData("https://xcxd.online:8080/api/v1/school", "schools");
    fetchData("https://xcxd.online:8080/api/v1/admin/getAllAdmin", "admins");
    fetchData("https://xcxd.online:8080/api/v1/project/getAllProject", "projects");
    // fetchData("https://xcxd.online:8080/api/v1/course/getAllCourse", "courses");
  }, []);

  const tabsConfig = [
    { key: "students", title: "Total Students", url: "https://xcxd.online:8080/api/v1/student/getStudents", color: "success", },
    { key: "teachers", title: "Total Teachers", url: "https://xcxd.online:8080/api/v1/teacher/getAllTeacher", color: "warning", },
    { key: "schools", title: "Total Schools", url: "https://xcxd.online:8080/api/v1/school", color: "primary", },
    { key: "admins", title: "Total Admins", url: "https://xcxd.online:8080/api/v1/admin/getAllAdmin", color: "info", },
    { key: "projects", title: "Total Projects", url: "https://xcxd.online:8080/api/v1/project/getAllProject", color: "info", },
    // { key: "courses", title: "Total Courses", url: "https://xcxd.online:8080/api/v1/course/getAllCourse", color: "info", },
  ];
  
  const tabsTrigger = [
    {
      value: "schools",
      text: "Total Schools",
      total: counts.schools,
      color: "primary",
    },
    {
      value: "teachers",
      text: "Total Teachers",
      total: counts.teachers,
      color: "warning",
    },
    {
      value: "students",
      text: "Total Students",
      total: counts.students,
      color: "success",
    },
    // {
    //   value: "Courses",
    //   text: "Total Courses",
    //   total: counts.courses,
    //   color: "info",
    // },
    { value: "admins", text: "Total Admins", total: counts.admins, color: "info" },
    { value: "projects", text: "Total Projects", total: counts.projects, color: "info" },
  ];
  
  const tabsContentData = [
    {
      value: "all",
      series: allUsersSeries,
      color: primary,
    },
    {
      value: "event",
      series: eventCountSeries,
      color: warning,
    },
    {
      value: "conversation",
      series: conversationSeries,
      color: success,
    },
    {
      value: "newuser",
      series: newUserSeries,
      color: info,
    },
  ];

  console.log("tabsContentData", tabsContentData);  
  
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-0">
        <div className="flex items-center gap-2 flex-wrap ">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
              Reports Snapshot
            </div>
            <span className="text-xs text-default-600">
              {/* Demographic properties of your customer */}
              Overview of schools, teachers, and students in your system
            </span>
          </div>
          {/* <div className="flex-none">
            <DashboardSelect />
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-5">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
            {tabsTrigger.map((item, index) => (
              <TabsTrigger
                key={`report-trigger-${index}`}
                value={item.value}
                className={cn(
                  "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                  {
                    "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70": item.color === "primary",
                    "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500": item.color === "warning",
                    "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500": item.color === "success",
                    "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ": item.color === "info",
                  }
                )}
              >
                <span
                  className={cn(
                    "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                    {
                      "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                      "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                      "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                      "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                    }
                  )}
                ></span>
                <span className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                  {" "}
                  {item.text}
                </span>
                <span className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}>
                  {item.total}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {/* charts data */}
          {/* {tabsContentData.map((item, index) => (
            <TabsContent key={`report-tab-${index}`} value={item.value}>
              <ReportsChart series={item.series} chartColor={item.color} />
            </TabsContent>
          ))} */}
          {tabsConfig.map(tab => (
            <TabsContent key={tab.key} value={tab.key}>
              <ReportsChart series={chartData[tab.key] || []} chartColor={theme.cssVars[mode][tab.color]} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsSnapshot;
