"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import MultipleTypes from "./add-admin/multiple-types";
import UpdateMultipleTypes from "./add-admin/UpdateMultipleTypes";
import { Icon } from "@iconify/react";
import useRoleBasedRedirect from '@/hooks/useRoleBasedRedirect';

const TailwindUiTable = () => {
    useRoleBasedRedirect(['superadmin', 'admin', 'project']);

    const [showForm, setShowForm] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [cardTitle, setCardTitle] = useState("List of Admins");

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
    }, []);

    const handleAddAdmin = () => {
      setIsEditing(false);
      setShowForm(true);
      setEditingAdmin(null);
      setCardTitle("Add New Admin"); 
    };

    const handleEditAdmin = (admin) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingAdmin(admin);
      setCardTitle("Update Admin Details"); 
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingAdmin(null);
      setIsEditing(false);
      setCardTitle("List of Admins"); 
    };

    const canManageAdmins = userRole === 'superadmin' || userRole === 'admin';

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
            ) : canManageAdmins &&  (
              <button
                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                onClick={handleAddAdmin}
              >
                <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                Add Admin
              </button>
            )}
          </div>
          {showForm ? (
            isEditing ? (
              <UpdateMultipleTypes initialData={editingAdmin} onUpdated={handleCloseForm} />
            ) : (
              <MultipleTypes onAdded={handleCloseForm} />
            )
          ) : (
            <CheckboxWithAction onEdit={handleEditAdmin} />
          )}
        </Card>
      </div>
    );
};

export default TailwindUiTable;
