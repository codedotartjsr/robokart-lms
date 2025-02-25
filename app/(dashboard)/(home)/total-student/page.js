// "use client"

// import React, { useState } from "react";
// import Card from "@/components/ui/card-snippet";
// import CheckboxWithAction from "./checkbox-with-action";
// import MultipleTypes from "./add-student/multiple-types";
// import UpdateMultipleTypes from "./add-student/UpdateMultipleTypes";
// import { Icon } from "@iconify/react";

// const TailwindUiTable = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [editingStudent, setEditingStudent] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);

//     const handleAddStudent = () => {
//       setIsEditing(false);
//       setShowForm(true);
//       setEditingStudent(null);
//     };

//     const handleEditStudent = (student) => {
//       setIsEditing(true);
//       setShowForm(true);
//       setEditingStudent(student);
//     };

//     const handleCloseForm = () => {
//       setShowForm(false);
//       setEditingStudent(null);
//       setIsEditing(false);
//     };

//     return (
//       <div className="space-y-6">
//         <Card title="List of Students">
//           <div className="flex justify-between items-center">
//             <h1 className="text-xl font-bold"></h1>
//             {showForm ? (
//               <button
//                 className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
//                 onClick={handleCloseForm}
//               >
//                 <Icon icon="heroicons-outline:x" className="h-5 w-5" />
//                 Cancel
//               </button>
//             ) : (
//               <button
//                 className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
//                 onClick={handleAddStudent}
//               >
//                 <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
//                 Add Student
//               </button>
//             )}
//           </div>
//           {showForm ? (
//             isEditing ? (
//               <UpdateMultipleTypes initialData={editingStudent} onUpdated={handleCloseForm} />
//             ) : (
//               <MultipleTypes onAdded={handleCloseForm} />
//             )
//           ) : (
//             <CheckboxWithAction onEdit={handleEditStudent} />
//           )}
//         </Card>
//       </div>
//     );
// };

// export default TailwindUiTable;





"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-student/multiple-types";
import UpdateMultipleTypes from "./add-student/UpdateMultipleTypes";
import FileUploaderPage from './add-student/file-upload';
import { Icon } from "@iconify/react";

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Fetch user role from localStorage
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
    }, []);

    const handleAddStudent = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingStudent(null);
    };

    const handleUploadFiles = () => {
        setShowFileUploader(true); // Show the file uploader
        setShowForm(false); // Hide any forms if open
    };

    const handleEditStudent = (student) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingStudent(student);
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingStudent(null);
      setIsEditing(false);
      setShowFileUploader(false);
    };

    // Determine if the user is an admin or principal
    const canManageStudents = userRole === 'admin' || userRole === 'principal' || userRole === 'teacher' || userRole === 'school';

    return (
      <div className="space-y-6">
        <Card title="List of Students">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold"></h1>
            {showForm || showFileUploader ? (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2 mb-5"
                onClick={handleCloseForm}
              >
                <Icon icon="heroicons-outline:x" className="h-5 w-5" />
                Cancel
              </button>
            ) : canManageStudents && (
              <div className="flex gap-2 mb-5">
                <button
                    className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                    onClick={handleUploadFiles}
                >
                    <Icon icon="heroicons-outline:upload" className="h-5 w-5" />
                    Upload Files
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                  onClick={handleAddStudent}
                >
                  <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                  Add Student
                </button>
              </div>
            )}
          </div>
          {showForm ? (
            isEditing ? (
              <UpdateMultipleTypes initialData={editingStudent} onUpdated={handleCloseForm} />
            ) : (
              <MultipleTypes onAdded={handleCloseForm} />
            )
          ) : showFileUploader ? (
            <FileUploaderPage onAdded={handleCloseForm} />
          ) : (
            <CheckboxWithAction onEdit={handleEditStudent} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
