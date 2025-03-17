"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-school/multiple-types";
import UpdateMultipleTypes from "./add-school/UpdateMultipleTypes";
import FileUploaderPage from './add-school/file-upload';
import { Icon } from "@iconify/react";
import Link from 'next/link';
import useRoleBasedRedirect from '@/hooks/useRoleBasedRedirect';

const TailwindUiTable = () => {
    useRoleBasedRedirect(['superadmin', 'admin', 'project']);

    const [showForm, setShowForm] = useState(false);
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [editingSchool, setEditingSchool] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isSpecificProject, setIsSpecificProject] = useState(false);
    const [cardTitle, setCardTitle] = useState("List of Schools");
    const [projectId, setProjectId] = useState(null)
    
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      const projectId = new URLSearchParams(window.location.search).get('projectId');
      setProjectId(projectId);
      if (projectId) {
        setIsSpecificProject(true);
        setCardTitle("Assigned Schools to Project");
      } else {
        setIsSpecificProject(false);
        setCardTitle("List of Schools");
      }
    }, []);

    const handleAddSchool = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingSchool(null);
      setCardTitle("Add New School");
    };

    const handleUploadFiles = () => {
      setShowFileUploader(true);
      setShowForm(false);
      setCardTitle("Upload Schools File");
    };

    const handleEditSchool = (school) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingSchool(school);
      setCardTitle("Update School Details");
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingSchool(null);
      setIsEditing(false);
      setShowFileUploader(false);
      setCardTitle(projectId ? "Assigned Schools to Project" : "List of Schools");
    };

    const canManageSchools = userRole === 'superadmin'|| 'admin' && !isSpecificProject;

    return (
      <div className="space-y-6 pt-4">
        <Card title={cardTitle}>
          <div className="flex justify-between items-center">
            {projectId ?
            <div className="flex-grow-0">
              <Link href='/total-project' className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <Icon icon="heroicons-outline:arrow-left" className="h-5 w-5" />
                    Back to Projects
              </Link>
            </div>
            : <h1 className="text-xl font-bold"></h1>
            }
            {showForm || showFileUploader ? (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleCloseForm}
              >
                <Icon icon="heroicons-outline:x" className="h-5 w-5" />
                Cancel
              </button>
            ) : canManageSchools && !isSpecificProject && (
              <div className="flex gap-2">
              <button
                  className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                  onClick={handleUploadFiles}
              >
                  <Icon icon="heroicons-outline:upload" className="h-5 w-5" />
                  Upload Files
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddSchool}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add School
              </button>
              </div>
            )}
          </div>
          {showForm ? (
            isEditing ? (
              <UpdateMultipleTypes initialData={editingSchool} onUpdated={handleCloseForm} />
            ) : (
              <MultipleTypes onAdded={handleCloseForm} />
            )
          ) : showFileUploader ? (
            <FileUploaderPage onAdded={handleCloseForm} />
          ) : (
            <CheckboxWithAction onEdit={handleEditSchool} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
