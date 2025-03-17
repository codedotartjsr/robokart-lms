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
import toast from "react-hot-toast";
import ConfirmationModal from '../ConfirmationModal';
import moment from 'moment';
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
    const [schools, setSchools] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentSchoolDetails, setCurrentSchoolDetails] = useState(null);
    const [schoolsToShow, setSchoolsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    const handleViewDetails = (school) => {
      setCurrentSchoolDetails(school);
      setShowDetailsModal(true);
    };    

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchDataBasedOnContext();
    }, []);
      
    const fetchDataBasedOnContext = async () => {
      const projectId = new URLSearchParams(window.location.search).get('projectId');
      let apiURL;
      if (projectId) {
          apiURL = `${config.API_BASE_URL}/v1/project/getAllSchoolsOfProject/${projectId}`;
      } else {
          apiURL = `${config.API_BASE_URL}/v1/school`;
      }
  
      try {
          const response = await fetch(apiURL, { method: 'GET' });
          const data = await response.json();
          if (response.ok) {
              if (data.data.schools) {
                  setSchools(data.data.schools);
                  setTotalPages(Math.ceil(data.data.schools.length / recordsPerPage));
                  setPageData(1);
              } else {
                  setSchools(data.data);
                  setTotalPages(Math.ceil(data.data.length / recordsPerPage));
                  setPageData(1);
              }
              console.log("schools", schools);
          } else {
              throw new Error(data.message || "Failed to fetch data");
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          toast.error(error.message || "An error occurred while fetching data.");
      }
  };

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', schools.slice(startIndex, endIndex));
      setSchoolsToShow(schools.slice(startIndex, endIndex));
      setCurrentPage(page);
    };

    useEffect(() => {
      if (schools.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, schools]);
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteSchool = async () => {
        if (selectedSchool) {
          try {
            const response = await fetch(`${config.API_BASE_URL}/v1/school/deleteSchool/${selectedSchool._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("School deleted successfully");
              fetchDataBasedOnContext();
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete School");
            }
          } catch (error) {
            console.error("Error deleting School:", error);
            toast.error(error.message || "An error occurred while deleting the School.");
          }
        }
      };
    
      const openModalWithSchool = (school) => {
        setSelectedSchool(school);
        setIsModalOpen(true);
      };

    const canManageSchools = userRole === 'superadmin' || 'admin';    

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">School Name</TableHead>
          <TableHead className="table-header">UDISE</TableHead>
          <TableHead className="table-header email">Email</TableHead>
          <TableHead className="table-header phone">Phone</TableHead>
          <TableHead className="table-header address">Address</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageSchools && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
      {schoolsToShow.length > 0 ? (
        schoolsToShow.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell className="table-cell serial-number">{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
            <TableCell className="table-cell name font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.name}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="table-cell font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {item.udise}
                </span>
              </div>
            </TableCell>
            <TableCell className="table-cell email">{item.email}</TableCell>
            <TableCell className="table-cell phone">{item.phone_no}</TableCell>
            <TableCell className="table-cell address">{`${item.district}`} {`${item.state}`}</TableCell>
            <TableCell className="table-cell">{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageSchools && (
            <TableCell className="table-cell table-cell flex justify-end">
              <div className="flex gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => handleViewDetails(item)}
                      >
                        <Icon icon="heroicons:eye" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>View Details</p>
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
                        onClick={() => onEdit(item)}
                      >
                        <Icon icon="heroicons:pencil" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Edit School</p>
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
                        onClick={() => openModalWithSchool(item)}
                      >
                        <Icon icon="heroicons:trash" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete School</p>
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
            <td colSpan="8" className="text-center p-4">
              No schools available.
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

    {showDetailsModal && (
      <DetailsModal school={currentSchoolDetails} onClose={() => setShowDetailsModal(false)} />
    )}

    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteSchool}
        message={`Are you sure you want to remove School "${selectedSchool?.name}" from here?`}
    />
    </>
  );
};

export default CheckboxWithAction;

const DetailsModal = ({ school, onClose }) => {
  if (!school) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-4">Total Details for {school.name}</h3>
        <ul className="list-none space-y-2">
          <li><a href={`/total-principal?schoolId=${school._id}`} className="text-blue-500 hover:text-blue-700">- Click to view Principals</a></li>
          <li><a href={`/total-teacher?schoolId=${school._id}`} className="text-blue-500 hover:text-blue-700">- Click to view Teachers</a></li>
          <li><a href={`/total-student?schoolId=${school._id}`} className="text-blue-500 hover:text-blue-700">- Click to view Students</a></li>
        </ul>
        <div className="flex justify-end mt-4">
          <Button color="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

