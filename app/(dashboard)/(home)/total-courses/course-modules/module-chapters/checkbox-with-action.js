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
import toast from "react-hot-toast";
import ConfirmationModal from '../../../ConfirmationModal';
import moment from 'moment';
import Select from 'react-select';
import './style.css';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [chaptersOptions, setChaptersOptions] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [video, setVideo] = useState(null);
    const [timeTaken, setTimeTaken] = useState('');
    const [videoUrl, setVideoUrl] = useState(null);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [selectedChapterToPlay, setSelectedChapterToPlay] = useState(null);
    const [chaptersToShow, setChaptersToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const recordsPerPage = 5;

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
      fetchDataBasedOnContext();
    }, []);

    useEffect(() => {
      const options = chapters.map(chapter => ({
        value: chapter._id,
        label: `${chapter.title} - ${chapter.description}`
      }));
      setChaptersOptions(options);
    }, [chapters]);

    const fetchDataBasedOnContext = async () => {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        const moduleId = new URLSearchParams(window.location.search).get('moduleId');
        if (courseId) {
            const apiURL = `${config.API_BASE_URL}/v1/course/getCoursesModulesWithURLs/${courseId}`;
            try {
                const response = await fetch(apiURL, { method: 'GET' });
                const data = await response.json();
                if (response.ok) {
                  const module = data.modules.find(mod => mod._id === moduleId);
                  if (module) {
                      setChapters(module.chapters);
                      setTotalPages(Math.ceil(module.chapters.length / recordsPerPage));
                      setPageData(1);
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

    const setPageData = (page) => {
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      console.log('Setting page data:', chapters.slice(startIndex, endIndex));
      setChaptersToShow(chapters.slice(startIndex, endIndex));
      setCurrentPage(page);
    };
  
    useEffect(() => {
      if (chapters.length > 0) {
        setPageData(currentPage);
      }
    }, [currentPage, chapters]);
    
    const handlePageChange = newPage => {
      if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
        setPageData(newPage);
      }
    };

    const handleDeleteChapter = async () => {
      if (selectedChapter) {     
        console.log("selectedChapter._id", selectedChapter._id);
        
        try {
          const response = await fetch(`${config.API_BASE_URL}/v1/course/deleteChapterTest/${selectedChapter._id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (response.ok) {
            toast.success("Chapter deleted successfully");
    
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

      const openTeacherFeedbackModal = (project) => {
        setShowFeedbackForm(true);
      };

  const handleImageChange = e => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = images.length + newFiles.length;

    if (totalFiles > 2) {
        toast.error('You can only upload up to 2 images.');
        return;
    }

    const selectedFiles = [...images, ...newFiles].slice(0, 2);
    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));

    setImages(selectedFiles);
    setImagePreviews(filePreviews);
};

const removeImage = (index) => {
  const newImages = images.filter((_, i) => i !== index);
  const newImagePreviews = imagePreviews.filter((_, i) => i !== index);

  setImages(newImages);
  setImagePreviews(newImagePreviews);

  URL.revokeObjectURL(imagePreviews[index]);
};

      const handleVideoChange = e => {
          setVideo(e.target.files[0]);
      };

      const handleSubmit = async () => {
        const formData = new FormData();
        images.forEach(img => formData.append('images', img));
        if (video) {
            formData.append('videos', video);
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const courseId = new URLSearchParams(window.location.search).get('courseId');

        formData.append('data', JSON.stringify({
            teacher: user._id,
            course: courseId,
            timeTaken,
            modules: selectedChapters.map(chapter => ({
                moduleId: chapter.moduleId,
                chapters: [{ chapterId: chapter.value }]
            }))
        }));

        try {
            const response = await fetch(`${config.API_BASE_URL}/v1/courseCompletedTest/updatedCompleteMedia`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                toast.success("Course completion data successfully uploaded.");
                setShowFeedbackForm(false);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to upload course completion data.");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while uploading data.");
        }
    };

    const handleVideoClick = (chapter) => {
      setVideoUrl(chapter.url); 
      setSelectedChapterToPlay(chapter.title)
      setShowVideoPlayer(true);
  };  

    const canManageChapters = userRole === 'superadmin' || 'admin';    

  return (
    <>
    <Table className="responsive-table">
      <TableHeader>
        <TableRow>
          <TableHead className="table-header serial-number">S. No.</TableHead>
          <TableHead className="table-header name">Chapter Title</TableHead>
          <TableHead className="table-header description">Description</TableHead>
          <TableHead className="table-header">Created At</TableHead>
          {canManageChapters && <TableHead className="table-header">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
      {chaptersToShow.length > 0 ? (
        chaptersToShow.map((chapter, index) => (
          <TableRow key={chapter._id}>
            <TableCell className="table-cell serial-number">{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
            <TableCell className="table-cell name">{chapter.title}</TableCell>
            <TableCell className="table-cell description">{chapter.description}</TableCell>
            <TableCell className="table-cell">{moment(chapter.createdAt).format('YYYY-MM-DD')}</TableCell>
            {canManageChapters && (
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
                        onClick={() => onEdit(chapter)}
                      >
                        <Icon icon="heroicons:pencil" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Edit Chapter</p>
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
                        onClick={() => openModalWithChapter(chapter)}
                      >
                        <Icon icon="heroicons:trash" className=" h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Delete Chapter</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => openTeacherFeedbackModal(chapter)}
                      >
                        <Icon icon="heroicons:plus" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Add, What did you teach ?</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        color="secondary"
                        onClick={() => handleVideoClick(chapter)}
                      >
                        <Icon icon="heroicons:arrow-right" className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent color="primary">
                      <p>Watch Video</p>
                      <TooltipArrow className="fill-primary" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

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

    <DefaultPagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      onPageChange={handlePageChange} 
    />

        {showFeedbackForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 md:p-6 rounded-lg w-11/12 max-w-lg mx-auto">
                    <h3 className="text-lg font-bold mb-4">Teacher Course Completion</h3>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Time Taken (minutes):</label>
                        <input type="number" value={timeTaken} onChange={e => setTimeTaken(e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Upload Images:</label>
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                      <div className="flex space-x-2 mt-2">
                          {imagePreviews.map((src, index) => (
                            <div key={index} className="relative w-24 h-24">
                              <img src={src} alt={`Preview ${index}`} className="object-cover rounded w-full h-full" />
                              <button
                                className="absolute top-0 right-0 text-red rounded-full p-1"
                                onClick={() => removeImage(index)}
                                aria-label="Remove image"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.293a1 1 0 011.414 0L10 8.586l.879-.879a1 1 0 111.414 1.414L11.414 10l.879.879a1 1 0 11-1.414 1.414L10 11.414l-.879.879a1 1 0 01-1.414-1.414L8.586 10 7.707 9.121a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Upload Video:</label>
                        <input type="file" accept="video/*" onChange={handleVideoChange} />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Select Chapters:</label>
                        <Select options={chapters.map(ch => ({ value: ch._id, label: ch.title, moduleId: ch.module }))} onChange={setSelectedChapters} isMulti className="w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button color="secondary" onClick={() => setShowFeedbackForm(false)}>Cancel</Button>
                        <Button color="primary" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        )}

{showVideoPlayer && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 modal-animate">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden video-container mx-2">
          <div className="p-4">
              <h3 className="text-lg font-bold mb-2 ml-2">{selectedChapterToPlay}</h3>
              <video src={videoUrl} controls autoPlay className="responsive-video">
                  Sorry, your browser does not support embedded videos.
              </video>
          </div>
          <div className="flex justify-end p-2">
              <button className="close-button"
                  onClick={() => setShowVideoPlayer(false)}>Close</button>
          </div>
      </div>
  </div>
)}

    <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteChapter}
        message={`Are you sure you want to remove chapter "${selectedChapter?.title}" from the module?`}
    />
    </>
  );
};

export default CheckboxWithAction;

