"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-course/multiple-types";
import UpdateMultipleTypes from "./add-course/UpdateMultipleTypes";
import { Icon } from "@iconify/react";
import AddCourseModal from "./add-course/AddCourseModal";

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // Fetch user role from localStorage
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
    }, []);

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingCourse(null);
    };

    // Function to open the modal for adding
    const handleAddCourse = () => {
      setShowForm(true);
      setEditingCourse(null);
    };

    // Function to open the modal for editing
    const handleEditCourse = (course) => {
      setShowForm(true);
      setEditingCourse(course);
    };

    // Determine if the user is an admin or principal
    const canManageProjects = userRole === 'superadmin' || 'admin';

    return (
      <div className="space-y-6 pt-4">
        <Card title="List of Courses">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold"></h1>
            {canManageProjects && (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddCourse}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add Course
              </button>
            )}
          </div>
          {showForm ? (
            <AddCourseModal
              initialData={editingCourse}
              onClose={handleCloseForm}
            />
          ) : (
              <CheckboxWithAction onEdit={handleEditCourse} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;

