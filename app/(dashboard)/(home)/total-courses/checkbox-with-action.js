import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import ConfirmationModal from '../ConfirmationModal';
import moment from 'moment';
import { useRouter } from "next/navigation";
import Select from 'react-select';

const CheckboxWithAction = ({ onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    const [teachers, setTeachers] = useState([]);
    const [showSchoolAssign, setShowSchoolAssign] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showSchoolsModal, setShowSchoolsModal] = useState(false);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchCourses();
    }, []);

    const openSchoolAssignModal = (project) => {
      setSelectedCourse(project);
      setShowSchoolAssign(true); // Ensure modal/overlay is visible
      fetchTeachers();
    };

    const handleAssignTeacher = async () => {
      if (selectedCourse && selectedTeacher) {
        console.log("selectedTeacher", selectedTeacher);
        
        try {
          const response = await fetch(`https://xcxd.online:8080/api/v1/teacher/updateTeacher/${selectedTeacher.value}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              courses: [selectedCourse._id] // Passing only the selected course's ID
            })
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("Course assigned to teacher successfully!");
            setShowSchoolAssign(false); // Close the modal
            fetchCourses(); // Optionally refresh courses
          } else {
            throw new Error(data.message || "Failed to assign course to teacher");
          }
        } catch (error) {
          console.error("Error assigning course to teacher:", error);
          toast.error(error.message || "An error occurred while assigning course to teacher.");
        }
      }
    };
    
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/teacher/getAllTeacher");
        const data = await response.json();
        if (response.ok) {
          setTeachers(data.data.map(school => ({ value: school._id, label: school.name })));
        } else {
          throw new Error(data.message || "Could not fetch teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        toast.error(error.message || "An error occurred while fetching teachers.");
      }
    };
      
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/course/getAllCourse", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCourses(data.data);
        } else {
          throw new Error(data.message || "Could not fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error(error.message || "An error occurred while fetching courses.");
      }
    };

    const handleDeleteProject = async () => {
        if (selectedCourse) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/course/deleteCourse/${selectedCourse._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Course deleted successfully");
              fetchCourses(); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete course");
            }
          } catch (error) {
            console.error("Error deleting course:", error);
            toast.error(error.message || "An error occurred while deleting the course.");
          }
        }
      };
    
      const openModalWithProject = (project) => {
        setSelectedCourse(project);
        setIsModalOpen(true);
      };

      const fetchSchoolsForProject = async (projectId) => {
        console.log("projectId", projectId);
        
        try {
            // First find the project details from your courses state
            const project = courses.find(p => p._id === projectId);
            setSelectedCourse(project);  // Set the selected project here
    
            const response = await fetch(`https://xcxd.online:8080/api/v1/project/getAllSchoolsOfProject/${projectId}`);
            const data = await response.json();
            if (response.ok) {
                setTeachers(data.data.schools);
                setShowSchoolsModal(true);
                console.log("data.data.schools", data.data.schools);
                
            } else {
                throw new Error(data.message || "Failed to fetch schools for the project");
            }
        } catch (error) {
            console.error("Error fetching schools for the project:", error);
            toast.error(error.message || "An error occurred while fetching schools for the project.");
        }
    };
      
      const removeSchoolFromProject = async (projectId, schoolId) => {
        try {
          const response = await fetch('https://xcxd.online:8080/api/v1/project/removeProjectFromSchool', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, schoolId })
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("School removed from the project successfully!");
            fetchSchoolsForProject(projectId); // Refresh the list
          } else {
            throw new Error(data.message || "Failed to remove school from the project");
          }
        } catch (error) {
          console.error("Error removing school from the project:", error);
          toast.error(error.message || "An error occurred while removing the school from the project.");
        }
      };

      // Check if the user is allowed to manage teachers
    const canManageProjects = userRole === 'superadmin' || 'admin';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          {/* <TableHead>id</TableHead> */}
          <TableHead>Course Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          {canManageProjects && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell>{index + 1}</TableCell>
            {/* <TableCell>{item._id}</TableCell> */}
            <TableCell className="font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.title}`}
                </span>
              </div>
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageProjects && (
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                  onClick={() => onEdit(item)}
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() => openModalWithProject(item)}
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                  onClick={() => openSchoolAssignModal(item)}
                >
                  <Icon icon="heroicons:plus" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                  onClick={() => fetchSchoolsForProject(item._id)}
                >
                  <Icon icon="heroicons:minus" className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {showSchoolAssign && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">Assign teacher to a course</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Course Name:</label>
            <div className="p-2 bg-gray-100 rounded border">
              {selectedCourse?.title}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Assign to teacher:</label>
            <Select
              options={teachers}
              onChange={setSelectedTeacher}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button color="secondary" onClick={() => setShowSchoolAssign(false)}>Cancel</Button>
            <Button color="primary" onClick={handleAssignTeacher}>Assign</Button>
          </div>
        </div>
      </div>
    )}

    {showSchoolsModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">Manage Schools for Project</h3>
          {/* <div className="mb-2 text-center text-md">
            Project: <strong>{selectedCourse?.name}</strong>
          </div> */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Project Name:</label>
            <div className="p-2 bg-gray-100 rounded border">
              {selectedCourse?.name}
            </div>
          </div>
          {teachers.length > 0 ? (
            <div className="overflow-y-auto max-h-60">
              {teachers.map((school) => (
                <div key={school._id} className="flex justify-between items-center p-2 border-b">
                  <span>{school.name}</span>
                  <button 
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => removeSchoolFromProject(selectedCourse._id, school._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            ) : (
            <div className="text-center p-4">
              <span className="text-gray-500">No teachers are currently assigned to this course.</span>
            </div>
          )}
          <div className="flex items-center justify-end mt-4">
            <Button color="secondary" onClick={() => setShowSchoolsModal(false)}>Close</Button>
          </div>
        </div>
      </div>
    )}

    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProject}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove course "${selectedCourse?.title}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
