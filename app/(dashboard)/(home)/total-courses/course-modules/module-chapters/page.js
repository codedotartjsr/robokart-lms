"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
// import MultipleTypes from "./add-school/multiple-types";
// import UpdateMultipleTypes from "./add-school/UpdateMultipleTypes";
// import FileUploaderPage from './add-school/file-upload';
import { Icon } from "@iconify/react";
import AddCourseModal from "./add-chapter/AddChapterModal";
import Link from 'next/link';

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [courseId, setCourseId] = useState(null);
    
    // Fetch user role from localStorage
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      const courseId = new URLSearchParams(window.location.search).get('courseId');
      setCourseId(courseId);
    }, []);

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingCourse(null);
      };

    const handleAddSchool = () => {
      setShowForm(true);
      setEditingCourse(null);
    };

    const handleEditSchool = (school) => {
      setShowForm(true);
      setEditingCourse(school);
    };

    // Determine if the user is an admin or principal
    const canManageSchools = userRole === 'superadmin'|| 'admin';

    return (
      <div className="space-y-6 pt-4">
        <Card title="List of Chapters">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-xl font-bold"></h1> */}
            <div className="flex-grow-0">
              <Link href={`/total-courses/course-modules/?courseId=${courseId}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <Icon icon="heroicons-outline:arrow-left" className="h-5 w-5" />
                    Back to Modules
              </Link>
            </div>
            {canManageSchools && (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddSchool}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add Chapter
              </button>
            )}
          </div>
          {showForm ? (
            <AddCourseModal
              initialData={editingCourse}
              onClose={handleCloseForm}
            />
          ) : (
            <CheckboxWithAction onEdit={handleEditSchool} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;

