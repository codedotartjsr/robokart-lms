"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-project/multiple-types";
import UpdateMultipleTypes from "./add-project/UpdateMultipleTypes";
import { Icon } from "@iconify/react";
import useRoleBasedRedirect from '@/hooks/useRoleBasedRedirect';

const TailwindUiTable = () => {
    useRoleBasedRedirect(['superadmin', 'admin', 'project']);
    
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [cardTitle, setCardTitle] = useState("List of Projects");

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
    }, []);

    const handleAddProject = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingProject(null);
      setCardTitle("Add New Project");
    };

    const handleEditProject = (project) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingProject(project);
      setCardTitle("Update Project Details"); 
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingProject(null);
      setIsEditing(false);
      setCardTitle("List of Projects");
    };

    const canManageProjects = userRole === 'superadmin' || 'admin';

    return (
      <div className="space-y-6 pt-4">
        <Card title={cardTitle}>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold"></h1>
            {showForm ? (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleCloseForm}
              >
                <Icon icon="heroicons-outline:x" className="h-5 w-5" />
                Cancel
              </button>
            ) : canManageProjects && (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddProject}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add Project
              </button>
            )}
          </div>
          {showForm ? (
            isEditing ? (
              <UpdateMultipleTypes initialData={editingProject} onUpdated={handleCloseForm} />
            ) : (
              <MultipleTypes onAdded={handleCloseForm} />
            )
          ) : (
            <CheckboxWithAction onEdit={handleEditProject} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
