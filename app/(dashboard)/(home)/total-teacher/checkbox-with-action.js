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
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DefaultPagination from "@/components/ui/default-pagination";

const CheckboxWithAction = ({ onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [schoolId, setSchoolId] = useState('');

    const [teachersToShow, setTeachersToShow] = useState([]); // teachers to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    // useEffect(() => {
    //   const userData = localStorage.getItem('user');
    //   if (userData) {
    //       const user = JSON.parse(userData);
    //       setUserRole(user.role);
    //       setSchoolId(user.school?._id); // Assuming the school ID is stored in user data under 'school._id'
    //   }
    //   if (schoolId) {
    //     fetchTeachers(schoolId);
    //   }
    // }, [schoolId]);

    useEffect(() => {
          // Only execute this code on the client-side
          if (typeof window !== "undefined") {
            const query = new URLSearchParams(window.location.search);
            const urlSchoolId = query.get('schoolId');
      
            if (urlSchoolId) {
              setSchoolId(urlSchoolId);
            } else {
              const userData = localStorage.getItem('user');
              if (userData) {
                const user = JSON.parse(userData);
                setUserRole(user.role);
                if (user.school && user.school._id) {
                  setSchoolId(user.school._id);  // Assuming the school ID is stored in user data under 'school._id'
                }
              }
            }
          }
        }, []);
      
        useEffect(() => {
          if (schoolId) {
            fetchTeachers(schoolId);
          }
        }, [schoolId]);
      
    const fetchTeachers = async (schoolId) => {
      try {
        const response = await fetch(`https://xcxd.online:8080/api/v1/teacher/getAllTeachers/${schoolId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTeachers(data.data);
          setTotalPages(Math.ceil(data.data.length / recordsPerPage));
          setPageData(1); // Make sure this is called after setting teachers
        } else {
          throw new Error(data.message || "Could not fetch teachers");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        toast.error(error.message || "An error occurred while fetching teachers.");
      }
    };

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', teachers.slice(startIndex, endIndex)); // Check what is being sliced
      setTeachersToShow(teachers.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (teachers.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, teachers]); // Adding teachers dependency to refresh the slice when data changes 
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };


    const handleDeleteTeacher = async () => {
      console.log("selectedTeacher._id", selectedTeacher._id);
      
        if (selectedTeacher) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/teacher/deleteTeacher/${selectedTeacher._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Teacher deleted successfully");
              fetchTeachers(schoolId); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete Teacher");
            }
          } catch (error) {
            console.error("Error deleting Teacher:", error);
            toast.error(error.message || "An error occurred while deleting the Teacher.");
          }
        }
      };
    
      const openModalWithTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsModalOpen(true);
      };

      // Check if the user is allowed to manage teachers
    const canManageTeachers = userRole === 'superadmin' || 'admin' || userRole === 'principal' || userRole === 'school';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Created At</TableHead>
          {canManageTeachers && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachersToShow.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell>{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
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
              <Badge
                variant="soft"
                color="info"
                className="capitalize"
              >
                {/* {item.role} */}
                Teacher
              </Badge>
            </TableCell>
            <TableCell>{`${item.district}`} {`${item.state}`}</TableCell>
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageTeachers && (
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
                      <p>Edit Teacher</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                {/* <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:eye" className=" h-4 w-4" />
                </Button> */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className=" h-7 w-7"
                        color="secondary"
                        onClick={() => openModalWithTeacher(item)}
                      >
                        <Icon icon="heroicons:trash" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete Teacher</p>
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

    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteTeacher}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove Teacher "${selectedTeacher?.name}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
