"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-module/multiple-types";
import UpdateMultipleTypes from "./add-module/UpdateMultipleTypes";
// import FileUploaderPage from './add-school/file-upload';
import { Icon } from "@iconify/react";
import AddModuleModal from "./add-module/AddModuleModal";
import Link from 'next/link';

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
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
        setEditingModule(null);
      };

    const handleAddModule = () => {
      setShowForm(true);
      setEditingModule(null);
    };

    const handleEditModule = (module) => {
      setShowForm(true);
      setEditingModule(module);
    };

    // Determine if the user is an admin or principal
    const canManageCourseModules = userRole === 'superadmin' || userRole === 'admin';

    // Determine the appropriate route based on the user's role
    const navigationLink = (userRole === 'superadmin' || userRole === 'admin') ? "/total-courses" : "/assigned-courses";

    return (
      <div className="space-y-6">
        <Card title="List of Modules">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-xl font-bold"></h1>
            <Link href="/total-courses" className="text-blue-600 hover:text-blue-800">
                <Icon icon="heroicons-outline:arrow-left" className="inline-block h-5 w-5 mr-2" />
                Back to Courses
            </Link> */}
            <div className="flex-grow-0">
              <Link href={navigationLink} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <Icon icon="heroicons-outline:arrow-left" className="h-5 w-5" />
                    Back to Courses
              </Link>
            </div>
            {canManageCourseModules && (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddModule}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add module
              </button>
            )}
          </div>
          {showForm ? (
            <AddModuleModal
              initialData={editingModule}
              onClose={handleCloseForm}
            />
          ) : (
              <CheckboxWithAction onEdit={handleEditModule} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
