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
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [adminsToShow, setAdminsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchAdmins();
    }, []);
      
    const fetchAdmins = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/v1/admin/getAllAdmin`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAdmins(data.data);
          setTotalPages(Math.ceil(data.data.length / recordsPerPage));
          setPageData(1);
        } else {
          throw new Error(data.message || "Could not fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error(error.message || "An error occurred while fetching admins.");
      }
    };

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', admins.slice(startIndex, endIndex));
      setAdminsToShow(admins.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (admins.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, admins]);
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteAdmin = async () => {
        if (selectedAdmin) {
          try {
            const response = await fetch(`${config.API_BASE_URL}/v1/admin/deleteAdmin/${selectedAdmin._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
              toast.success("Admin deleted successfully");
              fetchAdmins();
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

    const canManageAdmins = userRole === 'superadmin';

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Admin Name</TableHead>
          <TableHead className="table-header email">Email</TableHead>
          <TableHead className="table-header phone">Phone</TableHead>
          <TableHead className="table-header">Role</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageAdmins && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {adminsToShow.map((item, index) => (
          <TableRow
            key={item._id}
            className="hover:bg-muted"
            data-state={selectedRows.includes(item._id) && "selected"}
          >
            <TableCell className="table-cell serial-number">{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
            <TableCell className="table-cell name font-medium text-card-foreground/80">
              <div className="flex gap-3 items-center">
                <span className="text-sm text-card-foreground">
                  {`${item.firstName} ${item.lastName}`}
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
                {item.role}
              </Badge>
            </TableCell>
            <TableCell className="table-cell">{moment(item.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageAdmins && (
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
                    <p>Edit Admin</p>
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
                      onClick={() => openModalWithAdmin(item)}
                    >
                      <Icon icon="heroicons:trash" className=" h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete Admin</p>
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
        onConfirm={handleDeleteAdmin}
        message={`Are you sure you want to remove Admin "${selectedAdmin?.firstName} ${selectedAdmin?.lastName}" ?`}
    />
    </>
  );
};

export default CheckboxWithAction;

