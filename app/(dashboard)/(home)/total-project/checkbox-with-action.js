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
    const [principals, setPrincipals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPrincipal, setSelectedPrincipal] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchPrincipals();
    }, []);
      
    const fetchPrincipals = async () => {
      try {
        const response = await fetch("https://xcxd.online:8080/api/v1/project/getAllProject", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPrincipals(data.data);
        } else {
          throw new Error(data.message || "Could not fetch principals");
        }
      } catch (error) {
        console.error("Error fetching principals:", error);
        toast.error(error.message || "An error occurred while fetching principals.");
      }
    };

    const handleDeletePrincipal = async () => {
        if (selectedPrincipal) {
          console.log("api", `https://xcxd.online:8080/api/v1/project/deleteProject/${selectedPrincipal._id}`); 
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/project/deleteProject/${selectedPrincipal._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Principal deleted successfully");
              fetchPrincipals(); // Refresh the list after deletion
              setIsModalOpen(false);
            } else {
              throw new Error(data.message || "Failed to delete principal");
            }
          } catch (error) {
            console.error("Error deleting principal:", error);
            toast.error(error.message || "An error occurred while deleting the principal.");
          }
        }
      };
    
      const openModalWithPrincipal = (principal) => {
        setSelectedPrincipal(principal);
        setIsModalOpen(true);
      };

      // Check if the user is allowed to manage teachers
    const canManageProjects = userRole === 'superadmin';

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
        {principals.map((item, index) => (
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
                  onClick={() => openModalWithPrincipal(item)}
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
        onConfirm={handleDeletePrincipal}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove Principal "${selectedPrincipal?.name}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
