"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@iconify/react";

  const projects = [
    {
      id: 1,
      title: "Introduction to Programming",
      category: "Computer Science",
      subtitle: "Subtitle: Lorem ipsum",
      description:
        "Learn the fundamentals of programming using Python, including variables, loops, and functions.",
      image: "/images/card/card7.jpg",
      percentage: 100,
      links: [
        { href: "#", label: "Watch Again" },
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
      percentage: 100,
      links: [
        { href: "#", label: "Watch Again" },
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
                onClick={() => console.log(`Downloading course for ${project.title}`)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
                Download
                <Icon icon="mdi:download" className="w-5 h-5 text-white" />
            </button>
        </div>

        </CardContent>
      </Card>
    ))}
    </div>
  );
};

export default PostCard;
