import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Icon } from '@iconify/react';
import '../course-modules/module-chapters/style.css';

const CheckboxWithAction = ({ showMedia }) => {
  const [userRole, setUserRole] = useState(null);
  const [courseCompletion, setCourseCompletion] = useState([]);

  useEffect(() => {
    // Fetch user data from localStorage and parse it
    const userData = localStorage.getItem('user');
    let teacherId = null;
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
      teacherId = user._id;  // Correctly fetching teacherId from the user object
    }

    // Retrieve courseId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    if (!teacherId || !courseId) {
      toast.error('Missing teacher ID or course ID');
      return;
    }

    const apiUrl = `https://xcxd.online:8080/api/v1/courseCompletedTest/getCompletedCourseUrls/${teacherId}/${courseId}`;    

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCourseCompletion(data.data);
        } else {
          toast.error('Failed to fetch course completion data');
        }
      })
      .catch(error => {
        console.error('Error fetching course completion data:', error);
        toast.error(`Error fetching data: ${error.message}`);
      });
  }, []);

  const canManageChapters = userRole === 'superadmin' || userRole === 'admin' || userRole === 'teacher';

  return (
    <div>
      {courseCompletion.length > 0 ? (
        courseCompletion.map((course) => (
          <div key={course._id} className="mt-1 md:mt-0">
            {/* <h3>{course.course.title} - {moment(course.createdAt).format('YYYY-MM-DD')}</h3> */}
            <h3 className="pt-1 sm:pt-0">{course.course.title}</h3>
            <h3 className="pt-1 sm:pt-0">Time Taken: {course.timeTaken} minutes</h3>

            {showMedia && (
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop:'10px' }}>
                {course.fileUrls.map((url, index) => {
                  const isVideo = new URL(url).pathname.match(/\.(mp4|webm|m4v)$/i);
                  return (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="media-thumbnail">
                      {isVideo ? (
                        <Icon icon="bi:play-circle" className="media-icon" />
                      ) : (
                        <img src={url} alt={`File ${index + 1}`} className="media-image" />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
            <br />

            {course.modules.map((module) => (
              <div key={module._id}>
                <h4>{module.moduleId.title}</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S. No.</TableHead>
                      <TableHead>Chapter Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Completed At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {module.chapters.length > 0 ? (
                      module.chapters.map((chapter, index) => (
                        <TableRow key={chapter._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{chapter.chapterId.title}</TableCell>
                          <TableCell>{chapter.chapterId.description}</TableCell>
                          <TableCell>{course.updatedAt ? moment(course.updatedAt).format('YYYY-MM-DD') : 'Not Completed'}</TableCell>
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
                <br />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>No course completion data available.</div>
      )}
    </div>
  );
};

export default CheckboxWithAction;
