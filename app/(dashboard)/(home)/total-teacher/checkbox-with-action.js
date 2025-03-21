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
import config from "@/config/config";

const CheckboxWithAction = ({ onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [schoolId, setSchoolId] = useState('');

    const [teachersToShow, setTeachersToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    useEffect(() => {
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
                  setSchoolId(user.school._id);
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
        const response = await fetch(`${config.API_BASE_URL}/v1/teacher/getAllTeachers/${schoolId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTeachers(data.data);
          setTotalPages(Math.ceil(data.data.length / recordsPerPage));
          setPageData(1);
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
      console.log('Setting page data:', teachers.slice(startIndex, endIndex));
      setTeachersToShow(teachers.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (teachers.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, teachers]);
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteTeacher = async () => {
      console.log("selectedTeacher._id", selectedTeacher._id);
      
        if (selectedTeacher) {
          try {
            const response = await fetch(`${config.API_BASE_URL}/v1/teacher/deleteTeacher/${selectedTeacher._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Teacher deleted successfully");
              fetchTeachers(schoolId);
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

    const canManageTeachers = userRole === 'superadmin' || userRole === 'admin' || userRole === 'principal' || userRole === 'school';

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Teacher Name</TableHead>
          <TableHead className="table-header email">Email</TableHead>
          <TableHead className="table-header phone">Phone</TableHead>
          <TableHead className="table-header">Role</TableHead>
          <TableHead className="table-header address">Address</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageTeachers && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachersToShow.map((item, index) => (
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
            <TableCell className="table-cell email">{item.email}</TableCell>
            <TableCell className="table-cell phone">{item.phoneNumber}</TableCell>
            <TableCell className="table-cell">
              <Badge
                variant="soft"
                color="info"
                className="capitalize"
              >
                {/* {item.role} */}
                Teacher
              </Badge>
            </TableCell>
            <TableCell className="table-cell address">{`${item.district}`} {`${item.state}`}</TableCell>
            <TableCell className="table-cell">{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageTeachers && (
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
                      <p>Edit Teacher</p>
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
        message={`Are you sure you want to remove Teacher "${selectedTeacher?.name}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
