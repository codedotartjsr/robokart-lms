import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import config from "@/config/config";

const AddModuleModal = ({ onClose, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const isEditing = !!initialData;

    const courseId = new URLSearchParams(window.location.search).get('courseId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isEditing ? `${config.API_BASE_URL}/v1/course/updateModuleTest/${initialData._id}` : '${config.API_BASE_URL}/v1/course/addModuleTest';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    courseId
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`Module ${isEditing ? 'updated' : 'added'} successfully!`);
                onClose();
            } else {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'add'} the module`);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} module:`, error);
            toast.error(error.message || `An error occurred while ${isEditing ? 'updating' : 'adding'} the module.`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
            <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit module' : 'Add New Module'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                    <textarea
                        id="description"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                    <Button color="primary">{isEditing ? 'Update' : 'Add'}</Button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default AddModuleModal;
