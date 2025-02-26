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
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
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
    //     fetchAdmins(schoolId);
    //   }
    // }, [schoolId]);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchAdmins();
    }, []);
      
    const fetchAdmins = async (schoolId) => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/admin/getAllAdmin", {
          // const response = await fetch(`https://xcxd.online:8080/api/v1/admin/getAllAdmin/${schoolId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAdmins(data.data);
        } else {
          throw new Error(data.message || "Could not fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error(error.message || "An error occurred while fetching admins.");
      }
    };

    const handleDeleteAdmin = async () => {
        if (selectedAdmin) {
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/admin/deleteAdmin/${selectedAdmin._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Admin deleted successfully");
              fetchAdmins(); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete Admin");
            }
          } catch (error) {
            console.error("Error deleting Admin:", error);
            toast.error(error.message || "An error occurred while deleting the Admin.");
          }
        }
      };
    
      const openModalWithAdmin = (admin) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
      };

      // Check if the user is allowed to manage teachers
    const canManageAdmins = userRole === 'superadmin';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Admin Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          {canManageAdmins && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.firstName} ${item.lastName}`}
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
                {item.role}
              </Badge>
            </TableCell>
            <TableCell>{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageAdmins && (
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
                  onClick={() => openModalWithAdmin(item)}
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
        onConfirm={handleDeleteAdmin}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove Admin "${selectedAdmin?.firstName} ${selectedAdmin?.lastName}" ?`}
    />
    </>
  );
};

export default CheckboxWithAction;
