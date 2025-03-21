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
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DefaultPagination from "@/components/ui/default-pagination";
import config from "@/config/config";

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
    const [coursesToShow, setCoursesToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

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
      setShowSchoolAssign(true);
      fetchTeachers();
    };

    const handleAssignTeacher = async () => {
      if (selectedCourse && selectedTeacher) {        
        try {
          const response = await fetch(`${config.API_BASE_URL}/v1/teacher/updateTeacher/${selectedTeacher.value}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              courses: [selectedCourse._id] 
            })
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("Course assigned to teacher successfully!");
            setShowSchoolAssign(false);
            fetchCourses();
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
        const response = await fetch(`${config.API_BASE_URL}/v1/teacher/getAllTeacher`);
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
        const response = await fetch(`${config.API_BASE_URL}/v1/course/getAllCourse`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCourses(data.data);
          setTotalPages(Math.ceil(data.data.length / recordsPerPage));
          setPageData(1);
        } else {
          throw new Error(data.message || "Could not fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error(error.message || "An error occurred while fetching courses.");
      }
    };

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', courses.slice(startIndex, endIndex));
      setCoursesToShow(courses.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (courses.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, courses]);
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteProject = async () => {
        if (selectedCourse) {
          try {
            const response = await fetch(`${config.API_BASE_URL}/v1/course/deleteCourse/${selectedCourse._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Course deleted successfully");
              fetchCourses();
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

      const fetchTeachersForCourse = async (courseId) => {
        try {
            const course = courses.find(p => p._id === courseId);
            setSelectedCourse(course); 
            const response = await fetch(`${config.API_BASE_URL}/v1/course/allTeachersOfCourses/${courseId}`);
            const data = await response.json();
            if (response.ok && data.success) {
                setTeachers(data.data); 
                setShowSchoolsModal(true);
            } else {
                if (response.status === 404 || data.msg === "No Teacher assigned with the given course ID") {
                    setTeachers([]);
                    setShowSchoolsModal(true);
                } else {
                    throw new Error(data.msg || "Failed to fetch teachers for the course");
                }
            }
        } catch (error) {
            console.error("Error fetching teachers for the course:", error);
            toast.error(error.message || "An error occurred while fetching teachers for the course.");
        }
    };

      const removeTeacherFromCourse = async (teacherId, courseId) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/v1/teacher/removeCourseTeachers/${teacherId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courses: [courseId] })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Teacher removed from the course successfully!");
                fetchTeachersForCourse(courseId);
            } else {
                throw new Error(data.message || "Failed to remove teacher from the course");
            }
        } catch (error) {
            console.error("Error removing teacher from the course:", error);
            toast.error(error.message || "An error occurred while removing the teacher from the course.");
        }
    };

      const handleRowClick = (project) => {
        localStorage.setItem('selectedProject', JSON.stringify(project));
        router.push(`/total-courses/course-modules/?courseId=${project._id}`);
      };  

    const canManageProjects = userRole === 'superadmin' || 'admin';    

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Course Name</TableHead>
          <TableHead className="table-header description">Description</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageProjects && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {coursesToShow.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell className="table-cell serial-number">{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
            <TableCell className="table-cell name font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.title}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="table-cell description">{item.description}</TableCell>
            <TableCell className="table-cell">{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageProjects && (
            <TableCell className="table-cell flex justify-end">
              <div className="flex gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        color="secondary"
                        className="h-7 w-7"
                        onClick={() => onEdit(item)}
                      >
                        <Icon icon="heroicons:pencil" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Edit Course</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className=" h-7 w-7"
                        color="secondary"
                        onClick={() => openModalWithProject(item)}
                      >
                        <Icon icon="heroicons:trash" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete Course</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => handleRowClick(item)}
                      >
                        <Icon icon="heroicons:eye" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>View Modules</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => openSchoolAssignModal(item)}
                      >
                        <Icon icon="heroicons:plus" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Assign Teacher</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => fetchTeachersForCourse(item._id)}
                      >
                        <Icon icon="heroicons:minus" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Remove Teacher</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
            </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <DefaultPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      onPageChange={handlePageChange} 
    />

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
          <h3 className="text-lg font-bold mb-4">Manage Teachers for Course</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Project Name:</label>
            <div className="p-2 bg-gray-100 rounded border">
              {selectedCourse?.title}
            </div>
          </div>
          {teachers.length > 0 ? (
            <div className="overflow-y-auto max-h-60">
              {teachers.map((teacher) => (
                <div key={teacher._id} className="flex justify-between items-center p-2 border-b">
                  <span>{teacher.name} - {teacher.email}</span>
                  <button 
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => removeTeacherFromCourse(teacher._id, selectedCourse._id)}
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
        message={`Are you sure you want to remove course "${selectedCourse?.title}"?`}
    />
    </>
  );
};

export default CheckboxWithAction;
