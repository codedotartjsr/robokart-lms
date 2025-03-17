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
    const [cardTitle, setCardTitle] = useState("List of Principals");

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
      setCardTitle("Add New Principal");
    };

    const handleEditPrincipal = (principal) => {
      setIsEditing(true);
      setShowForm(true);
      setEditingPrincipal(principal);
      setCardTitle("Update Principal Details");
    };

    const handleCloseForm = () => {
      setShowForm(false);
      setEditingPrincipal(null);
      setIsEditing(false);
      setCardTitle("List of Principals");
    };

    const canManagePrincipals = userRole === 'superadmin' || 'admin' || userRole === 'principal' || userRole === 'school';

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
