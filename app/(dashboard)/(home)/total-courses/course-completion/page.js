"use client"

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/card-snippet";
import CheckboxWithAction from "./checkbox-with-action";
import { Icon } from "@iconify/react";
import Link from "next/link";

const TailwindUiTable = () => {
    const [userRole, setUserRole] = useState(null);
    const [showMedia, setShowMedia] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 500);

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role);
      }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggleMedia = () => {
        setShowMedia(!showMedia);
      };

    const canManageProjects = userRole === 'superadmin' || 'admin';

    return (
        <div className="space-y-6 pt-4">
            <Card title="Course Completion">
                <div className={`flex ${isWideScreen ? 'flex-row justify-between items-center' : 'flex-col space-y-4'}`}>
                    <div className="flex justify-start">
                        <Link href='/assigned-courses' className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                            <Icon icon="heroicons-outline:arrow-left" className="h-5 w-5" />
                                Back to Courses
                        </Link>
                    </div>
                    {canManageProjects && (
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-primary text-white rounded flex items-center gap-2"
                                onClick={handleToggleMedia}
                            >
                                {showMedia ? <Icon icon="heroicons-outline:minus" className="h-5 w-5" /> :
                                    <Icon icon="heroicons-outline:plus" className="h-5 w-5" />
                                }
                                {showMedia ? 'Hide Completion Files' : 'Show Completion Files'}
                            </button>
                        </div>
                    )}
                </div>
                <CheckboxWithAction showMedia={showMedia} />
            </Card>
        </div>
    );
};

export default TailwindUiTable;

