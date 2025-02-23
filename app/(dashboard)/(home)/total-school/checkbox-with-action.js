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
    const [schools, setSchools] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchSchools();
    }, []);
      
    const fetchSchools = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/school", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setSchools(data.data);
        } else {
          throw new Error(data.message || "Could not fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
        toast.error(error.message || "An error occurred while fetching schools.");
      }
    };

    const handleDeleteSchool = async () => {
        if (selectedSchool) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/school/deleteSchool/${selectedSchool._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("School deleted successfully");
              fetchSchools(); // Refresh the list after deletion
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

      // Check if the user is allowed to manage teachers
    const canManageSchools = userRole === 'superadmin';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          {/* <TableHead>id</TableHead> */}
          <TableHead>School Name</TableHead>
          <TableHead>UDISE</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Created At</TableHead>
          {canManageSchools && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((item, index) => (
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
            <TableCell className="font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {item.udise}
                </span>
              </div>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone_no}</TableCell>
            <TableCell>{`${item.district}`} {`${item.state}`}</TableCell>
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageSchools && (
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
                  onClick={() => openModalWithSchool(item)}
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
        onConfirm={handleDeleteSchool}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove School "${selectedSchool?.name}" from here?`}
    />
    </>
  );
};

export default CheckboxWithAction;
