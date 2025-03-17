"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CheckboxWithAction = ({ course }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (event) => {
    if (selectedRows?.length === users?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map((row) => row.id));
    }
  };

  const handleRowSelect = (id) => {
    const updatedSelectedRows = [...selectedRows];
    if (selectedRows.includes(id)) {
      updatedSelectedRows.splice(selectedRows.indexOf(id), 1);
    } else {
      updatedSelectedRows.push(id);
    }
    setSelectedRows(updatedSelectedRows);
  };

  return (
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Student Name</TableHead>
          <TableHead className="table-header email">Email</TableHead>
          <TableHead className="table-header">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {course.students.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-left text-gray-500 pl-4 pt-4 pb-4">No students assigned to this course.</td>
          </tr>
        ) : (
        course.students.map((student, index) => (
          <TableRow
            key={student.id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(student.id) && "selected"}
          >
            <TableCell className="table-cell serial-number">{index+1}</TableCell>
            <TableCell className="table-cell name font-medium  text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <Avatar className="ring-1 ring-dark ring-offset-[3px] ring-offset-background h-[25px] w-[25px]">
                    <AvatarFallback className="bg-info/10 text-info">
                        {student.name
                        ? student.name
                            .split(" ")                    // Split the name by space
                            .map((word) => word.charAt(0)) // Get the first letter of each word
                            .slice(0, 2)                   // Limit to two letters (e.g., first and last name)
                            .join("")
                            .toUpperCase()                 // Convert to uppercase
                        : "N/A"}
                    </AvatarFallback>
                </Avatar>

                <span className=" text-sm   text-card-foreground">
                    {student.name}
                </span>
              </div>
            </TableCell>

            <TableCell className="table-cell email">{student.email}</TableCell>
            <TableCell className="table-cell flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:eye" className=" h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))
    )}
      </TableBody>
    </Table>
  );
};

export default CheckboxWithAction;


