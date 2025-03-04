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

const CheckboxWithAction = ({ onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    const [schools, setSchools] = useState([]);
    const [showSchoolAssign, setShowSchoolAssign] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [showSchoolsModal, setShowSchoolsModal] = useState(false);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchProjects();
    }, []);

    const openSchoolAssignModal = (project) => {
      setSelectedProject(project);
      setShowSchoolAssign(true); // Ensure modal/overlay is visible
      fetchSchools();
    };
    
    const handleAssignSchool = async () => {
      if (selectedProject && selectedSchool) {
        try {
          const response = await fetch('https://xcxd.online:8080/api/v1/project/addProjectToSchool', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              projectId: selectedProject._id,
              schoolId: selectedSchool.value
            })
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("Project assigned to school successfully!");
            setShowSchoolAssign(false); // Close the modal
            fetchProjects(); // Optionally refresh projects
          } else {
            throw new Error(data.message || "Failed to assign project to school");
          }
        } catch (error) {
          console.error("Error assigning project to school:", error);
          toast.error(error.message || "An error occurred while assigning project to school.");
        }
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/school/");
        const data = await response.json();
        if (response.ok) {
          setSchools(data.data.map(school => ({ value: school._id, label: school.name })));
        } else {
          throw new Error(data.message || "Could not fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
        toast.error(error.message || "An error occurred while fetching schools.");
      }
    };
      
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/project/getAllProject", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProjects(data.data);
        } else {
          throw new Error(data.message || "Could not fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error(error.message || "An error occurred while fetching projects.");
      }
    };

    const handleDeleteProject = async () => {
        if (selectedProject) {
          console.log("api", `https://xcxd.online:8080/api/v1/project/deleteProject/${selectedProject._id}`); 
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/project/deleteProject/${selectedProject._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Project deleted successfully");
              fetchProjects(); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete project");
            }
          } catch (error) {
            console.error("Error deleting project:", error);
            toast.error(error.message || "An error occurred while deleting the project.");
          }
        }
      };
    
      const openModalWithProject = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
      };

      const handleRowClick = (project) => {
        localStorage.setItem('selectedProject', JSON.stringify(project));
        // router.push('/total-school'); // Navigate to the /total-school page
        router.push(`/total-school?projectId=${project._id}`);
      };  

      const fetchSchoolsForProject = async (projectId) => {
        try {
            // First find the project details from your projects state
            const project = projects.find(p => p._id === projectId);
            setSelectedProject(project);  // Set the selected project here
    
            const response = await fetch(`https://xcxd.online:8080/api/v1/project/getAllSchoolsOfProject/${projectId}`);
            const data = await response.json();
            if (response.ok) {
                setSchools(data.data.schools);
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
          <TableHead>Project Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Department</TableHead>
          {/* <TableHead>Description</TableHead> */}
          <TableHead>Created At</TableHead>
          {canManageProjects && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((item, index) => (
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
                  {`${item.name}`}
                </span>
              </div>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
            <TableCell>
                {item.department}
            </TableCell>
            {/* <TableCell>
                {item.description}
            </TableCell> */}
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageProjects && (
            <TableCell className="flex justify-end">
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
                      <p>Edit Project</p>
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
                        <p>Delete Project</p>
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
                        <p>Assigned Schools</p>
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
                        <p>Assign School</p>
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
                          onClick={() => fetchSchoolsForProject(item._id)}
                        >
                          <Icon icon="heroicons:minus" className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent color="primary">
                        <p>Remove School</p>
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

    {showSchoolAssign && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">Assign School to Project</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Project Name:</label>
            <div className="p-2 bg-gray-100 rounded border">
              {selectedProject?.name}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Assign to School:</label>
            <Select
              options={schools}
              onChange={setSelectedSchool}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button color="secondary" onClick={() => setShowSchoolAssign(false)}>Cancel</Button>
            <Button color="primary" onClick={handleAssignSchool}>Assign</Button>
          </div>
        </div>
      </div>
    )}

    {showSchoolsModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
          <h3 className="text-lg font-bold mb-4">Manage Schools for Project</h3>
          {/* <div className="mb-2 text-center text-md">
            Project: <strong>{selectedProject?.name}</strong>
          </div> */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Project Name:</label>
            <div className="p-2 bg-gray-100 rounded border">
              {selectedProject?.name}
            </div>
          </div>
          {schools.length > 0 ? (
            <div className="overflow-y-auto max-h-60">
              {schools.map((school) => (
                <div key={school._id} className="flex justify-between items-center p-2 border-b">
                  <span>{school.name}</span>
                  <button 
                    className="p-2 text-red-500 hover:text-red-700"
                    onClick={() => removeSchoolFromProject(selectedProject._id, school._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            ) : (
            <div className="text-center p-4">
              <span className="text-gray-500">No schools are currently assigned to this project.</span>
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
        message={`Are you sure you want to remove Project "${selectedProject?.name}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
