"use client";
import ReportsSnapshot from '../reports-snapshot/index';
import UsersStat from '../users-stat/index';

const DashboardPageView = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
        </div>
      </div>
      <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-8">
          <ReportsSnapshot />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <UsersStat />
        </div>
      </div>      
    </div>
  );
};

export default DashboardPageView;
