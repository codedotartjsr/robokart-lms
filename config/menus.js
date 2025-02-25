import {
  DashBoard,
  Graph
} from "@/components/svg";

export const menusConfig = {
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        // roles: ["superadmin", "project", "school", "admin", "principal", "teacher", "student"],
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Projects",
            href: "/total-project",
            icon: Graph,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Schools",
            href: "/total-school",
            icon: Graph,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Courses",
            href: "/total-courses",
            icon: Graph,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Admins",
            href: "/total-admin",
            icon: Graph,
            roles: ["superadmin", "admin", "project"],
          },
          // {
          //   title: "Teacher Onboard",
          //   href: "/teacher-onboard",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "admin", "principal"],
          // },
          // {
          //   title: "Student Onboard",
          //   href: "/student-onboard",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "admin", "principal", "teacher"],
          // },
          // {
          //   title: "Pending Request",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "admin", "principal", "teacher"],
          //   nested: [
          //     {
          //       title: "Teacher",
          //       icon: Graph,
          //       href: "/pending-request-teacher",
          //     },
          //     {
          //       title: "Student",
          //       icon: Graph,
          //       href: "/pending-request-student",
          //     },
          //   ],
          // },
          {
            title: "Principals",
            href: "/total-principal",
            icon: Graph,
            roles: ["project", "school", "principal"],
          },
          {
            title: "Teachers",
            href: "/total-teacher",
            icon: Graph,
            roles: ["project", "school", "principal", "teacher"],
          },
          {
            title: "Students",
            href: "/total-student",
            icon: Graph,
            roles: ["project", "school", "principal", "teacher", "student"],
          },
          {
            title: "My Courses",
            href: "/my-courses",
            icon: Graph,
            roles: ["project", "school", "teacher"],
          },
          // {
          //   title: "Project Corner",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "teacher", "student"],
          //   nested: [
          //     {
          //       title: "Manage Task",
          //       icon: Graph,
          //       href: "/manage-task",
          //     },
          //     {
          //       title: "Result",
          //       icon: Graph,
          //       href: "/result",
          //     },
          //   ],
          // },
          // {
          //   title: "certificate",
          //   href: "/certificate",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "teacher", "student"],
          // },
          {
            title: "Assigned Courses",
            href: "/assigned-courses",
            icon: Graph,
            // roles: ["superadmin", "project", "school", "teacher", "student"],
            roles: ["project", "school", "teacher"],
          },
          // {
          //   title: "Student Result",
          //   href: "/student-result",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "teacher", "student"],
          // },
          {
            title: "My Profile",
            href: "/user-profile",
            icon: Graph,
            roles: ["superadmin", "admin", "project", "school", "principal", "teacher", "student"],
          },
          {
            title: "Support",
            href: "/contact-support",
            icon: Graph,
            roles: ["superadmin", "admin", "project", "school", "principal", "teacher", "student"],
          },
        ],
      }
    ],
  },
};
