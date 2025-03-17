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
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [schoolId, setSchoolId] = useState('');
    const [studentsToShow, setStudentsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    useEffect(() => {
      const urlSchoolId = new URLSearchParams(window.location.search).get('schoolId');

      if (urlSchoolId) {
          setSchoolId(urlSchoolId);
      } else {
          const userData = localStorage.getItem('user');
          if (userData) {
              const user = JSON.parse(userData);
              setUserRole(user.role);
              setSchoolId(user.school?._id);
          }
      }
  }, []);

  useEffect(() => {
      if (schoolId) {
          fetchStudents(schoolId);
      }
  }, [schoolId]);
      
    const fetchStudents = async (schoolId) => {      
      try {
        const response = await fetch(`${config.API_BASE_URL}/v1/student/getAllStudents/${schoolId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStudents(data.data);
          setTotalPages(Math.ceil(data.data.length / recordsPerPage));
          setPageData(1);
        } else {
          throw new Error(data.message || "Could not fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error(error.message || "An error occurred while fetching students.");
      }
    };

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', students.slice(startIndex, endIndex));
      setStudentsToShow(students.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (students.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, students]); 
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteStudent = async () => {
        if (selectedStudent) {
          try {
            const response = await fetch(`${config.API_BASE_URL}/v1/student/deleteStudent/${selectedStudent._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Student deleted successfully");
              fetchStudents(schoolId);
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete student");
            }
          } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error.message || "An error occurred while deleting the student.");
          }
        }
      };
    
      const openModalWithStudent = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
      };
      
    const canManageStudents = userRole === 'superadmin' || userRole === 'admin' || userRole === 'principal' || userRole === 'teacher' || userRole === 'school';

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Student Name</TableHead>
          <TableHead className="table-header email">Email</TableHead>
          <TableHead className="table-header phone">Phone</TableHead>
          <TableHead className="table-header address">Address</TableHead>
          <TableHead className="table-header">Class</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageStudents && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentsToShow.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell className="table-cell serial-number">{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
            <TableCell className="table-cell name font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.studentName}`}
                </span>
              </div>
            </TableCell>
            <TableCell className="table-cell email">{item.email}</TableCell>
            <TableCell className="table-cell phone">{item.phoneNumber}</TableCell>
            <TableCell className="table-cell address">{`${item.district} ${item.state}`} </TableCell>
            <TableCell className="table-cell">{item.class}</TableCell>
            <TableCell className="table-cell">{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageStudents && (
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
                      <p>Edit Student</p>
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
                        onClick={() => openModalWithStudent(item)}
                      >
                        <Icon icon="heroicons:trash" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete Student</p>
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
        onConfirm={handleDeleteStudent}
        message={`Are you sure you want to remove Student "${selectedStudent?.studentName}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
