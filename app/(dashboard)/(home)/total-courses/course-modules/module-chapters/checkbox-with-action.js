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
import ConfirmationModal from '../../../ConfirmationModal';
import moment from 'moment';

const CheckboxWithAction = ({ onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchDataBasedOnContext();
    }, []);

    const fetchDataBasedOnContext = async () => {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        const moduleId = new URLSearchParams(window.location.search).get('moduleId');
        if (courseId) {
            const apiURL = `https://xcxd.online:8080/api/v1/course/getCoursesModules/${courseId}`;
            try {
                const response = await fetch(apiURL, { method: 'GET' });
                const data = await response.json();
                if (response.ok) {
                  const module = data.modules.find(mod => mod._id === moduleId);
                  if (module) {
                      setChapters(module.chapters);
                  } else {
                      toast.error("Module not found");
                  }
                } else {
                    throw new Error(data.message || "Failed to fetch course data");
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
                toast.error(error.message || "An error occurred while fetching modules.");
            }
        }
    };
    
    const handleDeleteChapter = async () => {
      if (selectedChapter) {     
        console.log("selectedChapter._id", selectedChapter._id);
        
        try {
          const response = await fetch(`https://xcxd.online:8080/api/v1/course/deleteChapterTest/${selectedChapter._id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("Chapter deleted successfully");
    
            // Remove the deleted chapter from the list
            const updatedChapters = chapters.filter(chap => chap._id !== selectedChapter._id);
            setChapters(updatedChapters);
            setIsModalOpen(false);
          } else {
            throw new Error(data.message || "Failed to delete chapter");
          }
        } catch (error) {
          console.error("Error deleting chapter:", error);
          toast.error(error.message || "An error occurred while deleting the chapter.");
        }
      }
    };

      const openModalWithChapter = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalOpen(true);
      };

      // Check if the user is allowed to manage teachers
    const canManageChapters = userRole === 'superadmin' || 'admin';    

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Chapter Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          {canManageChapters && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
      {chapters.length > 0 ? (
        chapters.map((chapter, index) => (
          <TableRow key={chapter._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{chapter.title}</TableCell>
            <TableCell>{chapter.description}</TableCell>
            <TableCell>{moment(chapter.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageChapters && (
            <TableCell className="flex justify-end">
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7"
                  onClick={() => onEdit(chapter)}
                >
                  <Icon icon="heroicons:pencil" className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="secondary"
                  onClick={() => openModalWithChapter(chapter)}
                >
                  <Icon icon="heroicons:trash" className=" h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            )}
          </TableRow>
        ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-4">
                No chapters available for this module.
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteChapter}
        // message="Are you sure you want to delete this image?"
        message={`Are you sure you want to remove chapter "${selectedChapter?.title}" from the module?`}
    />
    </>
  );
};

export default CheckboxWithAction;

