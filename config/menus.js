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
            roles: ["superadmin", "project"],
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
            title: "Total Principal",
            href: "/total-principal",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal"],
          },
          {
            title: "Total Admin",
            href: "/total-admin",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal"],
          },
          {
            title: "Total Teacher",
            href: "/total-teacher",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal", "teacher"],
          },
          {
            title: "Total School",
            href: "/total-school",
            icon: Graph,
            roles: ["superadmin", "project"],
          },
          {
            title: "Total Student",
            href: "/total-student",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal", "teacher", "student"],
          },
          {
            title: "Total Project",
            href: "/total-project",
            icon: Graph,
            roles: ["superadmin", "project", "school"],
          },
          {
            title: "My Courses",
            href: "/my-courses",
            icon: Graph,
            roles: ["superadmin", "project", "school", "teacher"],
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
            roles: ["superadmin", "project", "school", "teacher"],
          },
          // {
          //   title: "Student Result",
          //   href: "/student-result",
          //   icon: Graph,
          //   roles: ["superadmin", "project", "school", "teacher", "student"],
          // },
          {
            title: "Profile",
            href: "/user-profile",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal", "teacher", "student"],
          },
          {
            title: "Contact Support",
            href: "/contact-support",
            icon: Graph,
            roles: ["superadmin", "project", "school", "admin", "principal", "teacher", "student"],
          },
        ],
      }
    ],
  },
};
