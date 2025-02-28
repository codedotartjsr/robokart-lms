"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashBoard } from "@/components/svg";
  
const SuperAdminInfo = ({ userData }) => {
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not available';
  };

    const userInfo = [
        {
            icon: DashBoard,
            label: "Role",
            value: userData.role
        },
        {
            icon: DashBoard,
            label: "Admin ID",
            value: userData.id
        },
        {
            icon: DashBoard,
            label: "Email",
            value: userData.email
        },
        {
            icon: DashBoard,
            label: "Full Name",
            value: `${userData.firstName} ${userData.lastName}`
        },
        {
            icon: DashBoard,
            label: "Phone Number",
            value: userData.phoneNumber
        },
        {
            icon: DashBoard,
            label: "Gender",
            value: userData.gender
        },
        {
            icon: DashBoard,
            label: "Created At",
            value: formatDate(userData.createdAt)
        },
        {
            icon: DashBoard,
            label: "Last Updated",
            value: formatDate(userData.updatedAt)
        }
    ];

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
        <div className="mt-6 text-lg font-medium text-default-800 mb-4">Active Teams</div>
        <div className="space-y-3">
          {
            [
              {
                title: `As a Super Admin, you have complete access to the system settings and multi-tier user management functionality. Your account was created on ${formatDate(userData.createdAt)}.`,
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

export default SuperAdminInfo;