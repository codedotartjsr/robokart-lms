import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

// const AddCourseModal = ({ onClose }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch('https://xcxd.online:8080/api/v1/course/addCourseTest', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     title,
//                     description
//                 })
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 toast.success('Course added successfully!');
//                 // onCourseAdded();
//                 onClose();
//             } else {
//                 throw new Error(data.message || 'Failed to add the course');
//             }
//         } catch (error) {
//             console.error('Error adding course:', error);
//             toast.error(error.message || 'An error occurred while adding the course.');
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
//                 <h3 className="text-lg font-bold mb-4">Add New Course</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             className="w-full border border-gray-300 p-2 rounded"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
//                         <textarea
//                             id="description"
//                             className="w-full border border-gray-300 p-2 rounded"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="flex items-center justify-end">
//                         <button type="button" onClick={onClose} className="bg-gray-200 text-black rounded p-2 mr-2">Cancel</button>
//                         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2">Add Course</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddCourseModal;




const AddCourseModal = ({ onClose, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const isEditing = !!initialData;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isEditing ? `https://xcxd.online:8080/api/v1/course/updateCourseTest/${initialData._id}` : 'https://xcxd.online:8080/api/v1/course/addCourseTest';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`Course ${isEditing ? 'updated' : 'added'} successfully!`);
                // onSave();
                onClose();
            } else {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'add'} the course`);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} course:`, error);
            toast.error(error.message || `An error occurred while ${isEditing ? 'updating' : 'adding'} the course.`);
        }
    };

    return (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        //     <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
        //         <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Course' : 'Add New Course'}</h3>
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-4">
        //                 <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
        //                 <input
        //                     type="text"
        //                     id="title"
        //                     className="w-full border border-gray-300 p-2 rounded"
        //                     value={title}
        //                     onChange={(e) => setTitle(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
        //                 <textarea
        //                     id="description"
        //                     className="w-full border border-gray-300 p-2 rounded"
        //                     value={description}
        //                     onChange={(e) => setDescription(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="flex items-center justify-end">
        //                 <button type="button" onClick={onClose} className="bg-gray-200 text-black rounded p-2 mr-2">Cancel</button>
        //                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2">{isEditing ? 'Update' : 'Add'}</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
            <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Course' : 'Add New Course'}</h3>
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

export default AddCourseModal;
