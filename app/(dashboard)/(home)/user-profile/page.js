import UserInfo from './user-info';

const Overview = () => {
  return (
    <div className="pt-6 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-10 space-y-6">
        <UserInfo />
      </div>
      <div className="col-span-12 lg:col-span-8 space-y-6">
      </div>
    </div>
  );
};

export default Overview;