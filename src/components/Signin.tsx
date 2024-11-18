

type SigninProps = {
    isOpen: boolean;
  onClose: () => void;

}
const Signin: React.FC<SigninProps> = ({ isOpen, onClose }) => {
 
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Hello!</h2>
        <p className="mb-6">Use your email or another service to continue.</p>
        <div className="flex flex-col space-y-3">
          <button className="bg-[var(--background-color)] hover:bg-[var(--light-gray)] text-black py-2 rounded">
            Continue with Google
          </button>
          <button className="bg-[var(--background-color)] hover:bg-[var(--light-gray)] text-black py-2 rounded">
            Continue with Apple
          </button>
          <button className="bg-[var(--primary-color)] hover:text-[var(--secondary-color)] text-white py-2 rounded">
            Continue with Email
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-[var(--background-color)] border-2 border-[var(--primary-color)] text-[primary-color] py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Signin
