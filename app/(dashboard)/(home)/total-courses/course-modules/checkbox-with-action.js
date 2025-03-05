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
import ConfirmationModal from '../../ConfirmationModal';
import moment from 'moment';
import { useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipArrow,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import DefaultPagination from "@/components/ui/default-pagination";

const CheckboxWithAction = ({ onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [showChaptersModal, setShowChaptersModal] = useState(false);
    const [currentModuleChapters, setCurrentModuleChapters] = useState([]);
    const router = useRouter();

    const [modulesToShow, setModulesToShow] = useState([]); // modules to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchDataBasedOnContext();
    }, []);

    const fetchDataBasedOnContext = async () => {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        if (courseId) {
            const apiURL = `https://xcxd.online:8080/api/v1/course/getCoursesModules/${courseId}`;
            try {
                const response = await fetch(apiURL, { method: 'GET' });
                const data = await response.json();
                if (response.ok) {
                    setModules(data.modules);
                    setTotalPages(Math.ceil(data.modules.length / recordsPerPage));
                    setPageData(1); // Make sure this is called after setting modules
                } else {
                    throw new Error(data.message || "Failed to fetch modules");
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
                toast.error(error.message || "An error occurred while fetching modules.");
            }
        }
    };

    const setPageData = (page) => {
        const startIndex = (page - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        console.log('Setting page data:', modules.slice(startIndex, endIndex)); // Check what is being sliced
        setModulesToShow(modules.slice(startIndex, endIndex));
        setCurrentPage(page);
      };
    
      useEffect(() => {
        if (modules.length > 0) {
          setPageData(currentPage);
        }
      }, [currentPage, modules]); // Adding modules dependency to refresh the slice when data changes 
      
      const handlePageChange = newPage => {
        if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
          setPageData(newPage);
        }
      };
      
    const handleDeleteModule = async () => {
        if (selectedModule) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/course/deleteModuleTest/${selectedModule._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Module deleted successfully");
              fetchDataBasedOnContext(); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete Module");
            }
          } catch (error) {
            console.error("Error deleting Module:", error);
            toast.error(error.message || "An error occurred while deleting the Module.");
          }
        }
      };
    
      const openModalWithModule = (module) => {
        setSelectedModule(module);
        setIsModalOpen(true);
      };

      const handleViewChapters = (module) => {
        setCurrentModuleChapters(module.chapters);
        setSelectedModule(module);
        setShowChaptersModal(true);
    };

    const navigateToChaptersPage = (moduleId) => {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        if(courseId && moduleId){
            // localStorage.setItem('selectedModule', JSON.stringify(selectedModule));
            // localStorage.setItem('currentModuleChapters', JSON.stringify(currentModuleChapters));
            router.push(`/total-courses/course-modules/module-chapters/?courseId=${courseId}&moduleId=${moduleId}`);
            // router.push(`/total-courses/course-modules/?courseId=${project._id}`);
            setShowChaptersModal(false); // Close modal upon navigation
        }
    };

    // useEffect(() => {
    //     // Automatically redirect if chapters are available
    //     if (chapters && chapters.length > 0) {
    //         localStorage.setItem('currentModuleChapters', JSON.stringify(chapters)); // Store chapters in localStorage
    //         router.push(`/total-courses/course-modules/module-chapters/`);
    //     }
    // }, [chapters, module, router]);

      // Check if the user is allowed to manage teachers
    const canManageModules = userRole === 'superadmin' || 'admin';    

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Module Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          {canManageModules && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
      {modulesToShow.length > 0 ? (
        modulesToShow.map((module, index) => (
            <TableRow key={module._id} className="hover:bg-muted">
                <TableCell>{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
                <TableCell className="font-medium text-card-foreground/80">{module.title}</TableCell>
                <TableCell>{module.description}</TableCell>
                <TableCell>{moment(module.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageModules && (
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                color="secondary"
                                //   onClick={() => handleViewDetails(module)}
                                onClick={() => handleViewChapters(module)}
                            >
                            <Icon icon="heroicons:eye" className=" h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent color="primary">
                            <p>View Chapters</p>
                            <TooltipArrow className="fill-primary" />
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                color="secondary"
                                className="h-7 w-7"
                                onClick={() => onEdit(module)}
                            >
                            <Icon icon="heroicons:pencil" className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent color="primary">
                            <p>Edit Module</p>
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
                                onClick={() => openModalWithModule(module)}
                            >
                            <Icon icon="heroicons:trash" className=" h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent color="primary">
                            <p>Delete Module</p>
                            <TooltipArrow className="fill-primary" />
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

              </div>
            </TableCell>
            )}
          </TableRow>
        ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-4">
                No modules available.
            </td>
          </tr>
        )}
      </TableBody>
    </Table>

    <DefaultPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
    />

    {/* {showDetailsModal && (
      <DetailsModal school={currentSchoolDetails} onClose={() => setShowDetailsModal(false)} />
    )} */}
    {/* {showChaptersModal && (
                <ChaptersModal
                    module={selectedModule}
                    chapters={currentModuleChapters}
                    onClose={() => setShowChaptersModal(false)}
                />
            )} */}

            {showChaptersModal && (
                <ChaptersModal
                    module={selectedModule}
                    chapters={currentModuleChapters}
                    onClose={() => setShowChaptersModal(false)}
                    // navigateToChaptersPage={navigateToChaptersPage}
                    navigateToChaptersPage={() => navigateToChaptersPage(selectedModule._id)}
                />
            )}

    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteModule}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove Module "${selectedModule?.title}" and it's chapters from the course?`}
    />
    </>
  );
};

export default CheckboxWithAction;


// const ChaptersModal = ({ module, chapters, onClose }) => {
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
//                 <h3 className="text-lg font-bold mb-4">Chapters in {module.title}</h3>
//                 <ul className="list-none space-y-2">
//                     {chapters.length > 0 ? chapters.map(chapter => (
//                         <li key={chapter._id}>
//                             <span className="text-blue-500 hover:text-blue-700">{chapter.title} - {chapter.description}</span>
//                         </li>
//                     )) : <li>No chapters available.</li>}
//                 </ul>
//                 <div className="flex justify-end mt-4">
//                     <Button color="secondary" onClick={onClose}>Close</Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

const ChaptersModal = ({ module, chapters, onClose, navigateToChaptersPage }) => {
    useEffect(() => {
        // Check if chapters are available and redirect if they are
        if (chapters.length > 0) {
            navigateToChaptersPage();
        }
    }, [chapters, navigateToChaptersPage]);

    function HandleAddChapter() {
        navigateToChaptersPage();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-4">Chapters in {module.title}</h3>
                <ul className="list-none space-y-2">
                    {chapters.length === 0 && <li>No chapters available.<br /><br /> <Button onClick={HandleAddChapter} color="primary">Add Chapter</Button> </li>}
                </ul>
                <div className="flex justify-end mt-4">
                    <Button color="secondary" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};
