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

const CheckboxWithAction = ({ onEdit }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [schoolId, setSchoolId] = useState('');

    // useEffect(() => {
    //   const userData = localStorage.getItem('user');
    //   if (userData) {
    //       const user = JSON.parse(userData);
    //       setUserRole(user.role);
    //       setSchoolId(user.school?._id); // Assuming the school ID is stored in user data under 'school._id'
    //   }
    //   if (schoolId) {
    //     fetchStudents(schoolId);
    //   }
    // }, [schoolId]);

    useEffect(() => {
      // Attempt to get the schoolId from the URL
      const urlSchoolId = new URLSearchParams(window.location.search).get('schoolId');

      // If the schoolId exists in the URL, use it; otherwise, use the one from local storage
      if (urlSchoolId) {
          setSchoolId(urlSchoolId);
      } else {
          const userData = localStorage.getItem('user');
          if (userData) {
              const user = JSON.parse(userData);
              setUserRole(user.role);
              setSchoolId(user.school?._id);  // Assuming the school ID is stored under user.school._id
          }
      }
  }, []);

  useEffect(() => {
      // Fetch students only if schoolId is available
      if (schoolId) {
          fetchStudents(schoolId);
      }
  }, [schoolId]);
      
    const fetchStudents = async (schoolId) => {
      // const schoolId = new URLSearchParams(window.location.search).get('schoolId');
      console.log("api", `https://xcxd.online:8080/api/v1/student/getAllStudents/${schoolId}`);
      
      try {
        const response = await fetch(`https://xcxd.online:8080/api/v1/student/getAllStudents/${schoolId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStudents(data.data);
        } else {
          throw new Error(data.message || "Could not fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error(error.message || "An error occurred while fetching students.");
      }
    };

    const handleDeleteStudent = async () => {
        if (selectedStudent) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/student/deleteStudent/${selectedStudent._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Student deleted successfully");
              fetchStudents(schoolId); // Refresh the list after deletion
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

      console.log("userRole", userRole);
      

      // Check if the user is allowed to manage teachers
    const canManageStudents = userRole === 'superadmin' || 'admin' || userRole === 'principal' || userRole === 'teacher' || userRole === 'school';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          {/* <TableHead>id</TableHead> */}
          <TableHead>Student Name</TableHead>
          {/* <TableHead>Father Name</TableHead> */}
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          {/* <TableHead>DOB</TableHead> */}
          {/* <TableHead>Aadhar</TableHead> */}
          {/* <TableHead>Gender</TableHead> */}
          <TableHead>Class</TableHead>
          <TableHead>Created At</TableHead>
          {canManageStudents && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((item, index) => (
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
                  {`${item.studentName}`}
                </span>
              </div>
            </TableCell>
            {/* <TableCell>{item.fatherName}</TableCell> */}
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phoneNumber}</TableCell>
            <TableCell>{`${item.district} ${item.state}`} </TableCell>
            {/* <TableCell>{moment(item.dob).format('YYYY-MM-DD')}</TableCell> */}
            {/* <TableCell>{item.aadhar}</TableCell> */}
            {/* <TableCell>{item.gender}</TableCell> */}
            <TableCell>{item.class}</TableCell>
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageStudents && (
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
                {/* <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  color="secondary"
                >
                  <Icon icon="heroicons:eye" className=" h-4 w-4" />
                </Button> */}
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() => openModalWithStudent(item)}
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteStudent}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove Student "${selectedStudent?.studentName}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
