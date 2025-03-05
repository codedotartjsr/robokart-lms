// "use client";

// import Card from "@/components/ui/card-snippet";
// // import SimpleTable from "./simple-table";
// // import { Button } from "@/components/ui/button";
// // import UserTable from "./user-table";
// // import UserTableStatus from "./user-table-status";
// // import CollapsibleTable from "./collapsible-table";
// // import VerticalLine from "./vertical-line";
// // import WithCheckbox from "./with-checkbox";
// // import RowEditingDialog from "./row-editing-dialog";
// import CheckboxWithAction from "./checkbox-with-action";
// // import SelectionOperation from "./selection-operation";
// // import ColumnSticky from "./column-sticky";
// import MultipleTypes from "./add-principal/multiple-types";
// import { Icon } from "@iconify/react";
// import { useState } from "react";
// import UpdateMultipleTypes from "./update-principal/updateMultipleTypes"; // Import the update component

// const TailwindUiTable = () => {
//     const [showForm, setShowForm] = useState(false); // State to toggle form visibility
//     const [editingPrincipal, setEditingPrincipal] = useState(null);

//     const handleToggleForm = () => {
//       setShowForm(!showForm); // Toggle the state to show/hide the form
//     };

//     const handleEditPrincipal = (principal) => {
//         setEditingPrincipal(principal);
//         setShowForm(true); // Show the form with the data pre-populated
//       };

//   return (
//     <div className=" space-y-6">
//       {/* <Card title="Simple">
//         <div className="flex flex-wrap items-center gap-4 mb-1">
//           <div className="flex-1">
//             <h3 className="text-xl font-medium text-default-700 mb-2">User</h3>
//           </div>
//           <div className="flex-none">
//             <Button type="button">Add User</Button>
//           </div>
//         </div>
//         <SimpleTable />
//       </Card>
//       <Card title="User table in Card">
//         <UserTable />
//       </Card>
//       <Card title="With avatars content">
//         <UserTableStatus />
//       </Card>
//       <Card title="Collapsible Table">
//         <div className="flex flex-wrap items-center gap-4 mb-1">
//           <div className="flex-1">
//             <h3 className="text-xl font-medium text-default-700 mb-2">User</h3>
//           </div>
//           <div className="flex-none">
//             <Button type="button">Add User</Button>
//           </div>
//         </div>
//         <CollapsibleTable />
//       </Card>

//       <Card title="with vertical lines">
//         <VerticalLine />
//       </Card>

//       <Card title="With Checkbox">
//         <WithCheckbox />
//       </Card> */}

//       {/* <Card title="List of Principals">
//         <CheckboxWithAction />
//       </Card> */}
//       <Card title="List of Principals">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold"></h1>
//           <button
//             className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
//             onClick={handleToggleForm}
//           >
//             <Icon icon={showForm ? "heroicons-outline:x" : "heroicons-outline:plus"} className="h-5 w-5" />
//             {showForm ? "Cancel" : "Add Principal"}
//           </button>
//         </div>
//         {showForm && <MultipleTypes onAdded={() => setShowForm(false)} />}
//         <br />
//         {!showForm && <CheckboxWithAction />}
//       </Card>

//       {/* <Card title="Selection and operation">
//         <SelectionOperation />
//       </Card>
//       <Card title="Row Editing Dialog">
//         <RowEditingDialog />
//       </Card>
//       <Card title="Sticky Column">
//         <ColumnSticky />
//       </Card> */}
//     </div>
//   );
// };

// export default TailwindUiTable;


"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-principal/multiple-types";
import UpdateMultipleTypes from "./add-principal/UpdateMultipleTypes";
import { Icon } from "@iconify/react";

const TailwindUiTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingPrincipal, setEditingPrincipal] = useState(null);
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

    const handleAddPrincipal = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingPrincipal(null);
    };

    const handleEditPrincipal = (principal) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingPrincipal(principal);
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingPrincipal(null);
      setIsEditing(false);
    };

    // Determine if the user is an admin or principal
    const canManagePrincipals = userRole === 'superadmin' || 'admin' || userRole === 'principal' || userRole === 'school';

    return (
      <div className="space-y-6 pt-4">
        <Card title="List of Principals">
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
            ) : canManagePrincipals && (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddPrincipal}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add Principal
              </button>
            )}
          </div>
          {showForm ? (
            isEditing ? (
              <UpdateMultipleTypes initialData={editingPrincipal} onUpdated={handleCloseForm} />
            ) : (
              <MultipleTypes onAdded={handleCloseForm} />
            )
          ) : (
            <CheckboxWithAction onEdit={handleEditPrincipal} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
