import {
  DashBoard,
  Graph,
  User,
  Book,
  Building,
  Flag,
  Building2,
  List,
  ListFill,
  ClipBoard2,
  MenuBar
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
            icon: Building,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Schools",
            href: "/total-school",
            icon: Building2,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Courses",
            href: "/total-courses",
            icon: Book,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "All Admins",
            href: "/total-admin",
            icon: ListFill,
            roles: ["superadmin", "admin", "project"],
          },
          {
            title: "Principals",
            href: "/total-principal",
            icon: ListFill,
            roles: ["project", "school", "principal"],
          },
          {
            title: "Teachers",
            href: "/total-teacher",
            icon: MenuBar,
            roles: ["project", "school", "principal", "teacher"],
          },
          {
            title: "Students",
            href: "/total-student",
            icon: List,
            roles: ["project", "school", "principal", "teacher", "student"],
          },
          {
            title: "Assigned Courses",
            href: "/assigned-courses",
            icon: ClipBoard2,
            // roles: ["superadmin", "project", "school", "teacher", "student"],
            roles: ["project", "school", "teacher"],
          },
          {
            title: "My Profile",
            href: "/user-profile",
            icon: User,
            roles: ["superadmin", "admin", "project", "school", "principal", "teacher", "student"],
          },
          {
            title: "Support",
            href: "/contact-support",
            icon: Flag,
            roles: ["superadmin", "admin", "project", "school", "principal", "teacher", "student"],
          },
        ],
      }
    ],
  },
};
