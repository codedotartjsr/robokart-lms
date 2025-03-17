"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    DashBoard,
    Graph
  } from "@/components/svg";

const ContactSupport = () => {
  const supportInfo = [
    {
      icon: DashBoard,
      label: "Email Support",
      value: "support@example.com",
      description: "Get in touch via email. We respond within 24 hours."
    },
    {
      icon: DashBoard,
      label: "Phone Support",
      value: "9676543287",
      description: "Available from 9 AM to 5 PM (IST). Call us for immediate support."
    },
    {
      icon: DashBoard,
      label: "Live Chat via WhatsApp",
      value: "8765453456",
      description: "Connect with our support staff on WhatsApp for instant help and real-time responses."
    },    
    {
      icon: DashBoard,
      label: "Office Address",
      value: "123 Business Rd., City",
      description: "Visit our office for in-person queries or mail us at our official address."
    },
  ];

  return (
    <Card className="col-span-12 lg:col-span-8 space-y-6">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Contact Support</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-default-600">
          Need help? Reach out to our support team using any of the following methods.
        </p>
        <ul className="mt-6 space-y-4">
          {
            supportInfo.map((item, index) => (
              <>
              <li
                key={`user-info-${index}`}
                className="flex items-center"
              >
                <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                  <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                  <span className="text-sm font-medium text-default-800">{item.label}:</span>
                </div>
                <div className="flex-1 text-sm text-default-800">{item.value}</div>
              </li>
              <div className="text-sm text-default-500">{item.description}</div>              
              </>
            ))
          }
        </ul>
        <div className="mt-6 text-lg font-medium text-default-800 mb-4">Active Teams</div>
        <div className="space-y-3">
          {
            [
              {
                title: "Mon-Fri 9:00 AM to 5:00 PM (IST)",
                img: '/images/auth/mountain.png',
                total: 65,
                description: "Our hours of operation. Contact us during these hours for all kinds of support."
              }
            ].map((item, index) => (
              <>
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
              <div className="flex-1 text-sm text-default-700">{item.description}</div>
              </>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSupport;