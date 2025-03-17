"use client";
import { useRouter } from 'next/navigation';
import Card from "@/components/ui/card-snippet";
import { Button } from "@/components/ui/button";

const AccessDenied = () => {
  const router = useRouter();

  const handleGoBackTwoSteps = () => {
    window.history.go(-2);
  };

  return (
    <div className="space-y-6 pt-10">
        <Card>
          <div className="pt-4">
            <h1 className="text-xl font-bold">Access Denied</h1>
            <p className='pt-4'>You do not have permission to view this page.</p>
            <br />
            <div className="mt-4 mt-2 mb-2 ml-1">
              <Button type="submit" onClick={handleGoBackTwoSteps}>&larr; Go Back Previous Page</Button>
            </div>
          </div>
        </Card>
      </div>
  );
};

export default AccessDenied;
