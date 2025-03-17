"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

  const projects = [
    {
      id: 1,
      title: "Introduction to Programming",
      category: "Computer Science",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Learn the fundamentals of programming using Python, including variables, loops, and functions.",
      image: "/images/card/card7.jpg",
      percentage: 40,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 2,
      title: "Digital Marketing Basics",
      category: "Marketing",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "An introductory course to understand SEO, social media marketing, and content strategy.",
      image: "/images/card/card8.jpg",
      percentage: 60,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 3,
      title: "Data Science with Python",
      category: "Data Science",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Dive into data analysis, visualization, and machine learning using Python.",
      image: "/images/card/card9.jpg",
      percentage: 75,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 4,
      title: "Business Communication",
      category: "Business",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Improve your communication skills in professional settings, including emails and presentations.",
      image: "/images/card/card7.jpg",
      percentage: 30,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 5,
      title: "Graphic Design Fundamentals",
      category: "Design",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Learn the principles of graphic design and how to use tools like Adobe Photoshop and Illustrator.",
      image: "/images/card/card8.jpg",
      percentage: 85,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 6,
      title: "Web Development Bootcamp",
      category: "Web Development",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "A comprehensive course covering HTML, CSS, JavaScript, and modern frameworks like React.",
      image: "/images/card/card9.jpg",
      percentage: 50,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 7,
      title: "Cybersecurity Basics",
      category: "Cybersecurity",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Understand the basics of cybersecurity, ethical hacking, and securing systems.",
      image: "/images/card/card7.jpg",
      percentage: 20,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
    {
      id: 8,
      title: "Advanced Excel for Professionals",
      category: "Productivity",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Master advanced Excel features like pivot tables, macros, and data visualization.",
      image: "/images/card/card8.jpg",
      percentage: 90,
      links: [
        { href: "#", label: "Course Details" },
        // { href: "#", label: "Enroll Now" },
      ],
    },
  ];
  

const PostCard = () => {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {projects.map((project) => (
        <Card key={project.id}>
        <CardContent className="p-4">
          <div className="w-full h-[191px] overflow-hidden  rounded-md mb-4">
            <img
              className="w-full h-full object-cover"
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            />
          </div>
          <div className="mb-4">
            <p className="mb-1 text-xl text-default-700  font-medium">
              {project.title}
            </p>
            <p className="text-muted-foreground text-base">
              {project.category}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
          </div>

            <div className="mt-5">
                <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-default-900 capitalize">
                    Your Progress:
                </span>
                <span className="text-xs font-medium text-default-600">
                    {project.percentage}%
                </span>
                </div>
                <Progress value={project.percentage} />
            </div>

        <div className="flex justify-between items-center mt-4">
            <div className="space-x-6 rtl:space-x-reverse">
                {project.links.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className="text-primary inline-flex font-medium text-sm items-center underline"
                >
                    {link.label}
                </Link>
                ))}
            </div>

            <button
                onClick={() => console.log(`Resuming course for ${project.title}`)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
                Resume
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.75L21 12m0 0-3.75 3.25M21 12H3"
                />
                </svg>
            </button>
        </div>

        </CardContent>
      </Card>
    ))}
    </div>
  );
};

export default PostCard;
