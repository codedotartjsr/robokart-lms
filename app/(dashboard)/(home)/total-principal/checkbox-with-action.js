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
    const [schoolId, setSchoolId] = useState('');

    // useEffect(() => {
    //   const userData = localStorage.getItem('user');
    //   if (userData) {
    //       const user = JSON.parse(userData);
    //       setUserRole(user.role);
    //       setSchoolId(user.school?._id); // Assuming the school ID is stored in user data under 'school._id'
    //   }
    //   if (schoolId) {
    //     fetchPrincipals(schoolId);
    //   }
    // }, [schoolId]);

    useEffect(() => {
      // Only execute this code on the client-side
      if (typeof window !== "undefined") {
        const query = new URLSearchParams(window.location.search);
        const urlSchoolId = query.get('schoolId');
  
        if (urlSchoolId) {
          setSchoolId(urlSchoolId);
          console.log("urlSchoolId----", urlSchoolId);
          
        } else {
          const userData = localStorage.getItem('user');
          if (userData) {
            const user = JSON.parse(userData);
            setUserRole(user.role);
            console.log("user.school._id----", user.school._id);
            
            if (user.school && user.school._id) {
              setSchoolId(user.school._id);  // Assuming the school ID is stored in user data under 'school._id'
            }
          }
        }
      }
    }, []);
  
    useEffect(() => {
      if (schoolId) {
        fetchPrincipals(schoolId);
      }
    }, [schoolId]);
  
    

    // useEffect(() => {
    //   const userData = localStorage.getItem('user');
    //   if (userData) {
    //       const user = JSON.parse(userData);
    //       setUserRole(user.role);
    //   }
    //   fetchPrincipals();
    // }, []);

    console.log("schoolId", schoolId);  
      
    const fetchPrincipals = async (schoolId) => {
      console.log("schoolId", schoolId);
      
      try {
        const response = await fetch(`https://xcxd.online:8080/api/v1/principal/getAllPricipal/${schoolId}`, {
          // const response = await fetch('https://xcxd.online:8080/api/v1/principal/getAllPricipal/67bb5e4e33fe1a10ab28bc8b', {
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
          try {
            const response = await fetch(`https://xcxd.online:8080/api/v1/principal/deletePrincipal/${selectedPrincipal._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Principal deleted successfully");
              fetchPrincipals(schoolId); // Refresh the list after deletion
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
    const canManagePrincipals = userRole === 'superadmin' || 'admin' || userRole === 'principal' || userRole === 'school';

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Principal Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          {canManagePrincipals && <TableHead>Action</TableHead>}
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
            {canManagePrincipals && (
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
        message={`Are you sure you want to remove Principal "${selectedPrincipal?.firstName} ${selectedPrincipal?.lastName}" from this school?`}
    />
    </>
  );
};

export default CheckboxWithAction;
