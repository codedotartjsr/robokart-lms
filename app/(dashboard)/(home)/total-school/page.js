// "use client"

// import React, { useState } from "react";
// import Card from "@/components/ui/card-snippet";
// import CheckboxWithAction from "./checkbox-with-action";
// import MultipleTypes from "./add-school/multiple-types";
// import UpdateMultipleTypes from "./add-school/UpdateMultipleTypes";
// import { Icon } from "@iconify/react";

// const TailwindUiTable = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [editingSchool, setEditingSchool] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);

//     const handleAddSchool = () => {
//       setIsEditing(false);
//       setShowForm(true);
//       setEditingSchool(null);
//     };

//     const handleEditSchool = (school) => {
//       setIsEditing(true);
//       setShowForm(true);
//       setEditingSchool(school);
//     };

//     const handleCloseForm = () => {
//       setShowForm(false);
//       setEditingSchool(null);
//       setIsEditing(false);
//     };

//     return (
//       <div className="space-y-6">
//         <Card title="List of Schools">
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
//                 onClick={handleAddSchool}
//               >
//                 <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
//                 Add School
//               </button>
//             )}
//           </div>
//           {showForm ? (
//             isEditing ? (
//               <UpdateMultipleTypes initialData={editingSchool} onUpdated={handleCloseForm} />
//             ) : (
//               <MultipleTypes onAdded={handleCloseForm} />
//             )
//           ) : (
//             <CheckboxWithAction onEdit={handleEditSchool} />
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
import MultipleTypes from "./add-school/multiple-types";
import UpdateMultipleTypes from "./add-school/UpdateMultipleTypes";
import FileUploaderPage from './add-school/file-upload';
import { Icon } from "@iconify/react";

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [editingSchool, setEditingSchool] = useState(null);
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

    const handleAddSchool = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingSchool(null);
    };

    const handleUploadFiles = () => {
      setShowFileUploader(true); // Show the file uploader
      setShowForm(false); // Hide any forms if open
    };

    const handleEditSchool = (school) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingSchool(school);
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingSchool(null);
      setIsEditing(false);
      setShowFileUploader(false);
    };

    // Determine if the user is an admin or principal
    const canManageSchools = userRole === 'superadmin';

    return (
      <div className="space-y-6">
        <Card title="List of Schools">
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
            ) : canManageSchools && (
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
