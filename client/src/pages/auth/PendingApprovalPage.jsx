import { useSelector } from 'react-redux';

const PendingApprovalPage = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Account Pending Approval</h1>
        <p className="mb-4">
          Your account ({user?.email}) is waiting for administrator approval.
        </p>
        <p>You'll receive an email when your account is activated.</p>
      </div>
    </div>
  );
};

export default PendingApprovalPage;

