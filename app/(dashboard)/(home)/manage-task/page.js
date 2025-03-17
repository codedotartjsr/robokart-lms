"use client";
import React from "react";
import Card from "@/components/ui/card-snippet";
import AccordionSubtitle from "./accordion-with-subtitle";

const AccordionPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <Card title="Your Assignments">
        <p className="text-sm text-default-400 dark:text-default-600  mb-4">
          Below is a list of your assignments. Expand each section to view the details and instructions for submission.
        </p>
        <AccordionSubtitle />
      </Card>
    </div>
  );
};

export default AccordionPage;
