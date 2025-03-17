import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import config from "@/config/config";

const EditCourseModal = ({ course, onClose, onSave }) => {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);

    const handleUpdateCourse = async () => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/v1/course/updateCourse/${course._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Course updated successfully!");
                onSave();
                onClose();
            } else {
                throw new Error(data.message || "Failed to update the course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error(error.message || "An error occurred while updating the course.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-4">Edit Course</h3>
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
                <div className="flex items-center justify-end">
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                    <Button color="primary" onClick={handleUpdateCourse}>Update</Button>
                </div>
            </div>
        </div>
    );
};

export default EditCourseModal;
