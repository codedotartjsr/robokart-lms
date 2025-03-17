"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SuperAdminInfo from './SuperAdminInfo';
import { DashBoard, Graph } from "@/components/svg";

const UserInfo = () => {
    const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not available';
  };

    if (userData.role === "superadmin") {
        return <SuperAdminInfo userData={userData} />;
    }

  const formatRoleLabel = (role) => {
    return role ? `${role.charAt(0).toUpperCase() + role.slice(1)} ID` : "Role ID";
  };

  const getNameValue = () => {
    switch (userData.role) {
        case "student":
            return userData.studentName;
        case "teacher":
            return userData.name;
        case "principal":
            return `${userData.firstName} ${userData.lastName}`;
        default:
            return "";
    }
};

    const userInfo = [
        {
            icon: DashBoard,
            label: formatRoleLabel(userData.role),
            value: userData._id
        },
        {
            icon: DashBoard,
            label: userData.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Name` : "Role Name",
            value: getNameValue()
        },
        {
            icon: DashBoard,
            label: "School",
            value: userData.school?.name
        },
        {
            icon: DashBoard,
            label: userData.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Email` : "Role Email",
            value: userData.email
        },
        {
            icon: DashBoard,
            label: "School Email",
            value: userData.school?.email
        },
        {
            icon: DashBoard,
            label: userData.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Phone` : "Role Phone",
            value: userData.phoneNumber
        },
        {
            icon: DashBoard,
            label: "School Phone",
            value: userData.school?.phone_no
        },
        {
            icon: DashBoard,
            label: "Role",
            value: userData.role
        },
        {
            icon: DashBoard,
            label: "School ID",
            value: userData.school?._id
        },
        {
            icon: DashBoard,
            label: "School Address",
            value: `${userData.school?.district}, ${userData.school?.state}`
        },
        {
            icon: DashBoard,
            label: "Joining Date",
            value: formatDate(userData.createdAt)
        },
        {
            icon: DashBoard,
            label: "Last Updated Date",
            value: formatDate(userData.updatedAt)
        }
    ];

    // Add student-specific fields only if the user is a student
    if (userData.role === "student") {
        userInfo.splice(2, 0, { // Add after Name
            icon: DashBoard,
            label: "Father Name",
            value: userData.fatherName
        });
        userInfo.push({
            icon: DashBoard,
            label: "Date of Birth",
            value: formatDate(userData.dob)
        },
        {
            icon: DashBoard,
            label: "Class",
            value: userData.class
        },
        {
            icon: DashBoard,
            label: "Aadhar",
            value: userData.aadhar
        },
        {
            icon: DashBoard,
            label: "Student Address",
            value: `${userData.district}, ${userData.state}`
        });
    }

    // Exclude gender for teachers
    if (userData.role !== "teacher") {
        userInfo.push({
            icon: DashBoard,
            label: "Gender",
            value: userData.gender
        });
    }

  return (
    <Card className="col-span-12 lg:col-span-8 space-y-6">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Information</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-default-600">
            Here's a brief overview of the your profile information. View details like contact information, role, and activity dates below.
        </p>
        <ul className="mt-6 space-y-4">
          {
            userInfo.map((item, index) => (
              <li
                key={`user-info-${index}`}
                className="flex items-center"
              >
                <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                  <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                  <span className="text-sm font-medium text-default-800">{item.label}:</span>
                </div>
                <div className="flex-1 text-sm text-default-700">{item.value}</div>
              </li>
            ))
          }
        </ul>
        <div className="mt-6 text-lg font-medium text-default-800 mb-4">Management Overview</div>
        <div className="space-y-3">
          {
            [
              {
                title: `As a User, you have access to standard features and personal settings. Your account was activated on ${formatDate(userData.createdAt)}.`,
                img: '/images/auth/mountain.png',
                total: 65
              }
            ].map((item, index) => (
              <div
                key={`active-team-${index}`}
                className="flex items-center gap-2"
              >
                <img src={item.img} alt={item.title} className="w-4 h-4" />
                <div className="text-sm font-medium text-default-800">
                  {item.title}
                  <span className="font-normal">
                    {/* ({item.total} members) */}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;